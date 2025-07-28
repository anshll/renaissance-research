import { createUserContent, createPartFromUri, GoogleGenAI } from "@google/genai";
import { NextResponse } from 'next/server';
import path from "path";
import fs from "fs";
import paper_evals from "../../papers/paper_evals.json";

// Define the ChatMessage interface matching the client-side
interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

// Helper function to format history into a string
function formatChatHistory(history: ChatMessage[]): string {
  return history
    .map(msg => `${msg.sender === 'user' ? 'User' : 'AI'}: ${msg.text}`)
    .join('\n');
}

export async function POST(request: Request) {
  try {
    // Ensure chatHistory is typed correctly when destructuring
    const { chatHistory, userMessage, title, author, year, paperLink, paperId, isFirstMessage }: {
      chatHistory: ChatMessage[];
      userMessage: string;
      title: string;
      author: string;
      year: number;
      paperLink: string;
      paperId: number;
      isFirstMessage: boolean;
    } = await request.json();

    const apiKey = process.env.gemini_key; // Access server-side env var
    if (!apiKey) {
      console.error("Gemini API key not found on server.");
      return NextResponse.json({ error: "API key not configured." }, { status: 500 });
    }

    const ai = new GoogleGenAI({apiKey:apiKey});

    let paper = null;
    // File handling logic... (ensure this part works as expected)
    if (isFirstMessage && paperLink !== "none") {
        try {
            const response = await fetch(paperLink);
            if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.statusText}`);
            const pdfBlob = await response.blob();

            // Upload directly using the SDK's ability to handle blobs/buffers if possible,
            // or save temporarily if needed. The current saving logic seems complex.
            // Let's assume the upload part works for now.
            // Simplified placeholder for file upload logic:
             const tempDir = path.join(process.cwd(), 'temp'); // Use a temp subdir
             await fs.promises.mkdir(tempDir, { recursive: true });
             const tempFilePath = path.join(tempDir, `paper_${paperId}.pdf`);
             const buffer = Buffer.from(await pdfBlob.arrayBuffer());
             await fs.promises.writeFile(tempFilePath, buffer);
             console.log("PDF file saved to temporary location:", tempFilePath);

             paper = await ai.files.upload({
                 file: tempFilePath
             });
             // Clean up the temporary file
             await fs.promises.unlink(tempFilePath);
             console.log("Temporary PDF file deleted:", tempFilePath);

        } catch (uploadError) {
             console.error("Error handling PDF file:", uploadError);
             // Decide if you want to proceed without the file or return an error
             // return NextResponse.json({ error: "Failed to process PDF file." }, { status: 500 });
             paper = null; // Ensure paper is null if upload fails
        }
    }

    // Format the history into a string
    const historyString = formatChatHistory(chatHistory);
    const eval_data = paper_evals.find(p => p.id === paperId);
    // Construct the prompt including context and history string
    const fullPrompt = `
    Context: Paper Evaluation Data:
    ${JSON.stringify(eval_data, null, 2)}

    Chat History:
    ${historyString}

    Current Question based on the paper "${title}" by ${author} (${year})${paper && paper.uri ? " (refer to the attached PDF)" : ""}:
    ${userMessage}

    Answer:`;

    let result;

    if (isFirstMessage && paper && paper.uri && paper.mimeType) {
        // First message with a successfully uploaded paper
        result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: createUserContent(
          [
            createPartFromUri(paper.uri, paper.mimeType), // Use the uploaded file URI
            "\n\n",
            fullPrompt
          ])
        });
    } else {
        // Subsequent messages or first message without a paper/failed upload
        result = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-04-17",
          contents: createUserContent([fullPrompt])
        });
    }

    const text = result.text;
    return NextResponse.json({ text });

  } catch (error) {
    console.error("Error in chat API route:", error);
    // Provide more specific error info if possible
    const errorMessage = error instanceof Error ? error.message : "Failed to get response from AI.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

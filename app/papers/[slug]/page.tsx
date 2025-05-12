'use client'; // Add this line for useState

import { useState, use, useRef, useEffect } from 'react'; // Import useState, use, useRef, useEffect
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import Nav from "@/components/nav";
import { Paper, papers } from "../papers";
import { Star, Send, User, Bot } from "lucide-react"; // Import Star, Send, User, Bot icons
import { Input } from "@/components/ui/input"; // Import Input component
import { Button } from "@/components/ui/button"; // Import Button component
import raw_link_map from "./link_map.json";
const link_map = raw_link_map as Record<string, string>;

interface PaperPageProps {
    params: Promise<{slug: string}> // Update the type to reflect it's a Promise
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

// Helper function to format score keys
const formatScoreKey = (key: string): string => {
  return key
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
};

export default function PaperPage({ params }: PaperPageProps) {
  const resolvedParams = use(params); // Unwrap the params Promise
  const [chatInput, setChatInput] = useState(''); // State for chat input
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // State for chat messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for scrolling

  // Scroll to bottom whenever chat history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Find the paper data by ID (slug)
  const paperId = Number(resolvedParams.slug); // Access slug from the resolved params
  const data = papers.find(p => p.id === paperId); // Use find instead of direct index access
  // Check if the paper has a url field
  const paperLink = data?.url ?? link_map[paperId.toString()] ?? "none"; // Fallback to "none" if no link is found

  if (!data) {
    return (
      <>
        <Nav />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-amber-700">Paper not found.</p>
        </div>
      </>
    );
  }

  // Destructure all required fields, providing defaults for potentially missing ones
  const {
    title = "Untitled",
    author = "Unknown Author",
    year = 0,
    scores = { total: 0 }, // Default scores object
    synthesizer_justification = ["No summary available."], // Keep as array for joining
    takeaway = "No takeaway provided.",
    category = "Uncategorized",
    optimist_justification = ["No optimist justification provided."], // Keep as array for joining
    devils_advocate_justification = ["No devil's advocate justification provided."] // Keep as array for joining
  } = data;

  // Calculate rating safely, handle potential division by zero or missing scores
  const totalScore = scores.total || 0;
  // Assuming max possible score is 35 based on previous code, adjust if needed
  const maxPossibleScore = 35;
  const rating = maxPossibleScore > 0 ? Number((totalScore / maxPossibleScore * 5).toFixed(1)) : 0;

  // --- Chat Logic ---
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = chatInput.trim();
    if (!userMessage) return;

    // Check if it's the first message in the chat
    const isFirstMessage = chatHistory.length === 0;
    
    // Add user message to history and clear input
    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage}]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatHistory,
          userMessage,
          title, // Pass necessary paper details
          author,
          year,
          paperLink,
          paperId,
          isFirstMessage 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }
      const data = await response.json();
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.text }]); // Add AI response

    } catch (error) {
      console.error("Error sending chat request:", error);
      const errorMessage = error instanceof Error ? error.message : "Sorry, I encountered an error. Please try again.";
      setChatHistory(prev => [...prev, { sender: 'ai', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter out the 'total' score for breakdown display
  const scoreBreakdown = Object.entries(scores)
    .filter(([key]) => key !== 'total')
    .map(([key, value]) => ({ key: formatScoreKey(key), value }));

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex flex-row flex-1">
        {/* Main content area */}
        <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl mb-24 mr-[28rem]"> {/* Added right margin for chat sidebar */}
          {/* Paper Details Article */}
          <article className="bg-amber-50/30 p-6 sm:p-8 rounded border border-amber-900/10">
            {/* Header */}
            <header className="mb-6 pb-4 border-b border-amber-900/10">
              <h1 className="font-serif text-3xl font-bold text-amber-900 mb-1">{title}</h1>
              {paperLink !== "none" && (
                <a
                  href={paperLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline mb-2 block"
                >
                  Read PDF →
                </a>
              )}
              <p className="text-lg text-amber-700 mt-1">
                {author}{year > 0 ? `, ${year}` : ''}
              </p>
              <p className="text-sm text-amber-600 mt-1">Category: {category}</p>
            </header>

            {/* Rating Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-amber-900 mb-3">Overall Rating</h2>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < rating ? "text-amber-600 fill-amber-600" : "text-amber-300"}`} />
                  ))}
                </div>
                <span className="ml-3 text-amber-800">{rating.toFixed(1)}/5 ({totalScore}/{maxPossibleScore} pts)</span>
              </div>
            </section>

            {/* Score Breakdown Section */}
            {scoreBreakdown.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-amber-900 mb-3">Score Breakdown</h2>
                <ul className="list-disc list-inside text-amber-800 space-y-1">
                  {scoreBreakdown.map(({ key, value }) => (
                    <li key={key}>
                      {key}: <span className="font-medium">{value}/{key === "Obscurity Advantage" ? 5 : 10}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Summary Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-amber-900 mb-3">Synthesized Summary</h2>
              <div className="text-amber-800 leading-relaxed space-y-2">
                <ReactMarkdown>{synthesizer_justification.join('\n\n')}</ReactMarkdown>
              </div>
            </section>

            {/* Optimist View Section */}
            <section className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
              <h2 className="text-lg font-semibold text-green-800 mb-2">Optimist's View</h2>
              <div className="text-green-700 leading-relaxed space-y-2 text-sm">
                <ReactMarkdown>{optimist_justification.join('\n\n')}</ReactMarkdown>
              </div>
            </section>

            {/* Devil's Advocate View Section */}
            <section className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Skeptic's View</h2>
               <div className="text-red-700 leading-relaxed space-y-2 text-sm">
                 <ReactMarkdown>{devils_advocate_justification.join('\n\n')}</ReactMarkdown>
              </div>
            </section>

            {/* Takeaway/Relevance Section */}
            <section className="mb-56">
              <h2 className="text-xl font-semibold text-amber-900 mb-3">Final Takeaway / Relevance</h2>
              <p className="text-amber-800 italic leading-relaxed">{takeaway}</p>
            </section>
          </article>
        </main>

        {/* Chat Sidebar */}
        <aside className="w-full max-w-md flex flex-col border-l border-gray-200 bg-white/90 backdrop-blur-sm p-4 z-10 h-[calc(100vh-4rem)] fixed right-0 top-[4rem]">
          {/* Chat History Display */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
             {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-[80%]`}>
                  {msg.sender === 'ai' && <Bot className="h-5 w-5 text-amber-700 flex-shrink-0 mt-1" />}
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                   {msg.sender === 'user' && <User className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="flex items-start gap-2">
                   <Bot className="h-5 w-5 text-amber-700 flex-shrink-0 mt-1" />
                   <div className="rounded-lg px-3 py-2 text-sm bg-gray-200 text-gray-500 italic">
                      Thinking...
                   </div>
                 </div>
               </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Ask a question about this paper..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isLoading} // Disable input while loading
              className="flex-grow bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500 disabled:opacity-50"
            />
            <Button type="submit" variant="outline" size="icon" disabled={isLoading} className="border-gray-300 text-gray-600 hover:bg-amber-100 hover:text-amber-800 disabled:opacity-50">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </aside>
      </div>
    </div>
  )
}
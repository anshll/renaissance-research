## 💡 Inspiration
We noticed countless stories of past research finding ways to be relevant to today even if forgotten for long periods. For example, neural networks were discovered in the 1960s, but due to both lack of compute/infrastructure and skepticism about their potential, they didn't "catch on" much until the 2000s.

Math is also said to be ahead of its time. Fourier transforms were a niche concept in modeling heat, until a century later they became essential in electrical engineering / signal processing.

We hope a tool like this will help rediscover sources of knowledge people have forgotten or haven't thought to make a connection with another discipline.

## ✨ What it does 

### 🕸️ Step 1: Scrape the web 
Currently, we are able to scrape all of Caltech's CS dissertations/theses. We plan to expand this capability and perhaps automate the script-writing process. 

### 🎯 Step 2: Evaluate Potential
Each paper we scrape goes through a 3-step evaluation process. First, papers receive an initial score based on the paper's novelty, applicability to other fields, technical timeliness, and obscurity. Then, to account for the fact that LLMs are inherently overly optimistic, we run the paper along with the optimistic evaluation through a second round of scrutiny, where we instruct the LLM to be more harsh and filter out false positives. Finally, we feed both optimistic and skeptical evaluations to a synthesizer LLM, which aims to provide a fair and unbiased score to the paper out of 35.

### 📊 Step 3: Present Findings
We present the optimistic justification, skeptical justification, and final summary, along with the paper's score out of 35 to users to allow them to make educated and efficient decisions about what research ideas are worth pursuing. If a paper catches their eye, they can ask further questions about each side's justification, as well as other general questions, and our chat bot will take the full context into account to provide as comprehensive of an answer as possible.

## 🛠️ How we built it
We built a scraper with Beautiful Soup and used the Gemini API on raw PDF bytes to run a sequence of prompts. First an optimistic take on how this paper could be relevant today, then a more critical take, then finally from the eyes of a fair judge who synthesizes the two sides. It uses Pydantic to get structured output, which then goes into our Next.js full stack web app through a series of python scripts that aggregate the model outputs into a single JSON file.

## 🚧 Challenges we ran into
Prompting was hard. AI models tend to be really optimistic, which is bad when we want to find truly unique articles. We started off with just one prompt but then realized doing a debate approach would be a great way to get more insight. We started off using AWS Bedrock Runtime APIs, and got deep into the woods running Claude 3.7 Sonnet, but got rate throttled extremely by AWS. We were experimenting with BAML to do structured output compliance too during this time, but then we changed our pipeline to use AWS Batch Inference due to the rate throttling and our codebase had to change. Batch inference was a lot faster after we ran into a lot of errors, we found Gemini 2.5 had an incredible context window and rate limits. So we switched to using Gemini APIs and the code was a lot smoother too.

## 🏆 Accomplishments that we're proud of
Being able to work with AWS. Prompt engineering properly, where now the majority of articles read get low ratings (realistic and expected), but that means standards are high and something rated highly truly is worth taking a look at.

## 📚 What we learned
Although we both have experience with traditional ML models and even trained types of language models before, we haven't ever worked with these commoditized Foundation Model APIs. Working with throttling, rate limits, and large cloud batch jobs was also pretty new to us. The "operations" part of the project proved challenging.

## 🚀 What's next for Renaissance Research
Scraping EVERY old/niche paper, and then maybe going after newer papers. We also would love to build up some sort of mental model of the research world (think a graph) as the model traverses these papers so it can discover new far reaching connections with its huge depth of knowledge that humans might not see.

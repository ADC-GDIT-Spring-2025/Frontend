import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { model, thread, temperature, maxGenLen } = await req.json();

    // modify this as needed
    const systemPrompt = `
    You are LLaMA, a generative AI chatbot trained to assist users by generating informative, accurate, and context-aware responses. 
    Your primary task is to answer user questions related to the Enron email dataset.  
    You may receive additional background information derived from structured databases, including graph-based relationships and semantic search results.  
    If relevant data is available, incorporate it naturally into your response without explicitly stating its source.  

    Your response should:  
    1. **Present information clearly and conversationally**, avoiding any mention of databases, queries, or file formats.  
    2. **Seamlessly integrate retrieved data** with your general knowledge to provide insightful and well-structured answers.  
    3. **Indicate when a response is based purely on AI knowledge**, particularly if no supporting data is available.  
    4. **Use markdown for formatting and organize response using headers** when presenting structured information (e.g., lists, summaries).  
    
    Always aim to be **concise, accurate, and engaging**, ensuring clarity in your explanations.`;

    const response = await fetch('https://api.llms.afterhoursdev.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || "meta-llama3.3-70b",
        messages: thread,
        system: systemPrompt,
        temperature: temperature ?? 0.5,
        maxGenLen: maxGenLen ?? 512,
      }),
    });

    if (!response.ok) {
      throw new Error(`Llama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Llama API Proxy Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch response from Llama LLM." }, { status: 500 });
  }
}

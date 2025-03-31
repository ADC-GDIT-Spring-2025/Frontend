import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { model, thread, temperature, maxGenLen } = await req.json();

    // modify this as needed
    const systemPrompt = "You are an AI assistant meant to help answer questions about the content of the Enron Email dataset. Each prompt will contain the natural language given by the user, followed by a json string of the relevant data from a Neo4j knowledge graph generated from the Enron dataset.";

    const response = await fetch('https://api.llms.afterhoursdev.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LLAMA_API_KEY}`,
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

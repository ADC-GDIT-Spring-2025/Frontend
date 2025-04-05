import axios from 'axios';

export async function fetchLlamaResponse(thread: { role: "user" | "assistant", message: string }[]): Promise<string> {
  try {
    const response = await axios.post('/api/proxy', {
      model: "meta-llama3.3-70b",
      thread,
      temperature: 0.5,
      maxGenLen: 512,
    });

    return response.data.generation.trim();
  } catch (error: any) {
    console.error("Error fetching bot response:", error.message);
    throw new Error("Failed to fetch response from Llama LLM.");
  }
}
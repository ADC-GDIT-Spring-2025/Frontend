import axios from 'axios';

export function neo4jTemplate(prompt: string, data: string): string {
  return `Prompt: ${prompt}\nKnowledge Graph Data: ${data}`;
}

export async function fetchNeo4jData(prompt: string): Promise<string> {
  try {
    const response = await axios.post('http://localhost:8080/neo4j', {
      prompt: prompt
    });

    return JSON.stringify(response.data);

  } catch (error: any) {
    console.error("Error fetching Neo4j data:", error.message);
    throw new Error("Failed to fetch response from Neo4j.");
  }
}
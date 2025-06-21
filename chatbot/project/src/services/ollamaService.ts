import axios from 'axios';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

export interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export const sendPromptToOllama = async (prompt: string, model: string = 'llama3'): Promise<string> => {
  try {
    const response = await axios.post<OllamaResponse>(OLLAMA_API_URL, {
      model,
      prompt,
      stream: false,
    });
    
    return response.data.response;
  } catch (error) {
    console.error('Error sending prompt to Ollama:', error);
    throw new Error('Failed to get response from Ollama. Is the server running?');
  }
};
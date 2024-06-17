import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('API key is missing. Please set the API_KEY environment variable.');
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiCompletion = async (input: string): Promise<string> => {
  try {
    // Obtendo o modelo generativo Gemini 1.5
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Iniciando uma conversa com o histórico inicial
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello, I have 2 dogs in my house." }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    // Enviando uma mensagem para o chat
    const result = await chat.sendMessage(input);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.log(`Error completing input: ${error}`);
    return '';
  }
}

// Testando a função
(async () => {
  const response = await getGeminiCompletion("How many paws are in my house?");
  console.log(response);
})();

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
          parts: [{ text: "Olá! Eu sou a GELATA, sua assistente na Sorveteria My Sorvete. Em que posso ajudar hoje?" }],
        },
        {
          role: "model",
          parts: [{ text: "Oi GELATA! Pode me contar sobre os sabores de sorvete que vocês têm?" }],
        },
        {
          role: "user",
          parts: [{ text: "Claro! Nós temos uma variedade de sabores deliciosos, incluindo baunilha, chocolate, morango, menta com pedaços de chocolate e cookies and cream. Também oferecemos sabores sazonais e coberturas especiais. Todos os nossos sorvetes são feitos com ingredientes frescos e naturais, e temos opções para dietas veganas e sem glúten. O que mais você gostaria de saber?" }],
        },
        {
          role: "model",
          parts: [{ text: "Que ótimo! Quais são os horários de funcionamento da sorveteria?" }],
        },
        {
          role: "user",
          parts: [{ text: "Estamos abertos de segunda a sexta, das 12h às 22h, e nos fins de semana das 11h às 23h. Venha nos visitar a qualquer hora para uma deliciosa sobremesa!" }],
        },
        {
          role: "model",
          parts: [{ text: "Legal! Onde vocês estão localizados?" }],
        },
        {
          role: "user",
          parts: [{ text: "Você pode nos encontrar na Rua dos Sorvetes, número 123, Doce Cidade. Para entrar em contato, ligue para (11) 98765-4321 ou envie um email para contato@docesabor.com.br. Estamos sempre à disposição para ajudar!" }],
        },
        {
          role: "model",
          parts: [{ text: "Vocês têm alguma promoção especial?" }],
        },
        {
          role: "user",
          parts: [{ text: "Sim, nós temos! Oferecemos um desconto de 10% para estudantes durante a semana. Aos finais de semana, temos a promoção compre um e leve dois em todos os cones de sorvete. Não perca!" }],
        },
        {
          role: "model",
          parts: [{ text: "Quais ingredientes vocês usam nos sorvetes?" }],
        },
        {
          role: "user",
          parts: [{ text: "Nossos sorvetes são feitos com os melhores ingredientes naturais. Usamos frutas frescas, chocolate de alta qualidade e sabores naturais. Além disso, oferecemos opções para dietas veganas e sem glúten, garantindo que todos possam aproveitar nossas sobremesas." }],
        },
        {
          role: "model",
          parts: [{ text: "Quais são os sabores mais populares?" }],
        },
        {
          role: "user",
          parts: [{ text: "Os sabores mais populares são definitivamente chocolate e cookies and cream. A menta com pedaços de chocolate também é muito apreciada. Mas sinceramente, você não pode errar com nenhum dos nossos sabores!" }],
        },
        {
          role: "model",
          parts: [{ text: "Obrigada, GELATA! Você foi muito prestativa." }],
        },
        {
          role: "user",
          parts: [{ text: "Por nada! Se tiver mais alguma pergunta ou precisar de mais alguma ajuda, é só me chamar. Aproveite o seu dia e o seu sorvete!" }],
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
  const response = await getGeminiCompletion("Pode me contar sobre as promoções especiais?");
  console.log(response);
})();


import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPlanRecommendation = async (userInput: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User business description: "${userInput}". 
      Based on the following SwiftPOS plans: 
      - Starter ($0): For small stalls, side hustles. 1 register.
      - Business Pro ($29): For growing retail, includes staff management and advanced analytics.
      - Enterprise (Custom): For multi-location brands needing custom integrations.
      
      Recommend exactly one plan and explain why in 2 concise sentences.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedPlanId: { type: Type.STRING, description: 'Starter, Business Pro, or Enterprise' },
            reason: { type: Type.STRING, description: 'Short reasoning for the choice' }
          },
          required: ["recommendedPlanId", "reason"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

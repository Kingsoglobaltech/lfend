import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIAnalysisResult } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Initialize the model only if API key is present to avoid immediate errors
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const analyzeProjectRisk = async (projectDetails: string): Promise<AIAnalysisResult> => {
  // Mock response if no API key or if specifically requested
  if (!API_KEY || API_KEY === "PLACEHOLDER_API_KEY") {
    console.warn("Using mock Gemini response because API key is missing or invalid.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          riskScore: 7,
          summary: "This is a simulated analysis because the Gemini API key is not configured. The project shows strong potential but carries moderate market risks.",
          pros: [
            "Strong market demand potential",
            "Experienced team structure",
            "Clear scalability path"
          ],
          cons: [
            "High initial capital requirement",
            "Regulatory uncertainty in the sector",
            "Competitive landscape is crowded"
          ]
        });
      }, 1500);
    });
  }

  try {
    const model = genAI!.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      Analyze the investment risk for the following project details. 
      Return the response in strictly valid JSON format with the following structure:
      {
        "riskScore": number (1-10, where 10 is highest risk),
        "summary": "string (brief summary)",
        "pros": ["string", "string", "string"],
        "cons": ["string", "string", "string"]
      }
      
      Project Details:
      ${projectDetails}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the text to ensure it's valid JSON (sometimes models add markdown formatting)
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(jsonString) as AIAnalysisResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze project risks.");
  }
};

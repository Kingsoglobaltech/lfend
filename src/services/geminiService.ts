import { AIAnalysisResult } from "../types";

// Helper to mimic the SDK's Type enum locally so we don't need the top-level import
const SchemaType = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  INTEGER: 'INTEGER',
  BOOLEAN: 'BOOLEAN',
  ARRAY: 'ARRAY',
  OBJECT: 'OBJECT',
};

// Safe accessor for API Key
const getApiKey = (): string => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.process?.env?.API_KEY) {
    // @ts-ignore
    return window.process.env.API_KEY;
  }
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env?.API_KEY) {
    // @ts-ignore
    return process.env.API_KEY;
  }
  return '';
};

export const analyzeProjectRisk = async (projectDetails: string): Promise<AIAnalysisResult> => {
  try {
    // Dynamic import: Only load the SDK when this function is called.
    // This prevents the entire app from crashing if the module fails to resolve at startup.
    // @ts-ignore
    const { GoogleGenAI, Type } = await import("@google/genai");

    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn("API Key is missing. Using fallback data.");
      throw new Error("Missing API Key");
    }

    const ai = new GoogleGenAI({ apiKey });
    const modelId = "gemini-2.5-flash"; 
    
    const prompt = `
      You are an expert financial risk analyst for an investment platform called Loopital.
      Analyze the following project details and provide a risk assessment.
      
      Project Details:
      "${projectDetails}"
      
      Return a JSON object with:
      1. riskScore: A number between 1 (Very Low Risk) and 10 (Very High Risk).
      2. summary: A 2-sentence executive summary of why you gave this score.
      3. pros: An array of strings listing up to 3 strengths.
      4. cons: An array of strings listing up to 3 weaknesses/risks.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            pros: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            cons: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["riskScore", "summary", "pros", "cons"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAnalysisResult;
    } else {
      throw new Error("No data returned from AI");
    }

  } catch (error) {
    console.error("Gemini Analysis Failed or Module Load Error:", error);
    // Fallback if AI fails (graceful degradation)
    return {
      riskScore: 5,
      summary: "AI Analysis unavailable (Simulated Response). This project requires standard due diligence.",
      pros: ["Standard Market Opportunity", "Verified Owner"],
      cons: ["Automated Risk Check Failed", "Manual Review Recommended"]
    };
  }
};
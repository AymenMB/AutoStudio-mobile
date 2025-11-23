import { GoogleGenAI, Type } from "@google/genai";
import { GEMINI_API_KEY } from "../constants/theme";

// Gemini Models
export const MODEL_GEMINI_3_PRO = 'gemini-3-pro-preview';
export const MODEL_GEMINI_3_PRO_IMAGE = 'gemini-3-pro-image-preview';
export const MODEL_GEMINI_2_5_FLASH = 'gemini-2.5-flash';
export const MODEL_GEMINI_2_5_FLASH_IMAGE = 'gemini-2.5-flash-image';
export const MODEL_VEO = 'veo-3.1-fast-generate-preview';

const getAiClient = () => {
  const apiKey = GEMINI_API_KEY;
  if (!apiKey || apiKey === '***') {
    console.warn("API Key is missing. Please add GEMINI_API_KEY to constants");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'MISSING_KEY' });
};

/* --- GARAGE AUTO-FILL ANALYSIS --- */
export const analyzeCarUpload = async (base64Images: string[]) => {
  const ai = getAiClient();
  
  // Prepare parts
  const parts: any[] = base64Images.map(img => ({
    inlineData: {
      data: img,
      mimeType: 'image/jpeg'
    }
  }));
  
  parts.push({ text: "Analyze these car images. Identify the make, model, estimated year (integer), specific color name (e.g., 'Miami Blue'), engine type, horsepower (integer), and any visible modifications (e.g., 'Aftermarket Wheels', 'Wing')." });

  const response = await ai.models.generateContent({
    model: MODEL_GEMINI_3_PRO,
    contents: {
      parts: parts
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          make: { type: Type.STRING },
          model: { type: Type.STRING },
          year: { type: Type.INTEGER },
          color: { type: Type.STRING },
          specs: {
            type: Type.OBJECT,
            properties: {
              engine: { type: Type.STRING },
              horsepower: { type: Type.INTEGER },
              mods: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        },
        required: ["make", "model", "color"]
      }
    }
  });

  return response.text;
};

/* --- GENERATE CAR IMAGE WITH STYLE (Studio Feature) --- */
export const generateCarImageWithStyle = async (
  carImageUrl: string,
  style: string,
  styleDescription: string,
  carDetails: { make: string; model: string; year?: number; color?: string }
): Promise<string> => {
  const ai = getAiClient();
  
  const { make, model, year, color } = carDetails;
  const vehicleDesc = `${color || 'sleek'} ${year || ''} ${make} ${model}`.trim();
  
  const prompt = `A photorealistic, ultra high-resolution shot of a ${vehicleDesc}. The car is positioned as the hero subject in ${styleDescription}. Professional automotive photography with perfect composition, sharp focus, and rich detail.`;
  
  // Fetch and convert the car image
  let imageData: string;
  let mimeType: string;
  
  if (carImageUrl.startsWith('data:')) {
    imageData = carImageUrl.split(',')[1];
    mimeType = carImageUrl.match(/:(.*?);/)?.[1] || 'image/jpeg';
  } else {
    const response = await fetch(carImageUrl);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    imageData = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    mimeType = blob.type || 'image/jpeg';
  }
  
  const response = await ai.models.generateContent({
    model: MODEL_GEMINI_2_5_FLASH_IMAGE,
    contents: {
      parts: [
        {
          inlineData: {
            data: imageData,
            mimeType: mimeType
          }
        },
        { text: prompt }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated from Gemini Flash Image API");
};

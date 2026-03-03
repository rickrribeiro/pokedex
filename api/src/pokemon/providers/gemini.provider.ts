import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenAI, Content } from "@google/genai";

@Injectable()
export class GeminiProvider {
  private readonly gemini: GoogleGenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("GEMINI_API_KEY");
    if (!apiKey) {
      throw new InternalServerErrorException("GEMINI_API_KEY not defined");
    }
    this.gemini = new GoogleGenAI({ apiKey });
  }

  async generateChatResponse(
    systemInstruction: string,
    history: Content[],
    question: string,
  ): Promise<string> {
    try {
      const contents = [
        { role: "system", parts: [{ text: systemInstruction }] },
        ...history,
        {
          role: "user",
          parts: [{ text: question }],
        },
      ];

      const response = await this.gemini.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: { temperature: 0.4, maxOutputTokens: 1024 },
      });

      return response.text || "Erro generating response";
    } catch (error) {
      console.error("Gemini API error", error);
      throw new InternalServerErrorException("Gemini API error");
    }
  }
}

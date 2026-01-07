
import { GoogleGenAI } from "@google/genai";

export async function getFinancialAdvice(query: string): Promise<string> {
  // Always initialize GoogleGenAI using a named parameter for apiKey and use process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `Bạn là Finsmart AI, một chuyên gia tư vấn tài chính tại Việt Nam. 
        Nhiệm vụ của bạn là tư vấn cho khách hàng về các sản phẩm vay tiêu dùng và thẻ tín dụng. 
        Hãy luôn lịch sự, chuyên nghiệp và đưa ra lời khuyên dựa trên các tiêu chí: 
        1. Lãi suất thấp nhất có thể.
        2. Phù hợp với thu nhập.
        3. Uy tín của tổ chức tài chính. 
        Nhấn mạnh rằng Finsmart không phải là tín dụng đen. Hãy khuyên khách hàng liên hệ Zalo 0337.502.217 để được hỗ trợ chuyên sâu nếu cần.`,
      },
    });

    // Access the .text property directly from the GenerateContentResponse object.
    return response.text || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này. Vui lòng thử lại sau.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Có lỗi xảy ra khi kết nối với trợ lý AI. Vui lòng kiểm tra lại sau.";
  }
}

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBKW58fOycg7MJv8vqowK5BrVy0so2OqjQ');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

async function aiRun(keyword, type) {
  const prompt = `${keyword} 단어가 ${type}과 관련있으면 "예", 관련없으면 "아니오"로 답해줘`;
  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
};

export default aiRun;
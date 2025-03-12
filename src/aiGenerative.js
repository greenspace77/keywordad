import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBKW58fOycg7MJv8vqowK5BrVy0so2OqjQ");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function aiRun(keywords, types) {
  if (keywords.length !== types.length) {
    throw new Error("The number of keywords and types should be the same");
  }

  const prompt = keywords
    .map((keyword, index) => {
      const type = types[index];
      return `lease answer only "yes" or "no" whether ${keyword} is related to ${type}`;
    })
    .join("\n");

  console.log(prompt);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

  const responses = text.split("\n").map((line, index) => ({
    keyword: keywords[index],
    type: types[index],
    response: line.trim(),
  }));

  return responses;
}

export default aiRun;

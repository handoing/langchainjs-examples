import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import M from '../model.js';

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  answer: "用户问题的答案",
  name: "用户问题里的人名",
});

const prompt = PromptTemplate.fromTemplate("尽可能的从专业的角度回答问题 \n{instructions} \n问题是：{question}")
const model = M('ollama');

const chain = prompt.pipe(model).pipe(parser)
const answer = await chain.invoke({
    question: "齐白石和鲁迅分别有哪些代表作？",
    instructions: parser.getFormatInstructions()
})

console.log(answer)
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import M from '../model.js';

const parser = new CommaSeparatedListOutputParser();

const model = M('ollama');
const prompt = PromptTemplate.fromTemplate("列出3个{type}种类下的元素。\n{instructions}")
    
const chain = prompt.pipe(model).pipe(parser)

const answer = await chain.invoke({
    type: "水果",
    instructions: parser.getFormatInstructions(),
});

console.log(answer)
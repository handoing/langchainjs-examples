import { PromptTemplate } from "@langchain/core/prompts";

const prompt = new PromptTemplate({
  inputVariables: ['name'],
  template: '{name}, 你好',
});
const formatPrompt = await prompt.format({ name: '小明' });

console.log(formatPrompt);

// const template = PromptTemplate.fromTemplate('{name}, 你好');
// const formatPrompt = await template.format({ name: '小明' });
// console.log(formatPrompt)

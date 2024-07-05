import { ConversationSummaryMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import M from '../../llm/model.js';

const chatModel = M('openai');

const memory = new ConversationSummaryMemory({
    memoryKey: "summary",
    llm: chatModel,
});

const prompt = PromptTemplate.fromTemplate(`
你是个乐于助人的助手，尽你所能回答所有问题。

这是聊天记录的摘要:
{summary}
Human: {input}
AI:
`);

const chain = new ConversationChain({ llm: chatModel, prompt, memory });

const res1 = await chain.call({ input: '你好，我的名字叫Han' });
console.log(res1);
const res2 = await chain.call({ input: '我叫什么？' });
console.log(res2);

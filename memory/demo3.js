import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import M from '../model.js';

const chatModel = M('openai');
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: chatModel, memory: memory });
const res1 = await chain.call({ input: '你好，我的名字叫Han' });
console.log(res1);
const res2 = await chain.call({ input: '我叫什么？' });
console.log(res2);

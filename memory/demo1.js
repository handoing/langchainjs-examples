import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import M from '../model.js';

const chatModel = M('openai');
const outputPraser = new StringOutputParser();
const history = new ChatMessageHistory();
const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage('你是个乐于助人的助手，尽你所能回答所有问题。'),
    new MessagesPlaceholder("history_message"),
]);

const chain = prompt.pipe(chatModel).pipe(outputPraser);

const say = async (message) => {
    await history.addMessage(new HumanMessage(message));
    const res = await chain.invoke({
        history_message: await history.getMessages()
    })
    console.log(res);
    await history.addMessage(res)
}

await say('你好，我的名字叫Han');
await say('我叫什么？');

import crypto from 'crypto';
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import M from '../model.js';

function generateSessionId() {
    return crypto.randomBytes(16).toString('hex');
}

const A_SID = generateSessionId();
console.log(`A_SID: ${A_SID}`);
const B_SID = generateSessionId();
console.log(`B_SID: ${B_SID}`);

const chatModel = M('openai');
const outputPraser = new StringOutputParser();
const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage('你是个乐于助人的助手，尽你所能回答所有问题。'),
    new MessagesPlaceholder("history_message"),
    ["human", "{input}"]
]);

const historyMap = new Map([
    [ A_SID, new ChatMessageHistory() ],
    [ B_SID, new ChatMessageHistory() ],
])

const chain = prompt.pipe(chatModel).pipe(outputPraser);

const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: (sessionId) => historyMap.get(sessionId),
    inputMessagesKey: "input",
    historyMessagesKey: "history_message",
});

const say = async (input, sessionId) => {
    const res = await chainWithHistory.invoke({ input }, { configurable: { sessionId } });
    console.log(`${sessionId.slice(0, 6)}: ${res}`);
}

await say('你好，我的名字叫Han', A_SID);
await say('我叫什么？', A_SID);

await say('我叫什么？', B_SID);

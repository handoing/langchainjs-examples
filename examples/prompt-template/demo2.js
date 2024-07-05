import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import M from '../../llm/model.js';

const chatPrompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate('你是一个专业的翻译员，你的任务是将文本从{source_lang}翻译成{target_lang}。'),
    HumanMessagePromptTemplate.fromTemplate('请翻译这句话：{text}'),
]);

// const formattedChatPrompt = await chatPrompt.formatMessages({
//     source_lang: "中文",
//     target_lang: "日文",
//     text: "你好啊",
// });

const model = M('ollama');
const outputPraser = new StringOutputParser();

const chain = chatPrompt.pipe(model).pipe(outputPraser);

const answer = await chain.invoke({
    source_lang: "中文",
    target_lang: "日文",
    text: "你好啊",
})

console.log(answer)


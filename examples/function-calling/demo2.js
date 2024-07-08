import { SearchApi } from "@langchain/community/tools/searchapi";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import { Calculator } from "@langchain/community/tools/calculator";
import M from '../../llm/model.js'

const tools = [
    new SearchApi(),
    new Calculator(),
];

const prompt = await pull("hwchase17/react");

const llm = M('openai', { temperature: 0 });

const agent = await createReactAgent({
    llm,
    tools,
    prompt,
});

const agentExecutor = new AgentExecutor({
    agent,
    tools,
});

const res = await agentExecutor.invoke({
    input: "1BTC可以兑换多少ETH？",
});

console.log(res);
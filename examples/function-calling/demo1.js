import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"
import { JsonOutputToolsParser } from "@langchain/core/output_parsers/openai_tools"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import fetch from 'node-fetch'
import M from '../../llm/model.js'

const weatherMap = { "海淀": 101010200, "朝阳": 101010300, "顺义": 101010400, "怀柔": 101010500, "通州": 101010600, "昌平": 101010700, "延庆": 101010800, "丰台": 101010900, "石景山": 101011000, "大兴": 101011100, "房山": 101011200, "密云": 101011300, "门头沟": 101011400, "平谷": 101011500 }

const GET_CURRENT_WEATHER = "getCurrentWeather"

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个乐于助人的助手"],
    ["human", "{input}"]
])

const model = M('openai', { temperature: 0 }).bind({
    tools: [
        {
            type: "function",
            function: {
                name: GET_CURRENT_WEATHER,
                description: "获取给定城市或者区县的当前天气",
                parameters: zodToJsonSchema(z.object({
                    location: z.string().describe("只获取区的名字，例如：朝阳，东城、西城等等。"),
                })),
            }
        }
    ]
})

const outputPraser = new JsonOutputToolsParser();

const chain = prompt.pipe(model).pipe(outputPraser);

const res = await chain.invoke({ input: "大兴区现在的天气怎么样？" });

if (res.length > 0) {
    const { type, args } = res[0]
    if (type === GET_CURRENT_WEATHER) {
        const temp = await getCurrentWeather(args)
        console.log(`温度：${temp}`)
    }
}

async function getCurrentWeather({ location }) {
    const cityId = weatherMap[location]
    const response = await fetch(`http://aider.meizu.com/app/weather/listWeather?cityIds=${cityId}`);
    const data = await response.json();
    if (data.code === '200') {
        return data.value[0].realtime.temp
    }
}


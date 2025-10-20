import { BillDTO } from '@/interfaces/BillDTO';
import OpenAI from 'openai';


const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "", // Add your OpenRouter API key here
    dangerouslyAllowBrowser: true
});

export async function getIATip(finances:BillDTO[], moneyUnit:string, earnings: number, languaje:string) {

    let financeString = "";
    finances.forEach((finance)=>{
        financeString += `{billName: ${finance.billName}, billType:${finance.billType.bill_type}, value: ${finance.billValue} ${moneyUnit}}\n`
    })

    const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
            {
                "role": "system",
                "content": "You are an expert in personal finance and you help people save money effectively, provide practical advice based on the personal finances they give you."
            },
            {
                "role": "user",
                "content": `How can I save money effectively? These are my monthly expenses ${financeString}. My earnings are ${earnings} ${moneyUnit} per month. Please provide your answer in ${languaje}.`
            }
        ],

    });

    return completion.choices[0].message.content;
}

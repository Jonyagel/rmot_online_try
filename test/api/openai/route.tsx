import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

export const dynamic = 'auto';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const bodyData = await req.json();
        
        if (!bodyData.input) {
            return NextResponse.json({ msg: "Input is required" }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            console.error("OPENAI_API_KEY is not set");
            return NextResponse.json({ msg: "Server configuration error" }, { status: 500 });
        }

        const response = await openai.moderations.create({ input: bodyData.input });
        
        return NextResponse.json(response);
    }
    catch (err: any) {
        console.error("Error in moderation API:", err);

        if (err instanceof OpenAI.APIError) {
            console.error("OpenAI API Error:", err.status, err.message);
            if (err.message.includes("Connection error")) {
                return NextResponse.json({ msg: "Unable to connect to OpenAI services. Please try again later." }, { status: 503 });
            }
            return NextResponse.json({ msg: "Error from OpenAI API", details: err.message }, { status: err.status || 500 });
        }

        if (err.message && err.message.includes("Connection error")) {
            return NextResponse.json({ msg: "Unable to connect to OpenAI services. Please try again later." }, { status: 503 });
        }

        return NextResponse.json({ msg: "An unexpected error occurred", details: err.message }, { status: 500 });
    }
}
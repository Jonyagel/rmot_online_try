import { NextResponse } from "next/server";
import { ForumModel } from "@/src/app/models/forumModel";
import { connectDb } from "@/src/app/db/connectDb";

export async function GET(req:any,route:any){
  const idParams = route.params.id || '';
  try{
    await connectDb();
    const data = await ForumModel.find({ })
    return NextResponse.json({data})
  }
  catch(err){
    console.log(err);
    return NextResponse.json({err,msg:"There problem try again later"},{status:502})
  }
}
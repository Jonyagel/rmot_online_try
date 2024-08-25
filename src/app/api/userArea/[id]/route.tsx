import { NextResponse } from "next/server";
import { connectDb } from "../../../db/connectDb";
import { NadlanModel } from "../../../models/nadlanModel";

export async function GET(req:any,route:any){
  const idParams = route.params.id || '';
  try{
    await connectDb();
    const data = await NadlanModel.find({userId: idParams })
    return NextResponse.json({data})
  }
  catch(err){
    console.log(err);
    return NextResponse.json({err,msg:"There problem try again later"},{status:502})
  }
}
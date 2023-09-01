import {NextResponse} from "next/server";
import Stripe from 'stripe'

export async function POST(request:any) {
const data1:any=await request.json();
const amount =data1.amount;
const stripe=new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!,{
    typescript:true,
    apiVersion:"2023-08-16"
});

    try {
        const paymentIntent=await stripe.paymentIntents.create({
            amount:Number(amount),
            currency:"USD"
        })
        return NextResponse.json(paymentIntent.client_secret,{status:200})
        
    } catch (error:any) {
        return new NextResponse(error,
            {status:400
            });
    }
    
}
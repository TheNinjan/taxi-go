import React, { useContext } from 'react'
import {useStripe,useElements,PaymentElement} from "@stripe/react-stripe-js"
import { SelectedCarAmount } from '@/context/SelectedCarAmount';
function CheckoutForm() {
  const {carAmount,setCarAmount}=useContext(SelectedCarAmount);
  console.log(carAmount)
  const stripe:any=useStripe()
  const elements:any=useElements()
  
  const handleSubmit =async(event:any)=>{
    event.preventDefault();
    if(elements==null){
      return;
    }
    const {error:submitError} =await elements.submit()
    if(submitError){
      return;
    }
    
    const res = await fetch("/api/create-intent",{
      method:'POST',
      body:JSON.stringify({
        amount:carAmount
      }),
    }) 
    const secretKey=await res.json()
    console.log(secretKey)

    const {error}=await stripe.confirmPayment({
      clientSecret:secretKey,
      elements,
      confirmParams:{
        return_url:"http://localhost:3000/"
      }
    })
  } 

  return (
    <div className='flex flex-col justify-center items-center w-full  mt-6'>
    <form onSubmit={handleSubmit} className='max-w-md'>
      <PaymentElement/>
      <button className='w-full bg-yellow-500 p-2 rounded-lg mt-2' type='submit' disabled={!stripe||!elements} >Pay</button>
    </form>
    </div>
  )
}

export default CheckoutForm

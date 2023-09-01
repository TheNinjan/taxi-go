"use client"
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import CheckOutForm from '@/components/payment/CheckOutForm';
function Payment() {
  const stripePromise=loadStripe("pk_test_51NjfVeSE3UViB8tD9wKC9dp1NKpUpyH5EMbOTi5jtyLp1FfH1HLo8OLy9Yi3K6iFney6881peTpprhAjBNRH2qhZ00IZIOwF09")
  const options:any={
    mode:'payment',
    amount:58,
    currency:'usd'
  }
  return (
    <Elements stripe={stripePromise} options={options}>
        <CheckOutForm/>
    </Elements>
  )
}
export default Payment

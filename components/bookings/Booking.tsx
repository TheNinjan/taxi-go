import React, { useContext } from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'
import Cars from './Cars'
import Cards from './Cards'
import { useRouter } from 'next/navigation';
import { SelectedCarAmount } from '@/context/SelectedCarAmount';

function Booking() {
    const router:any=useRouter();
    const {carAmount,setCarAmount}=useContext(SelectedCarAmount);
    console.log(carAmount)
  return (
    <div className='p-5'>
        <h2 className='text-[20px] font-semibold'> Booking</h2>
        <div className='border-[1px] p-5 rounded-md'>
        <AutoCompleteAddress/>
        <Cars ></Cars>
        <Cards></Cards>
        <button 
        disabled={!carAmount}
        className={`w-full ${!carAmount ?`bg-gray-200`:`bg-yellow-400`}  p-1 rounded-md mt-4 `}
        onClick={()=>router.push('/payment')}
        >Book</button>
        </div>
    </div>
  )
}

export default Booking

'use client'
import React, { useContext, useState } from 'react'
import Image from "next/image"
import Carslist from '@/data/Carslist'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import { SelectedCarAmount } from '@/context/SelectedCarAmount'

function Cars() {
    const [selectedCar,setSelectedCar]=useState<any>()
    const {directionData, setDirectionData} = useContext(DirectionDataContext);
    const {carAmount,setCarAmount}=useContext(SelectedCarAmount);
    
    const getCost=(charges:number)=>{
      return (charges*directionData.routes[0].distance*0.000621371192)
      .toFixed(2)
    }
  return (
    <div className='mt-5'>
      <h2 className='font-semibold'> Select Car</h2>
      <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 '>
        {Carslist.map((item,index)=>
        <div key={index} 
        onClick={()=>{setSelectedCar(index);
          setCarAmount(getCost(item.charges))}}
        className={`m-2 p-2 border-[2px] rounded-md  cursor-pointer hover:border-yellow-400 ${index==selectedCar?`border-yellow-400`:null}`}
        >
                <Image src={item.image} alt='hbha' width={75} height={90} className='w-full' />
                <h2 className='text-[12px] text-gray-500'>{item.name}
                {directionData.routes? <span className='float-right font-medium  text-black'>${getCost(item.charges)}</span>:null}
                 </h2>
        </div>
        )}
      </div>
    </div>
  )
}

export default Cars

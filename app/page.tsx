"use client"
import Booking from "@/components/bookings/Booking";
import MapBoxMap from "@/components/map/MapBoxMap";
import { DestinationCoordinatesContext } from "@/context/DestinationCoordinatesContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmount } from "@/context/SelectedCarAmount";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";

 
export default function Home() {
    const [userLocation,setUserLocation]=useState<any>();
    const[sourceCordinates,setSourceCordinates]=useState<any>()
    const [destinationCordinates,setDestinationCordinates]=useState<any>()
    const [directionData,setDirectionData]=useState<any>([]);
    const [carAmount,setCarAmount]=useState<any>(0);
  useEffect(()=>{
    getUserLocation()
  },[])
  const getUserLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
    })
  }
  return (
    <div className="">
      <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
      <SourceCoordinatesContext.Provider value={{sourceCordinates,setSourceCordinates}}>
      <DestinationCoordinatesContext.Provider value={{destinationCordinates,setDestinationCordinates}}>
      <DirectionDataContext.Provider value={{directionData,setDirectionData}}>
      <SelectedCarAmount.Provider value={{carAmount,setCarAmount}}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className=" bg-blue-100">
            <Booking></Booking>
        </div>
        <div className="col-span-2 bg-red-50 order-first md:order-last" >
          <MapBoxMap></MapBoxMap>
        </div>
      </div>
      </SelectedCarAmount.Provider>
      </DirectionDataContext.Provider>
      </DestinationCoordinatesContext.Provider>
      </SourceCoordinatesContext.Provider>
      </UserLocationContext.Provider>
    </div>
  )
}
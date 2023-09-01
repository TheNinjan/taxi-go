"use client"
import { UserLocationContext } from '@/context/UserLocationContext';
import * as React from 'react';
import { useContext, useEffect, useRef } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './Markers';
import { SourceCoordinatesContext } from '@/context/SourceCoordinatesContext';
import { DestinationCoordinatesContext } from '@/context/DestinationCoordinatesContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import MapBoxRout from './MapBoxRout';
import DistanceTime from '../bookings/DistanceTime';


const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "f2a750d4-8cab-4833-a88c-b9eb6169a123";
function MapBoxMap() {
    const {userLocation ,setUserLocation}=useContext(UserLocationContext);
    const mapRef = useRef<any>();
    const { sourceCordinates, setSourceCordinates }=useContext(SourceCoordinatesContext);
    const { destinationCordinates, setDestinationCordinates } = useContext(DestinationCoordinatesContext);
    const {directionData, setDirectionData} = useContext(DirectionDataContext);

    useEffect(() => {
      if (sourceCordinates) {
        mapRef.current?.flyTo({
          center: [sourceCordinates.lng, sourceCordinates.lat],
          duration: 2500,
        });
      }
    }, [sourceCordinates]);

    useEffect(() => {
      if (destinationCordinates) {
        mapRef.current?.flyTo({
          center: [destinationCordinates.lng, destinationCordinates.lat],
          duration: 2500,
        });
      }
      if (sourceCordinates && destinationCordinates) {
        getDirectionRoute();
      }
    }, [destinationCordinates]);

    const getDirectionRoute =async()=>{
      const res = await fetch(
        MAPBOX_DRIVING_ENDPOINT +
          sourceCordinates.lng +
          "," +
          sourceCordinates.lat +
          ";" +
          destinationCordinates.lng +
          "," +
          destinationCordinates.lat +
          "?overview=full&geometries=geojson" +
          "&access_token=" +
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      console.log(result);
      console.log(result.routes);
      setDirectionData(result);
    };
    
  return (
    <div className='p-5 '>
        <h2 className='text-[10px] font-semibold'>Map</h2>
        <div className='rounded-lg overflow-hidden'>
       {userLocation? (<Map ref={mapRef} mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
             initialViewState={{
                longitude:userLocation?.lng,
                latitude: userLocation?.lat,
                zoom: 14
              }}
             style={{ width: "100%", height: 450, borderRadius: 10 }}
             mapStyle="mapbox://styles/mapbox/streets-v9">
            <Markers/>
            {directionData?.routes ? (
              <MapBoxRout
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
</Map>):null}
    </div >
    <div className="absolute bottom-[91px]
      z-20 right-[10px] hidden md:block ">
     <DistanceTime />
     </div>
    </div>
  )
 }

export default MapBoxMap

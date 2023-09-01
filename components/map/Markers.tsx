import React, { useContext } from 'react'
import  { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { UserLocationContext } from '@/context/UserLocationContext';
import { DestinationCoordinatesContext } from '@/context/DestinationCoordinatesContext';
import { SourceCoordinatesContext } from '@/context/SourceCoordinatesContext';
function Markers() {
    const {userLocation ,setUserLocation}=useContext(UserLocationContext)
    const {sourceCordinates,setSourceCordinates}=useContext(SourceCoordinatesContext)
    const {destinationCordinates,setDestinationCordinates}=useContext(DestinationCoordinatesContext)
  return (
    <div>
      <Marker longitude={userLocation?.lng} 
              latitude={userLocation?.lat}
              anchor="bottom" >
    <img src="./pin.png"  className='w-10 h-10'/>
    </Marker>
    {/* Source marker */}
    {sourceCordinates? <Marker 
                longitude={sourceCordinates?.lng} 
                latitude={sourceCordinates?.lat} 
                anchor="bottom" >
                  <img src="./location.png" 
                 className='w-10 h-10'
                 />
                
                 
                </Marker>:null}

    {/* Destination Marker  */}

    {destinationCordinates? <Marker 
                longitude={destinationCordinates?.lng} 
                latitude={destinationCordinates?.lat} 
                anchor="bottom" >
                  <img src="./location.png" 
                 className='w-10 h-10'
                 />
                </Marker>:null}
    </div>
  )
}

export default Markers

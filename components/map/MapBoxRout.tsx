import React from 'react'
import Map, { AttributionControl, GeolocateControl , Layer, Marker, NavigationControl,
    Popup, Source } from "react-map-gl";

function MapBoxRout(props:any) {
  
  return (
    <Source type="geojson" data={
      {"type" : "FeatureCollection", "features" : [{"type": "Feature", "geometry": {"type":"Point","coordinates":[1,1]}, "properties": {"id": 1, "name": "one"}}, {"type": "Feature", "geometry": {"type":"Point","coordinates":[2,2]}, "properties": {"id": 2, "name": "two"}}, {"type": "Feature", "geometry": {"type":"Point","coordinates":[3,3]}, "properties": {"id": 3, "name": "three"}}]}
}>
        <Layer
          type="line"
          layout={{ 'line-join': 'round', 'line-cap': 'square' }}
          paint={{ 'line-color': '#0462d4', 'line-width': 4 }}
        />
      </Source>
  )
}

export default MapBoxRout

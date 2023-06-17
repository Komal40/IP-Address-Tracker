import React from 'react'
import {Marker, useMap} from 'react-leaflet'

export default function LocationMarker({position}) {
  const map=useMap()

  map.flyTo([position.lat, position.lng], 13, {animate:true})
  
  return position!=null ? <Marker position={position}></Marker> : null
}

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Map, Marker, NavigationControl, MapvglView, MapvglLayer } from 'react-bmapgl';
import axios from '../services';
export default function CinemaIndex() {
  const [data, setData] = useState([])
  const [list,setList] = useState([{
    geometry: {
      type: 'Point',
      coordinates: [116.403748, 39.915055]
    }
  },
  {
    geometry: {
      type: 'Point',
      coordinates: [120.403748, 41.915055]
    }
  }
])
  useEffect(() => {
    axios.get('/api/cinemas/infos/loca').then(res => {
      console.log(res)
      if (res.data.errNo === 0) {
        setData(res.data.paginate)
        setList(res.data.paginate.slice(0,99).map(item=>({
          geometry: {
            type: 'Point',
            coordinates: [item.gpsaddress.split(',')[0]-0, item.gpsaddress.split(',')[1]-0]
          }
        })))
      }
      setTimeout(()=>{
        console.log([data.slice(0,199).map(item=>({
          geometry: {
            type: 'Point',
            coordinates: [item.gpsaddress.split(',')[0]-0, item.gpsaddress.split(',')[1]-0]
          }
        }))])
      },5000)
    })
  }, [])
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        style={{ height: '100%', width: '100%' }}
        center={{ lng: 116.402544, lat: 39.928216 }}
        enableScrollWheelZoom={true}
        zoom="11">
        <MapvglView effects={['bright']}>
          <MapvglLayer
            type="PointLayer"
            data={list}
            options={{
              blend: 'lighter',
              size: 12,
              color: 'red'
            }}
          />
        </MapvglView>
        {/* <Marker position={{lng: 116.402544, lat: 39.928216}} /> */}
        <NavigationControl />
      </Map>
    </div>
  )
}

import { useEffect, useState } from "react"
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'


type Place = google.maps.places.PlaceResult



export default function App(){
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })
  const [places, setPlaces] = useState<Place[]>([])


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position=>{
      console.log(`Position: ${position}`)
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }, error=>{
      console.error(`Error ao buscar localização: ${error}`)
    })
  }, [])

  useEffect(()=>{
    if(userLocation.lat !== 0 && userLocation.lng !== 0){
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      )

      const request = {
        location: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
        radius: 5000,
        keyword: 'McDonald\'s'
      }

      service.nearbySearch(request, (results, status)=>{
        if(status === window.google.maps.places.PlacesServiceStatus.OK && results){
          setPlaces(results)
          console.log('Restultado: ', results)
        }else{
          console.error(`PlaceServies falou: ${status}`)
        }
      })
    }
  }, [userLocation])

  return(
    <LoadScript googleMapsApiKey="AIzaSyDRDtZy_CrM0csM_Y51FU01-tiW4F2SapU" libraries={['places']}>
      <GoogleMap mapContainerStyle={{height:'400px', width:'100%'}} center={userLocation} zoom={15} >
        <Marker position={userLocation} label='Você'/>

        {places.map((place) => (
          <Marker
            key={place.place_id ?? Math.random()}
            position={{
              lat: place.geometry?.location?.lat() ?? 0,
              lng: place.geometry?.location?.lng() ?? 0,
            }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}
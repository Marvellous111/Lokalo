export const useLocationServices = () => {
  const reverseGeocode = async (coords: { lat: number; lng: number }) => {
    try {
      const res = await $fetch("/api/location/getLocationData", {
        method: 'POST',
        body: { latitude: coords.lat, longitude: coords.lng }
      })

      if (res.res_status == 200) {
        return res
      } else if (res.res_status == 400) {
        throw new Error("An error occured server side for location")
      }

    } catch(error) {
      if (error.name === 'GeoLocationPositionError') {
        console.log("An error occured from the location position error")
      }
      console.error(`An error occurred: ${error}`)
    }
  }

  const getLocationCoordinates = async(): Promise<GeolocationPosition | null> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(`Geolocation not supported for this browser or device`)
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000
      })
    })
  }

  return { reverseGeocode, getLocationCoordinates }
}
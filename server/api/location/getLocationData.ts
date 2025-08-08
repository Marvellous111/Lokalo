

export default defineEventHandler(async(event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const server_api = config.server

  try {
    const res = await $fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client`, {
      params: { latitude: body.latitude, longitude: body.longitude }
    })

    const res_details = {
      res_status: 200,
      latitude: res.latitude,
      longitude: res.longitude,
      principalSubdivision: res.principalSubdivision,
      city: res.city,
      countryName: res.countryName,
      language: res.localityLanguageRequested 
    }
    return res_details

  }catch(error) {
    if (error.name === 'GeoLocationPositionError') {
      console.error("An error occurred while trying to hit the api, please try again later")
      throw new Error("GeoLocationPositionError: An error occurred while trying to hit the api, please try again later")
    }
    console.error(`An error occured with the location api: ${error}`)
    return {
      res_status: 400
    }
    // throw new Error("An error occurred while trying to hit the location api, please try again later")
  }
})
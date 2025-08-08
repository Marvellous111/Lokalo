export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig()
  const server_keys = config.server


  try {
    var formatted_city = "";
    if (body.city.includes(" ")) {
      formatted_city = body.city.replace(/\s+/g, "%20");
    }else {
      formatted_city = body.city
    }

    console.log(`Body with formatted city: ${formatted_city}`)
    console.log(body)

    // &filter.exists=properties.hours
    // urn:tag:genre:place:hotel:lodging
    // https://hackathon.api.qloo.com/v2/tags/types?filter.parents.types=urn:entity:place&take=30
    // https://hackathon.api.qloo.com/v2/insights?filter.type=urn:entity:place&filter.location=POINT%28${body.location.longitude}%20${body.location.latitude}%29&filter.location.query=${formatted_city}&filter.tags=urn:tag:category:place:hotels&take=8

    const hotels = await $fetch(`https://hackathon.api.qloo.com/v2/insights?filter.type=urn:entity:place&filter.exists=properties.price_range&filter.location=POINT%28${body.location.longitude}%20${body.location.latitude}%29&filter.location.query=${formatted_city}&filter.tags=urn:tag:category:place:hotel,urn:tag:genre:place:hotel&operator.filter.tags=intersection&take=${body.take}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-Api-Key': server_keys.qloo_api_key
      }
    })

    console.log(hotels)
    return hotels


  } catch(error) {
    console.error(`An error occured: ${error}`)
    throw new Error(`An error occurred server-side with HOTELS`)
  }

})
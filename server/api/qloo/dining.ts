// import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig();
  const server_keys = config.server

  try {
    // &filter.location=POINT%28${body.location.longitude}%20${body.location.latitude}%29
    // &operator.filter.tags=union
    // restaurant
    // dining_options:place:dinner
    // We want to get properties.hours for later

    var formatted_city = "";
    if (body.city.includes(" ")) {
      formatted_city = body.city.replace(/\s+/g, "%20");
    }else {
      formatted_city = body.city
    }
    console.log(`Body with formatted city: ${formatted_city}`)
    console.log(body)
    const qloo_insight = await $fetch(`https://hackathon.api.qloo.com/v2/insights?filter.type=urn:entity:place&filter.exists=properties.hours&filter.location=POINT%28${body.location.longitude}%20${body.location.latitude}%29&filter.location.query=${formatted_city}&filter.tags=urn:tag:dining_options:place:dinner,urn:tag:category:place:restaurant,urn:tag:genre:place:restaurant&operator.filter.tags=intersection&take=${body.take}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-Api-Key': server_keys.qloo_api_key
        }
      }
    )
    return qloo_insight

  } catch(error) {
    console.error(`An error occured: ${error}`)
    throw new Error(`An error occurred server-side with DINING`)
  }

})
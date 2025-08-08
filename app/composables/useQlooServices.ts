export const useQlooServices = () => {
  /*
  https://staging.api.qloo.com/v2/insights?
  filter.type=urn%3Aentity%3Aplace // default
  &filter.exists=properties.image // default
  &filter.location=POINT%287%204%29 //location
  &filter.location.query=Nigeria // city, country
  &filter.location.radius=0 // default
  &filter.popularity.min=0.5 //default
  // &filter.tags=urn%3Atag%3Agenre%3Arestaurant
  // &operator.filter.tags=union
  &take=8
  The above is for restaurants right? so we are going to test for restaurants
  we are also going to add time of day for restaurants and stores and hotels
  */
  const restaurants = async (
    location: { latitude: number, longitude: number },
    city: string,
    take: number
  ) => {
    try {
      const insight = await $fetch(`/api/qloo/dining`, {
        method: 'POST', // test without this
        body: { location: location, city: city, take: take }
      })

      return insight.results.entities
    } catch(error) {
      console.error(`COMPOSABLE - DINERS: An error occurred while getting the DINERS`)
    }
  }

  const hotels = async (
    location: { latitude: number, longitude: number },
    city: string,
    take: number
  ) => {
    try {
      const insight = await $fetch(`/api/qloo/hotels`, {
        method: 'POST', // test without this
        body: { location: location, city: city, take: take }
      })

      return insight.results.entities
    } catch(error) {
      console.error(`COMPOSABLES - HOTELS: An error occurred while getting the STAYS`)
    }
  }

  // const stores = async (
  //   location: { latitude: number, longitude: number },
  //   city: string,
  //   take: number
  // ) => {
  //   try {
  //     const insight = await $fetch(`/api/qloo/stores`, {
  //       method: 'POST', // Test this well and ensure it works with get instead and remove post or remove both
  //       body: { location: location, city: city, take: take }
  //     })
  //     return insight.results.entities
  //   } catch(error) {
  //     console.error(`An error occurred while getting the restaurants`)
  //   }
  // }


  return { restaurants, hotels, stores }
}
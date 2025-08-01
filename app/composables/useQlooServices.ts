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
    console.log(location)
    console.log(city)
    try {
      const insight = await $fetch(`/api/qloo/dining`, {
        method: 'POST',
        body: { location: location, city: city, take: take }
      })

      return insight.results.entities
    } catch(error) {
      console.error(`An error occurred while getting the restaurants`)
    }
  }

  const hotels = async (
    location: { latitude: number, longitude: number },
    city: string,
    take: number
  ) => {
    try {
      const insight = await $fetch(`/api/qloo/hotels`, {
        method: 'POST',
        body: { location: location, city: city, take: take }
      })
      console.log(insight.results.entities)
      return insight.results.entities
    } catch(error) {
      console.error(`An error occurred while getting the restaurants`)
    }
  }

  const stores = async (
    location: { latitude: number, longitude: number },
    city: string,
    take: number
  ) => {
    try {
      const insight = await $fetch(`/api/qloo/stores`, {
        method: 'POST',
        body: { location: location, city: city, take: take }
      })
      console.log(insight.results.entities)
      return insight.results.entities
    } catch(error) {
      console.error(`An error occurred while getting the restaurants`)
    }
  }


  return { restaurants, hotels, stores }
}
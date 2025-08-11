## Setup

Make sure to install dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


TODOs:

-[x] Implement search frontend for deal of day
-[x] Implement deal of day carousel
-[x] Implement Product card into the deals
-[x] Test Pictures to see how they will look
-[x] Implementing qloo
-[x] Test qloo insight with a bunch of queries to see how it looks
-[x] Implement Serper if possible today
-[x] Implement qloo insight to deal of the day
-[ ] Implement search function in deal of the day to lead to maps
-[x] Implement new search bar for normal search function in mobile mode
-[ ] Implement deal of the day display well
-[ ] Implement each product page as well
-[ ] Implement placeholder images for loading skeletons
-[ ] Implement normal loading icon for buttons
-[ ] Implement Map page with its search function
-[ ] Implement Map collision with deals page
-[ ] Implement globe toast
-[ ] Implement mobile version of experience


Fetch Product Flow:
- User enters the website making a request.
- We use qloo to get possible user preferences for deals of the day.
- We use qloo to also get possible user preferences for stays, dinning and perhaps stores.
- We use Serper api to fetch what we want the user to see for stays, dinning and stores and deals of the day
- We use firecrawl to crawl the required webpages if necessary (this may only be for stores)
- If serper has stays api from google or dinning api (as they should) then we use that for display.
- We then make some adjustments to fetched items for the user for clarity:
  - Increased picture quality, videos if necessary for deals of the day, look at dribbble
  - Picture for product type (stays, dinning, stores)
- User can make query on a stay, diner or store that leads to the map page.

Map page outline:
The map page will have a bunch of features, the first is the user location denoted by a blue dot on the map.
After that the map will then have the location of the store searched denoted by the location marker.
Then the map will also feature a search button to displayed at the top?bottom of the map.




Stays, Restaurants and Stores or shops will have multiple location choices close by.
They will have to be at user location, then a state above the user, then a country above a user.
Is this user oriented though, will the user like this??
Or we can have All of them having different types.
So stays will have things like a hotel, motel, 

Things to do for building lokalo
- Lokalo will be going for airbnb format of icons, more research will be done to create them.
- Lokalo will have a similar design to airbnb with a few changes here and there

use dribble for deal of the day design inspiration
Nav has:
- Lokalo logo/text icon
- Main features: Deals, Map, Pricing - Left Aligned
- Sign in/out

Sign in will be with email, google and apple. Email verification may not be necessary for now.
Truly we are supposed to validate emails though to filter spam accounts being created.
which means captcha?? or 2fa right out the gate.

------
Lokalo is not a one time use app, its an app whose goal is to keep the user open to interesting deals
such that they could use the app more to search for relevant deals around them....

We can only do hotels and restaurants at the moment. Leave products for later?

Lokalo focus: Majorly on Gen Z, Millenials and a small portion of boomers that care about the value.
Our major market is on gen z and millenials but will drift away from millenials in the coming years as the next gen is coming up.


Should i take gender from the user?? probably? or i should guess based on the user history...hmm

Free version for 0 dollars (Called basic):
- Company sponsored ads that do not concern the user could be shown...(iron this out more with michael)
- No deal of the day
- No comparison of deals
- Just 5 deals shown per user feed
- 1 website scraped for deals (small deal search range)
- One notification of new deals via email per week.
- User map use of 3 times per week.
- Lesser environmental preference taken into account to show deals (just weather, seasons)
- No user alerts

Pro version about 8 dollars (called pro):
- Company sponsored ads targeted to the user but will be less than basic (iron out later with michael)
- Deal of the day
- comparison of deals for up to 2 to 3 similar companies
- 10 deals shown per user feed
- 2 to 3 websites scraped for best results (broad deal search)
- Notification of new interesting deals for the user via email thrice per week.
- User map use increase for up to 7 times per week (once per day).
- More preference taken into account to show deals (everything in free plus, cost check, demographics)
- No user alerts

Final version about 20 dollars(called ):
- No company sponsored ads targeted to the user (iron out later with michael)
- Deal of the day (perhaps 2 deals? or 1)
- Comparison of about 5 to 6 deals for similar comapnies and markets.
- 15 to 20 deals shown per user feed
- 5 to 6 websites scraped for best results (broader deal search)
- Notification of new interesting deals 6 times per week.
- User map use increase for up to 15 times per week (twice per day on average)
- All local preference taken into account to show deals
- User alerts for specific deal days on specific local platforms and store (like amazon prime day, perhaps etsy and their local stores)


We want to take data from what is going on around them to search for items that will relate to them and show it to them.
factors like weather, events, seasons, cost of living for cheap items, demographic (male or female), environment, local health risks

User settings
- Upgrade plan
- Notification email
- Location details
- Username (future feature)
- Name of user
- Delete account button (make this hard to find????)
- User profile picture (must be easy to change as a fun feature)
- User preferences (if necessary, will iron this out later)
- 
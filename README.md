## Example App for HacktheNorth Frontend Challenge

React with Material UI Next

Preview: [https://codesandbox.io/s/github/music-mind/hackthenorth-frontend/tree/master/]

To use, clone this repo, then npm install and npm start afterwards.

1.What are some good ways to filter the given data?

Saved it locally after initial fetch (don't want polling). Then filter using state and updating the display that gets rendered. Otherwise, filter with backend (preferred) when querying the database.

2.What useful features could we build with the given data? For example, “Having coordinates of venue locations can help us give hackers automated directions to their saved activities...”

An event alert system, possibly sending texts to people who sign up for notifications, or pushing an event to slack, and even alerts via the HTN app.

3.What are some useful performance metrics for this application and why?

Load speed, so that hackers don't get bored when using the application. Also backend  optimization(eg query speed).

4.Could this data be useful for building any features / products for sponsors and/or other parties of Hack the North?

Dashboard to show party's own events. Sponsors could also create event pages, and have hackers sign up to them for their own data analysis.

5.<Other thoughts you may have; not limited to answering the previous questions>

Using a backend is much easier than filtering data all on the frontend. Would be easier to persist user data such as saved activities as well.

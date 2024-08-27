# Write a simple HTTP server in nodejs that:
1. Uses only the built in nodejs modules
2. Does not use the HTTP, HTTP/2 or HTTPS modules
3. Implements a GET /time route that returns the time in JSON
4. Implements a GET /data route that returns any data after 1 second
5. Uses correct HTTP headers
6. Holds up to any industry standard HTTP traffic generator tool

Not every HTTP feature is required, only as needed to implement the route. Describe any thought processes as required.

## How to use

```sh
npm ci # Install dependencies (Used Typescript and that's it. No lib deps)
npx tsc && node http.js
```
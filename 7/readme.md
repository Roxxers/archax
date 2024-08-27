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

## Notes

The goal with this one was to write only what is needed. We don't implement any inbound header processing even though we have left space to do this in the future. It wasn't needed for the implementation of the question. Left a system that could then be refactored into a library that could allow you to define new routes. The functions in them are very rudimentary though and can only return an object and can't define their own status codes. Implementing this would need context shared between layers of the program that have been skipped to save time and just implement what is needed as there was no future scope set in the question. You could theoretically write a lot shorter of a file to do the same but I wanted to also maximize some readablity in the answer. My implementation of HTTP isn't perfect even in the bounds of the question but it works for the small scope.
/* 
My approach for this is to make a very simple HTTP server instance.

Instead of writing a library for this, I will create a small script to do all of this to be the simpliest solution to thes problem since no future scope is given.

While making a more viable long team HTTP server would require functions for mounting routes and handling other HTTP methods, this will only implement the GET methods listed as required.

I looked into a few implementations of the test while also reading up on the libray "net" and using it to create the TCP server needed and then employing HTTP on top of that to match the requirements of the question.. I also consulted rfc2616 which outlines the 1.1 version of the protocol.

Once I did all this and has a fairly good idea of what needed to be done, I started on the code below. I choose to go with a more procedural code pattern vs OOP as I have used that more than OOP in TS. 

This implementation lacks the ability to change the port number and address/file that it binds to. It also is a very quick and simple solution that would need some more changes to make it applicable to other jobs than the one laid out in the question.

A much better solution with additional time would be to create a small library that would allow for route declarations to seperate concerns between what the routes should produce and how it should implement the HTTP protocol.
*/

import * as net from "net"

type Header = Record<string, string>

// Here will just allow JSON to returned by the server
type RouteHandler = () => object | null
// Where we will store routes
type Routes = Map<string, RouteHandler>
type StatusCodeMap = Map<number, string>

const implementedMethods = ["GET"]
const allowedMethods = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "CONNECT", "TRACE"]

const ADDR = "127.0.0.1"
const PORT = 8080

const ImplementedStatusMap: StatusCodeMap = new Map<number, string>([
    [200, "OK"],
    [400, "Bad Request"],
    [404, "Not Found"],
    [500, "Internal Server Error"],
    [501, "Not Implemented"]
])

enum StatusCode {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500,
    NotImplemented = 501
}

// Shorthand for route definitions 

function TimeRoute(): object {
    const currentDatetime = new Date()
    return { datetime: currentDatetime.toISOString() }
}

function DelayedRoute(): object {
    const start = new Date().getTime()
    while (Date.now() < start + 1000) { }
    return { delay: "ok" }
}

// We should really use a function here where we would pass all routes into a Record to store them but we will just hardcode it here to save time
const routes: Routes = new Map<string, RouteHandler>([
    ["/time", TimeRoute],
    ["/data", DelayedRoute]
])

function handleResponse(statusCode: number, headers: Header | null, body: string | object | null): string {
    const status = ImplementedStatusMap.get(statusCode)
    if (!status) {
        throw new Error(`Invalid status code: ${statusCode}`)
    }

    const responseLine = `HTTP/1.1 ${statusCode} ${status}\r\n`
    let headerLines = ""
    for (const header in headers) {
        headerLines += `${header}: ${headers[header]}\r\n`
    }

    let respBody = ""
    if (body) {
        respBody = JSON.stringify(body)
    }
    return responseLine + headerLines + "\r\n" + respBody
}

function responseBadRequest(): string {
    return handleResponse(StatusCode.BadRequest, {}, null)
}


function responseNotFound(): string {
    return handleResponse(StatusCode.NotFound, {}, null)
}

function responseInternalError(): string {
    return handleResponse(StatusCode.InternalServerError, {}, null)
}

function responseNotImplemented(): string {
    return handleResponse(StatusCode.NotImplemented, {}, null)
}

function logRequest(time: number, status: StatusCode, uri: string) {
    console.log(`time: ${time.toFixed(2)}µs`, `status: ${status}`, `uri: ${uri}`)
}

function currentMicroseconds(): number {
    const hrTime = process.hrtime()
    return hrTime[0] * 1000000 + hrTime[1] / 1000
}

const server = net.createServer((socket: net.Socket) => {

    const sendResponseAndClose = (response: string) => {
        socket.write(Buffer.from(response, 'utf8'))
        socket.end()
    }

    socket.on("error", (err: any) => {
        console.error(err)
        return sendResponseAndClose(
            responseInternalError()
        )
    })

    socket.on("data", (data) => {
        try {
            const startTime = currentMicroseconds()
            const request = data.toString()
            // Parse request line
            const [method, uri, _, __] = request.split("\r\n")[0].split(" ") // This format we expect required for a valid request line in HTTP

            if (!allowedMethods.includes(method)) {
                return sendResponseAndClose(responseBadRequest())
            }

            // Exit if not GET request
            if (!implementedMethods.includes(method)) {
                return sendResponseAndClose(responseNotImplemented())
            }

            // Handle our predefined routes
            const route = routes.get(uri)
            if (!route) {
                return sendResponseAndClose(
                    responseNotFound()
                )
            }

            // defining 200 here instead of allowing the routes to define their own status would be an improvement needed later on.
            let status = StatusCode.OK
            let body: object | null = null
            try {
                body = route()
            } catch (err) {
                console.error(err)
                return sendResponseAndClose(responseInternalError())
            }

            const response = handleResponse(
                status,
                { "Content-Type": "application/json" },
                body
            )
            const endTime = currentMicroseconds()
            const responseTime = endTime - startTime
            logRequest(responseTime, status, uri)
            return sendResponseAndClose(
                response
            )
        }
        catch (err) {
            console.error(err)
            return sendResponseAndClose(
                responseInternalError()
            )
        }
    })
});

server.on("listening", () => {
    console.log(`listening on ${ADDR}:${PORT}`)
})

server.listen(PORT, ADDR);

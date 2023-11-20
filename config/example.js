// The following is an example benchmark config object that Kaskade will accept
// It comes with detailed comments to explain each field.
// For an actual JSON file, see example.json.

const config = {
    // "servers" should contain a list of HTTP servers under test.
    //  REQUIRED, Must contain at least 1 server
    servers: [
        "localhost:3000",
    ],

    // REQUIRED, "testDuration" is the duration of running benchmark test, in seconds.
    testDuration: 600,

    // REQUIRED, the number of concurrent users to access HTTP servers
    concurrentUsers: 100,

    // OPTIONAL, the target number of HTTP requests to send to servers per second
    // if not set, the HTTP requests rate will be unlimited
    targetThroughput: 1000,

    // REQUIRED, a list of different types of sessions to run in this benchmark
    sessions: [{
        // a human readable name of this session
        sessionName: "login and add to cart session",

        // an ordered list of all the HTTP requests to issue in this session 
        requests: [
            {
                // a human readable name of this request
                requestName: "load home page",
                // the request url
                url: "/",
                // the HTTP request method
                method: "GET",
                // an object that contains all HTTP headers to send
                headers: { 'Content-type': 'application/json' },
            },
            {
                requestName: "login",
                url: "/api/login",
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                // The HTTP request body, can be either a string or an object
                // if it is an object, Kaskade will JSON.stringify before send the request
                body: {
                    username: 'test1',
                    password: 'test1'
                }
            },
            {
                requestName: "add to card",
                url: "/api/cart/addtocart",
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: {
                    listingId: 123,
                    qty: 2
                },
            },
        ]
    }]
}

// console.log(JSON.stringify(config));
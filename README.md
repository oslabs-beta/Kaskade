# Kaskade - Sequential, Concurrent Server Testing &middot; [![npm version](https://img.shields.io/npm/v/kaskade-benchmarking.svg?style=flat)](https://www.npmjs.com/package/kaskade-benchmarking)

## Overview
Kaskade is a server benchmarking tool that runs sequences of stateful, concurrent requests to a deployed or local server. Kaskade utilizes worker threads within Node.js to handle multithreading and create simulated concurrent server requests.

Simply install the npm module, create a config file using the format outlined in the Getting Started section, and import the kaskade-benchmarking module. Once your config file is set up, run the node command on your specified file and watch it go! Metrics tables of latency, byte throughput and requests/second are populated right in the command line.

## Tech Stack
[![My Skills](https://skillicons.dev/icons?i=nodejs,javascript,electron,react,redux,css,html,materialui,styledcomponents,aws,postman,vscode,vite,figma&theme=light)](https://skillicons.dev)

## Installation
Install the NPM module [here](https://www.npmjs.com/package/kaskade-benchmarking), or by running `npm i kaskade-benchmarking` in the command line.

## Getting Started
To test your server with Kaskade, a configuration file must be setup. Within the project's root directory, create a **.json** file and define the parameters according to the criteria within the config object below:
```
// The following is an example benchmark config object that Kaskade will accept
// It comes with detailed comments to explain each field and if the field is required.
// For an actual JSON file, see the Example section within the Read.me

const config = {
    // "servers" should contain a list of HTTP servers under test.
    //  REQUIRED, Must contain at least 1 server
    servers: [
        "localhost:3000",
    ],

    // REQUIRED, "testDuration" is the duration of running benchmark test, in seconds.
    testDuration: 600,

    // OPTIONAL, the target number of HTTP requests to send to servers per second
    // if not set, the HTTP requests rate will be unlimited
    targetThroughput: 1000,

    // REQUIRED, a list of different types of sessions to run in this benchmark
    sessions: [{
        // a human readable name of this session
        sessionName: "login and add to cart session",

        // an ordered list of all the HTTP requests to issue in this session. REQUIRED: requestName, url, method, headers. OPTIONAL: body (dependent on request method)
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
```


## Example
Below is a sample configuration file: 
```
{
    "servers": [
        "localhost:3000"
    ],
    "testDuration": 600,
    "concurrentUsers": 100,
    "targetThroughput": 1000,
    "numOfWorkers":4,
    "sessions": [
        {
            "sessionName": "login and add to cart session",
            "requests": [
                {
                    "requestName": "load home page",
                    "url": "/",
                    "method": "GET",
                    "headers": {
                        "Content-type": "application/json"
                    }
                },
                {
                    "requestName": "add to card",
                    "url": "/api/cart/addtocart",
                    "method": "POST",
                    "headers": {
                        "Content-type": "application/json"
                    },
                    "body": {
                        "listingId": 123,
                        "qty": 2
                    }
                }
            ]
        }
    ]
}
```

## Contributing
[request a feature or report a bug]

Kaskade's goal is to expand our functionality, but we can't do it without you! One of the great benefits of open source projects, like Kaskade, is the ability for the community to actively contribute. Feel free to fork this project, make changes or fix bugs, and submit a pull request to the **dev** branch. Please limit scope of commits to address one feature or bug at a time. 

To expediate the integration process, please copy the below PR example template and modify to reflect any changes to be considered for merging into the codebase.
```
# Summary

This pull request introduces adds units to the results table and pulls the session/request name into the latency table stat column.

## Related Issue

Missing units in table and lack of clarity.

## Type of Change

- [ ] Bug fix
- [x] New feature
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)

## Testing Steps

1. Run console.log of printResults, which is commented out on bottom of printResults.js

## Checklist

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
```

## Publications
Head over to Kaskade's [splash page](https://www.kaskade-benchmarking.co) and [LinkedIn](https://www.linkedin.com/company/kaskadebenchmarking/) for more details!

Checkout and clap our Medium article [here](https://medium.com/@kaskadebenchmarking/kaskade-be7fecb4e75f) for more details behind Kaskade!

## Our Team
- Jingjing Wang -> [GitHub](https://github.com/jingjingwangacc), [LinkedIn](https://www.linkedin.com/in/jingjingwangacc)
- Joel Christopher -> [GitHub](https://github.com/Joel-Christopher), [LinkedIn](https://www.linkedin.com/in/jwchristopher/)
- Michael Mann -> [GitHub](https://github.com/michael-w-mann), [LinkedIn](https://www.linkedin.com/in/michael-w-mann/)
- Wenzhen Gong -> [GitHub](https://github.com/wenzhen-gong), [LinkedIn](https://www.linkedin.com/in/wenzhengong/)

## License
Kaskade is MIT Licensed

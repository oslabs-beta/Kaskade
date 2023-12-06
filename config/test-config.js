const testConfig = {
    servers: [
      "localhost:3000"
    ],
    testDuration: 600,
    concurrentUsers: 100,
    targetThroughput: 1000,
    numOfWorkers: 1,
    sessions: [
      {
        sessionName: "test session",
        requests: [
          {
            requestName: "get all users",
            url: "/api/getallusers",
            method: "GET",
            headers: {
              "Content-type": "application/json"
            }
          },
          {
            requestName: "create user",
            url: "/api/createuser",
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: {
              fn: "Kaskade",
              ln: "Test",
              email: "kaskade@gmail.com",
              pw: "1234"
            }
          },
          {
            requestName: "delete order",
            url: "/api/deleteorder?orderid=db289395-fe68-47af-aadc-f659746d2559",
            method: "DELETE",
            headers: {
              "Content-type": "application/json"
            },
          },
          {
            requestName: "create order",
            url: "localhost:3000/api/createorder",
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: {
              link: "Kaskade",
              note: "test"
            }
  
          }
        ]
      }
    ]
  };

  
const Jsonobject = JSON.stringify(testConfig)

console.log("Stringified object if needed: ", Jsonobject)
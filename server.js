const express = require("express")
const fs = require('fs')


// this endpoint
const protocol = "http"
const host = "localhost"
const port = 3000  // try 5000 if any troubles
const prefix = "api"
const baseurl = `${protocol}://${host}:${port}`
const url = `${baseurl}/${prefix}`


const app = express()
app.use(express.json())
// app.use(express.text())
// const router = express.Router()
// app.use('/', router)  // mount the router on the app


// MIDDLEWARE


// ROUTER
/*
// a middleware function with no mount path => code executed for every request
router.use((req, res, next) => {
    console.log('Begin Routing!')
    console.log('RECEIVED begin')
    console.log(req.body)
    console.log('end RECEIVED')
    console.log([
            Date.now(),
            'request',
            req.method,
            req.originalUrl,
        ].join(' : '))
    next()
    // oooh, can I postlog, to include the response code? test: will control come back to this process after calling `next()`?
    console.log([
            Date.now(),
            'response',
            req.method,  // why isn't this recorded in res?
            res.statusCode,  // this doesn't work for some errors
            res.statusMessage,  // sometimes blank
        ].join(' : '))
    console.log(req.body)
    console.log('FIN')
    next()
})
 */

// ROUTES

app.route('/')
    .all((req, res, next) => {
        // code in this section will be executed
        // no matter which HTTP verb was used
        console.log("Passing through the main Junction route.")
        next()
    })
    .get((req, res) => {
        // GET = change nothing, just hand back information
        console.log("reaching the GET endpoint")
        res.status(200)
        res.send("You have reached the GET / endpoint.")
    })
    .post((req, res) => {
        // POST = insert something new
        console.log("this is the POST endpoint")
        res.send("some modicum of success.")
    })

// GO / LISTEN

app.listen(port, () => {
    console.log(`Server listening at:  ${url}`);
});

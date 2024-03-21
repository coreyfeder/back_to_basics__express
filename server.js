const express = require("express")
const fs = require('fs')

const app = express()
const router = express.Router()
app.use('/', router)  // mount the router on the app

// this endpoint
const protocol = "http"
const host = "localhost"
const port = 3000  // try 5000 if any troubles
const prefix = "api"
const baseurl = `${protocol}://${host}:${port}`
const url = `${baseurl}/${prefix}`


// CONNECTION TO DB

// MongoDB
const mongoUrl = "https://us-east-1.aws.data.mongodb-api.com/app/data-ghhyb/endpoint/data/v1"
/* 
example: 

curl -s `${mongoUrl}/action/findOne` \
  -X POST \
  -H "Accept: application/json" \
  -H "apiKey: apikeyapikeyapikeyapikeyapikeyapikeyapikeyapikey" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "sample_mflix",
    "collection": "movies",
    "filter": {
      "title": "The Matrix"
    }
  }'

*/

// MIDDLEWARE

app.use(express.json())


// ROUTER

// a middleware function with no mount path => code executed for every request
router.use((req, res, next) => {
    console.log([
            Date.now(), 
            'request',
            req.method, 
            req.originalUrl,
        ].join(' : '))
    next()
    /* oooh, can I postlog, to include the response code? test: will control come back to this process after calling `next()`? */ 
    console.log([
            Date.now(), 
            'response', 
            req.method,  // why isn't this recorded in res?
            res.statusCode,  // this doesn't work for some errors
            res.statusMessage,  // sometimes blank
        ].join(' : '))
    /* 
    Don't be quick to log:
        - res.json()                    it'll likely just be "[object Object]"
        - JSON.stringify(res.json())    it'll likely be enormous
        - Util.inspect(res.json())      maybe tweak the paramters to limit line length, depth, or breadh
     */
})


// ROUTES

app.route('/name_of_your_endpoint')
    .all((req, res, next) => {
        // code in this section will be executed 
        // no matter which HTTP verb was used
    })
    .get((req, res, next) => {
        // GET = change nothing, just hand back information
    })
    .post((req, res, next) => {
        // POST = insert something new
    })
    /* 
    .patch((req, res, next) => {
        // PATCH = update part of an existing thing
    })
    .put((req, res, next) => {
        // PUT = replace an existing thing
    })
     */
    .delete((req, res, next) => {
        // DELETE = remove some data
    })


// ERROR HANDLING / endware
//   If a call made it this far, something was wrong with it.

// bounce anything hitting the base without the prefix
app.all("/", (req, res) => {
    res.status(403);
    res.json({ error: `Public API endpoints are available at: ${url}` })
});

// "anything else"
// can also use `app.use((err, req, res, next) ...`
app.all((req, res) => {
    console.error(err.stack);
    res.status(404).json({ error: `Resource not found.` });
})


// GO / LISTEN

app.listen(port, () => {
    console.log(`Server listening at:  ${url}`);
});

const  http = require("http")

const fs = require("fs")

const args = require("minimist")(process.argv.slice(2))

args["port"] 

const port = args.port || process.env.PORT || 3000

fs.readFile('./www/index.html','utf-8',(err,data) => {

     if(err){
        console.error(err)
        return
        process.exit(1)
    }

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    res.end(data)
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

})
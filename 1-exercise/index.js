import * as http from 'http'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let filePath = path.join(__dirname, "src", "index.html")


const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    switch(req.url){
        case '/':
            filePath = 'index.html'
            res.statusCode = 200
            res.setHeader('Content-type', 'text/html')
            break;

        case '/about':
            filePath = 'about.html'
            res.statusCode = 200
            res.setHeader('Content-type', 'text/html')
            break;
        
        default:
            filePath = '404.html'
            res.statusCode = 404
            
    }
    
    fs.readFile('./src/' + filePath, (error, data) => {
        if(error){
            console.log(error)
            return
        }
        res.end(data)
    })

})

const PORT = process.env.PORT || 9999;

server.listen(PORT, () => console.log("server is running on http://localhost:" + PORT))





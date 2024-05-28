const http = require('http');
const fs = require('fs');

//localhost:8080/<pathname>
http.createServer( (req, res) => {
    let web_url = req.url;
    let filename = web_url.toString().replace('/',"") + ".html";

    const writeFile = function (filename) {
        fs.readFile(filename, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            } 
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    };

    if (web_url === '/') writeFile('index.html');
    else if (web_url.includes('about')) writeFile(filename);
    else if (web_url.includes('contact-me')) writeFile(filename);
    else writeFile('404.html');

}).listen(8080);


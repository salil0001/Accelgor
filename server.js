const { createAcclegorServer } = require('./acclegor')
const app = createAcclegorServer();

app.get('/', function(req, res) {
    res.render("./pages/index.html")
});

app.get('/:path1', function(req, res) {
    if (req.params.path1 === 'signup') {
        res.render("./pages/signup.html")
    } else if (req.params.path1 === 'login') {
        res.render("./pages/login.html")
    } else if(req.params.path1 === "user")
    {
       // var queryData = "";
        // req.on('data', function(data) {
        //     queryData += data;
        //     if(queryData.length > 1e6) {
        //         queryData = "";
        //         res.writeHead(413, {'Content-Type': 'text/plain'}).end();
        //         req.connection.destroy();
        //     }
        //     console.log(queryData)
        // });
        
        res.render("./pages/user.html")
    }
    else{
        res.write(`Oh Oh, you seem to have typed an invalid url`);
        res.end();
    }
});

app.get('/:path1/:path2', function(req, res) {
    res.write(`/:path1/:path2  <b>${req.params.path1}</b>   <b>${req.params.path2}</b>`); //end the response
    res.end()
});
app.get('/:path1/:path2/:path3', function(req, res) {
    res.write(`/:path1/:path2/:path3  <b>${req.params.path1}</b>   <b>${req.params.path2}</b> <b>${req.params.path3}</b>`);
    res.end()
});

app.listen(3000)
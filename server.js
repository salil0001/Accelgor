const acclegor = require('./acclegor')
const app = acclegor();

app.get('/', function(req, res) {
    res.render("./pages/index.html")
});


app.get('/:path1', function(req, res) {
    console.log(req.searchParams)
    console.log(req.params)
    if (req.params.path1 === 'signup') {
        res.render("./pages/signup.html")
    } else if (req.params.path1 === 'login') {
        res.render("./pages/login.html")
    } else {
        res.write(`Oh Oh, you seem to have typed an invalid url`);
        res.end();
    }

    // res.write(`/:path1  <b>${req.params.path1}</b> `); //end the response
    // res.end()
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
![Accelgor](https://i.imgur.com/flgoNKl.png)

# Accelgor

Accelgor is mini-server which is aimed to run extremely fast, limiting to only necessary features to get simple server up and running for simple tasks.

## Idea behind Accelgor
[Accelgor Flowchart](https://whimsical.com/2QzAFYTuUBFevKvs3RJRZQ)

## Usage

```js
const { createAcclegorServer } = require('./acclegor')
const app = createAcclegorServer();

app.get('/:path1/:path2', function(req, res) {
    res.write(`/:path1/:path2  <b>${req.params.path1}</b>   <b>${req.params.path2}</b>`); //end the response
    res.end()
});
```

## Example
```js
const { createAcclegorServer } = require('./acclegor')
const app = createAcclegorServer();

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
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

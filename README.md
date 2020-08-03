# Accelgor

Accelgor is mini-server which is aimed to run extremely fast, limiting to only necessary features to get simple server up and running for simple tasks.

## Usage

```js
const { createAcclegorServer } = require('./acclegor')
const app = createAcclegorServer();

app.get('/:path1/:path2', function(req, res) {
    res.write(`/:path1/:path2  <b>${req.params.path1}</b>   <b>${req.params.path2}</b>`); //end the response
    res.end()
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
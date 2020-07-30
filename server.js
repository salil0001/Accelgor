const acclegor = require('./acclegor')
const app= acclegor();

// app.get('/', function (req, res) {  
//  res.end('<b>Hello world</b>')
// });

app.get('/:path1', function (req, res) {  
  res.end(`Hello  <b>${req.params.path1}</b>`)
});


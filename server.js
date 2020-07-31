const acclegor = require('./acclegor')
const app= acclegor();

app.get('/:path1', function (req, res) {  
  res.write(`/:path1  <b>${req.params.path1}</b> `); //end the response
  res.end()
 });

app.get('/:path1/:path2', function (req, res) { 
  res.write(`/:path1/:path2  <b>${req.params.path1}</b>   <b>${req.params.path2}</b>`); //end the response
   res.end()
});
app.get('/:path1/:path2/:path3', function (req, res) { 
  res.write(`/:path1/:path2/:path3  <b>${req.params.path1}</b>   <b>${req.params.path2}</b> <b>${req.params.path3}</b>`); //end the response
   res.end()
});



app.listen(3000)

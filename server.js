var http = require('http');
var url = require('url');
var fs = require('fs');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;

    // console.log(__dirname + _url); // /뒤의 값이 출력된다.
    // console.log(_url); //port뒤의 querystring전부를 얻어낼 수 있게 된다.
    // console.log(queryData); //Object의 형식으로 출력된다./?id=HTML 이것이 {id : 'HTML'} 이렇게 된다.
    // 추가로 queryData.id를 출력하면 HTML만 출력이 된다.

    if(_url == '/'){
      // _url = '/index.html'; //원래 값, 하지만 이젠 아냐
      title = "Welcome";
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);

    fs.readFile(`data/${queryData.id}`,"utf8", function(err,description){
      
      var tmeplate = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=html">HTML</a></li>
          <li><a href="/?id=css">CSS</a></li>
          <li><a href="/?id=javascript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
    `;
    
    response.end(tmeplate);
    // response.end(queryData.id); //querystring의 id만 페이지에 출력이 된다. 즉, 이걸로 인해 동적으로 페이지를 움직일 수 있게 된 것이다.
    })

    
 
});
app.listen(3000);
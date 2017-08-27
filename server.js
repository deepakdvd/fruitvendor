'use strict';
var ex = require('express');
var app=ex();
var http = require('http').Server(app);
var bParser = require('body-parser');
//var fs = require('fs-extra'); 
app.set('port', (process.env.PORT || 3000));
//console.log('main index.js');

//var urlencodedParser = bodyParser.urlencoded({ extended: false })

//app.engine('html',require('hogan-express'));
app.set('view engine','ejs');
app.use(ex.static('public'));
   
//app.set ('partials', {foo: 'foo'});   

app.use(bParser.json());
app.use(bParser.urlencoded({extended:false}));

app.get('/',function(req,res){
	res.render('index');
	});


http.listen(app.get('port'), function(){
  console.log('listening on *:'+app.get('port'));
});
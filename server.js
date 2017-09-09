'use strict';
var ex = require('express');
var nodemailer = require('nodemailer');
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

app.get('/contact',function(req,res){
	res.render('contact');
	});

app.get('/about',function(req,res){
	res.render('about');
	});

app.get('/products',function(req,res){
	res.render('products');
	});

// app.get('/email', function(req, res){


// 	var transporter = nodemailer.createTransport({
// 	  service: "Gmail",
// 	  auth: {
// 	    user: 'deepakdesai0906@gmail.com',
// 	    pass: 'Cocubesdeepak'
// 	  }
// 	});

// 	var mailOptions = {
// 	  from: 'deepakdesai0906@gmail.com',
// 	  to: 'deepakdesai19@gmail.com',
// 	  subject: 'Picagroexporter',
// 	  html: '<h1 style="text-align:center"><a href="picagroexporter.com">Picagroexporter.com</a></h1><br><h2>Ordered By '+req.query.yrname+'</h2><br>Name: <b>'+req.query.yrname+'</b><br>Contact No: <a href="tel:'+req.query.conno+'"><b>'+req.query.conno+'</b></a><br>Email Id: <b>'+req.query.email+'</b><br>Order Description: <b>'+req.query.desc+'</b><br>Order Quantity: <b>'+req.query.quantity+' '+req.query.size+'</b><br>Type: <b>'+req.query.type+'</b><br>Destination Port: <b>'+req.query.port+'</b><br>Shipping By: <b>'+req.query.shipby
// 	};

// 	transporter.sendMail(mailOptions, function(error, info){
// 	  if (error) {
// 	    console.log(error);
// 	  } else {
// 	    console.log('Email sent: ' + info.response);
// 	  }
// 	});

// 	res.redirect('/contact');
// });



app.post('/email',function(req, res){

console.log("jhj");
  var transporter = nodemailer.createTransport({
   host: 'smtp.zoho.com',
    port: 465,
    secure: true, 
    service: 'gmail',
  auth: {
    user: 'deepakdesai0906@gmail.com',
    pass: 'Cocubesdeepak'
  }
});

var mailOptions = {
  from: 'deepakdesai0906@gmail.com',
  to: 'deepakdesai19@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy! what do you say dued'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});



});




http.listen(app.get('port'), function(){
  console.log('listening on *:'+app.get('port'));
});

// var port = process.env.PORT || 8000;
// server.listen(port, function() {
//     console.log("App is running on port " + port);
// });
// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });
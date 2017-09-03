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


// app.post('/email', function(req, res){


// 	var transporter = nodemailer.createTransport({
// 	  service: 'gmail',
// 	  auth: {
// 	    user: 'deepakdesai0906@gmail.com',
// 	    pass: 'Cocubesdeepak'
// 	  }
// 	});

// 	var mailOptions = {
// 	  from: 'deepakdesai0906@gmail.com',
// 	  to: 'deepakdesai19@gmail.com',
// 	  subject: 'Picagroexporter',
// 	  html: '<h1 style="text-align:center"><a href="picagroexporter.com">Picagroexporter.com</a></h1><br><h2>Ordered By '+req.body.yrname+'</h2><br>Name: <b>'+req.body.yrname+'</b><br>Contact No: <a href="tel:'+req.body.conno+'"><b>'+req.body.conno+'</b></a><br>Email Id: <b>'+req.body.email+'</b><br>Order Description: <b>'+req.body.desc+'</b><br>Order Quantity: <b>'+req.body.quantity+' '+req.body.size+'</b><br>Type: <b>'+req.body.type+'</b><br>Destination Port: <b>'+req.body.port+'</b><br>Shipping By: <b>'+req.body.shipby
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


// http.listen(app.get('port'), function(){
//   console.log('listening on *:'+app.get('port'));
// });


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
'use strict';
var ex = require('express');
var nodemailer = require('nodemailer');
var app=ex();
var http = require('http').Server(app);
var bParser = require('body-parser');
var ObjectId = require('mongoskin').ObjectID;
const db1=require('./app/dbconnect');
var db = db1.fdata();
var cParser = require('cookie-parser');
var session = require('client-sessions');
var busboy = require('connect-busboy');
var cloudy=require('./app/cloudinary').ob();

app.use(busboy());
//var fs = require('fs-extra'); 
app.use(cParser());

//var fs = require('fs-extra'); 
app.set('port', (process.env.PORT || 3000));
//console.log('main index.js');

//var urlencodedParser = bodyParser.urlencoded({ extended: false })

//app.engine('html',require('hogan-express'));
app.set('view engine','ejs');
app.use(ex.static('public'));
app.enable ('view cache');

app.use(session({
  cookieName: 'session',
  secret: 'naio1#2ospox9029(*&9{}nskjn;;',
  duration: 30*60*1000,//24 * 60 * 60 * 1000,
  //activeDuration: 5 * 60 * 1000,
   httpOnly: true,
  secure: true,
  ephemeral: true
}));
   
//app.set ('partials', {foo: 'foo'});   

app.use(bParser.json());
app.use(bParser.urlencoded({extended:false}));

app.get('/',function(req,res){
  db.collection('fruits').find({}).toArray(function(err, result){
    res.render('index', {products:result,cloudy:cloudy});
  });
  
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

app.get('/services',function(req,res){
  res.render('services');
  });

app.get('/dashboard',function(req,res){
  if (!req.user&&!req.session.user) {
           
          res.redirect('/login');
        }else{
          db.collection('fruits').find({}).toArray(function(err, result){
          if (req.query.resp) {
               res.render('dashboard',{send:req.query.resp,products:result,cloudy:cloudy});
          }else{
            res.render('dashboard',{send:false,products:result,cloudy:cloudy});
          }
           });
        }
  });

app.get('/login',function(req,res){
  if (req.user && req.session.user) {
    res.redirect('/dashboard');
  }else{
  res.render('login');
  }
  });



app.post('/email',function(req, res){


  var transporter = nodemailer.createTransport({
   host: 'smtp.zoho.com',
    port: 465,
    secure: true, 
  auth: {
    user: 'deepakdesai19@picagroexporter.com',
    pass: '*2468492383@sandvd'
  }
});

var mailOptions = {
  from: 'deepakdesai19@picagroexporter.com',
  to: 'jadhav.karan123@gmail.com',
  subject: 'Enquiry/Order',
  html: '<h1 style="text-align:center"><a href="picagroexporter.com">Picagroexporter.com</a></h1><br><h2>Ordered By '+req.body.yrname+'</h2><br>Name: <b>'+req.body.yrname+'</b><br>Contact No: <a href="tel:'+req.body.conno+'"><b>'+req.body.conno+'</b></a><br>Email Id: <b>'+req.body.email+'</b><br>Order Description: <b>'+req.body.desc+'</b><br>Order Quantity: <b>'+req.body.quantity+' '+req.body.size+'</b><br>Type: <b>'+req.body.type+'</b><br>Destination Port: <b>'+req.body.port+'</b><br>Shipping By: <b>'+req.body.shipby
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

res.redirect('/contact');

});

app.post('/session-access',function(req,res){
  
        var user;
        var name= req.body.name;
        var pass= req.body.pass;
        if (name=="jadhav.karan123" && pass=="loveu2568"){
          
          req.session.user = name;
          res.redirect('/dashboard');
        }
        else{
          res.redirect('/login?resp=invalid');
        }
});

app.post('/proadd',function(req,res){

  var img,cn,imn;
req.busboy.on('field', function(fieldname, val) {
     
     if(fieldname==="imgname"){
      img=val;
      
   }
     
});

  req.busboy.on('file', function (fieldname, file, filename) {
             
     
        var stream = cloudy.uploader.upload_stream(function(result) { 
        
      cn=result.public_id+'.'+result.format;
      imn=result.url;
     
     
      onFinish();
      
    
      });
      
            file.pipe(stream);
          
      });

  function onFinish() {
    db.collection('fruits').insert({Title:img,image:{cn:cn,imn:imn}},function(err, result){
      if (err)throw err;

      res.redirect('/dashboard?resp='+img);
    });
  }

    req.pipe(req.busboy);
});


app.post('/update',function(req,res){

  var img,cn,imn,id;
req.busboy.on('field', function(fieldname, val) {
     
     if(fieldname==="imgname"){
      img=val;
      
   }
   if(fieldname==="unameid"){
      id=val;
      
   }
     
});

  req.busboy.on('file', function (fieldname, file, filename) {
             
     
        var stream = cloudy.uploader.upload_stream(function(result) { 
        
      cn=result.public_id+'.'+result.format;
      imn=result.url;
     
     
      onFinish();
      
    
      });
      
            file.pipe(stream);
          
      });

  function onFinish() {
    db.collection('fruits').update({_id:ObjectId(id)},{$set:{Title:img,image:{cn:cn,imn:imn}}},function(err, result){
      if (err)throw err;

      res.redirect('/dashboard?resp='+img);
    });
  }

    req.pipe(req.busboy);
});


app.post('/delete', function(req, res){
  
  db.collection('fruits').findOne({_id:ObjectId(req.query.id)}, function(err, result){

    if (result) {
      var aa= result.image.cn.split('.');

  cloudy.uploader.destroy(aa[0], function(result) {  }, 
                            { invalidate: true });
    db.collection('fruits').remove({_id:ObjectId(req.query.id)}, function(err, result1){});
    res.send(true);
  }
});

});


http.listen(app.get('port'), function(){
  console.log('listening on *:'+app.get('port'));
});


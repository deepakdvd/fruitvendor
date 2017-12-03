'use strict';

const db=require('mongoskin').db('mongodb://192.168.1.104:27017/picagro');  
//module.exports.db;

exports.fdata= function(){
	return db;
}
//'mongodb://picagro:picagro123@ds143744.mlab.com:43744/picagro'// like this put above
//mongodb://192.168.0.101:27017/squarepixel  27017
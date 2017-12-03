'use strict';

var cloudy=require('cloudinary');

cloudy.config({ 
  cloud_name: '//enter cloud-name here', 
  api_key: '//enter api key here ', 
  api_secret: '// enter api secreate key here' 
});
exports.ob= function(){
	return cloudy ;
}

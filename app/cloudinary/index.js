'use strict';

var cloudy=require('cloudinary').v2;

cloudy.config({ 
  cloud_name: 'www-picagroexporter-com', 
  api_key: '545531692123958', 
  api_secret: 'wKiNPsmL2LZqaglbgKFMJ01EXiQ' 
});
exports.ob= function(){
	return cloudy ;
}

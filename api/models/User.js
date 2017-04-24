/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	name:{
		type:'string',
		required:true,
		defaultsTo:'John'
	},
	
	last_name:{
		type:'string',
		required:true,
		defaultsTo:'Doe'
	},
	
	username:{
		type:'string',
		required:true,
		unique:true
	},
	
	email:{
		type:'email',
		required:true
	},
	
	password:{
		type:'string',
		required:true
	},
	
	passwordConfirmation:{
		type:'string',
		required:true
	},
	
	EncryptedPassword:{
		type:'string'
	},
	
	toJSON: function() {
		var obj = this.toObject();
		delete obj.password;
		delete obj._csrf;
		delete obj.passwordConfirmation;
		return obj;
	}
  },
  
  beforeCreate: function(values, next){
	  console.log('entre before created');
	  var password = values.password;
	  var passwordConfirmation = values.passwordConfirmation;
	  console.log(password +"; " + passwordConfirmation);
	  if (!password || !passwordConfirmation || password != values.passwordConfirmation) {
		  var passwordDoesNotMatchError= [{
			  name: 'passwordDoesNotMatchError',
			  message: 'Las contraseñas deben coincidir'
		  }]
		  return next({
			  err: passwordDoesNotMatchError
		  });
	  }
	  
	  require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
		values.encryptedPassword = encryptedPassword;
		values.password=null;
		values.passwordConfirmation=null;
		next();
	  });
  }
};


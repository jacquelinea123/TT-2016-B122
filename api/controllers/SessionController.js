/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
module.exports = {
	new: function(req, res){
		res.view();
	},
	
	create: function(req, res, next){
		var username = req.param('username');
		var password = req.param('password');
		if(!username ||!password){
			var noUsernameOrPasswordError=[{message:'Debe ingresar un usuario y contraseña'}]
			req.session.flash={
				err:noUsernameOrPasswordError
			}
			return res.redirect('/session/new');
		}
		
		User.findOneByUsername(username, function userFounded (err, user){
			if(err){
				req.session.flash={
					err:err
				}
				return res.redirect('/session/new');
			}
			
			if(!user){
				var noUserFoundedError=[{message:'El nombre de usuario no se encuentra'}]
				req.session.flash={
					err:noUserFoundedError
				}
				return res.redirect('/session/new');
			}
			
			bcrypt.compare(password, user.encryptedPassword, function passwordsMatch(err, valid){
				if(err){
				req.session.flash={
					err:err
				}
				return res.redirect('/session/new');
			}
			
			if(!valid){
				var passwordDoNotMatchError=[{message:'Las contraseñas no coinciden'}]
				req.session.flash={
					err:passwordDoNotMatchError
				}
				return res.redirect('/session/new');
			}
			
			req.session.authenticated = true;
			req.session.User = user;
			res.redirect('/user/show/'+user.id);
			});
		});
	},
	
	destroy: function(req, res, next){
		req.session.destroy();
		res.redirect('/session/new');
	}
};


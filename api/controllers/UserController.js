/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	new:function (req, res){
		console.log('entre al formulario registro');
		res.view();
	},
	create:function(req, res){
		//body...
		var userObj={
			name: req.param('name'),
			last_name: req.param('last_name'),
			username: req.param('username'),
			email : req.param('email'),
			password: req.param('password'),
			passwordConfirmation: req.param('passwordConfirmation')
		}
		User.create(userObj,function(err,user){
			if(err){
				console.log(JSON.stringify(err));
				req.session.flash={
					err: err
				}
				return res.redirect('user/new');
			}
			res.redirect('user/show/'+user.id);
		});
	},
	show: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if (err)
				return next(err);
			res.view({
				user: user
			});
		});
	},
	edit: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if (err)
				return next(err);
			if (!user)
				return next();
			res.view({
				user: user
			});
		});
	},
	update: function(req, res, next){
		var userObj = {
			name: req.param('name'),
			last_name: req.param('last_name'),
			username: req.param('username'),
			email: req.param('email')
		}
		
		User.update(req.param('id'), userObj, function userUpdated(err, user){
			if (err){
				req.session.flash = {
					err: err
				}
				return res.redirect('user/edit/' + req.param('id'));
			}
			res.redirect(' user/show/' + req.param('id'));
		});
	},
	
	index :function (req,res,next){
		User.find(function userFounded(err, users){
			if(err){
				console.log(err);
				return next(err);
			}
			res.view({
				users: users
			});
		});
	},
	
	destroy :function (req, res, next){
		User.destroy(req.param('id'), function userDestroyed (err) {
			if(err){
				console.log(err);
				return next(err);
			}
			res.redirect('/user/index');
		});
	}
};


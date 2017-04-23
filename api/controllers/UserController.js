/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	new:function (req, res){
		console.log('entre al formulario registro');
		res.view('user/singin');
	},
	create:function(req, res){
		//body...
		var userObj={
			name: req.param('name'),
			last_name: req.param('last_name'),
			username: req.param('username'),
			email : req.param('email')
		}
		User.create(userObj,function(err,user){
			if(err){
				console.log(err);
				return res.redirect('user/new');
			}
			res.redirect('user');
		})
	}
};


module.exports= function (req, res, ok){
	if(req.session.authenticated){
		res.locals.flash={};
		if(!req.session.flash) return ok();
		
		res.locals.flash = _.clone(req.session.flash);
		
		req.session.flash ={};
		return ok();
	}
	var requireLoginError=[{message:'debes iniciar session'}]
	req.session.flash={
		err:requireLoginError
	}
	res.redirect('/session/new');
	return;
}
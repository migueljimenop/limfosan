router.post('/register', function(req, res) {
	//console.log(JSON.stringify(user.username));
	var user = new User({username: req.body.username, 
						password: req.body.password,
					});		
	user.save(function(err,user){
		if(err){
			return res.render("register", { info: "Usuario ya registrado."});
		}
		passport.authenticate('local'), function(req, res) {
			// If this function gets called, authentication was successful.
			// `req.user` contains the authenticated user.
			console.log("Todo ok")
			//res.redirect();
		};
		/*
		app.post('/login',
		  passport.authenticate('local'),
		  function(req, res) {
			// If this function gets called, authentication was successful.
			// `req.user` contains the authenticated user.
			res.redirect('/users/' + req.user.username);
		});



		passport.authenticate('local')(req, res, function () {
			res.redirect('/myacc');
		});*/
	});
});


/*
router.post('/register', function(req, res) {
	User.register(new User({ username : req.body.username , password : req.body.password }), req.body.password, function(err, user) {
		if (err) {
			//return res.render('register', { user : user });
			return res.render("register", { info: "Usuario ya registrado."});
		}
		passport.authenticate('local')(req, res, function () {
			res.redirect('/myacc');
		});
	});
});
*/


/*
router.post('/login', 
	passport.authenticate('local', 
	{ successRedirect : '/myacc',    
	failureRedirect: '/login' })
);
*/
/*
router.post('/login', 
	passport.authenticate('local',{ failureRedirect: '/login' , failureFlash: 'Invalid login or password' }), 
	function(req, res) {
	User.find({username:req.body.username, password:req.body.password}, function(err){
	if(err){ throw err; }
	else{
		req.user = new User({username:req.body.username, password:req.body.password});
	}
	res.redirect('/myacc');        
	});
});
*/

/*
router.post('/register', function(req, res) {
	//console.log(JSON.stringify(user.username));
	var user = new User({username: req.body.username, 
						password: req.body.password
					});		
	user.save(function(err,user){
		if(err){
			return res.render("register", { info: "Usuario ya registrado."});
		}
		console.log("Todo ok");
	});
});
*/

  	var user = new User({username: req.body.username, 
						password: req.body.password
					}); 
	User.findOne({username: req.body.username},function(err) {
		/*
		if(err) {
			return res.render("login", { message: 'Usuario o clave incorrecto.' });
		}
		req.login(user, function(err) {
			return res.redirect('/myacc');
		});
		*/
		if(err) {
			return res.render("register", { info: "Usuario ya registrado."});
		} else {
	  		//console.log('user: ' + user.username + " saved.");
	  		req.login(user, function(err) {
			if (err) {
		  		return res.render("login", { message: 'Usuario o clave incorrecto.' });
			}
				return res.redirect('/myacc');
	  		});
		}		
	});

router.post('/login', function(req, res) {   
	User.findOne({username: req.body.username},function(err,user) {
		console.log("Contraseña guardada en la bd: "+ user.password);
		console.log("Contraseña ingresada en el login: "+req.body.password);
		// if user = null es porque no existe en la bd
		if (user === null){
			return res.render("login", { message: 'Usuario no registrado.' });
		}else{
			req.login(user,function(err){
			if (user.password !== req.body.password) {
				return res.render("login", { message: 'Contraseña incorrecta.' });
			}				
			return res.redirect('/myacc');
			});			
		}
		//console.log(JSON.stringify(user.password));
	});
});

		/*
		if (user.username !== req.body.username){
			return res.render("login", { message: 'Usuario no registrado.' });
		}*/
// add code in here to create an API with ExpressJS
const express = require('express')
//const { verify } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const garments = require('./garments.json')
const app = express()
//require("dotenv").config();
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/api/garments', verifyToken, (req, res) => {
    const gender = req.query.gender
    const season = req.query.season

    const filteredGarments = garments.filter(garment => {
		// if both gender & season was supplied
		if (gender != 'All' && season != 'All') {
			return garment.gender === gender 
				&& garment.season === season
		} else if(gender != 'All') { // if gender was supplied
			return garment.gender === gender
		} else if(season != 'All') { // if season was supplied
			return garment.season === season
		}
		return true
	})
    res.json({
        garments: filteredGarments
    })
})


app.post('/api/garments', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err){
      res.sendStatus(403)
    }else {
      const {
        description,
        img,
        gender,
        season,
        price
      } = req.body;
    
      if (!description || !img || !price) {
        res.json({
          status: 'error',
          message: 'Required data not supplied',
          authData
        });
      } else {
        garments.push({
          description,
          img,
          gender,
          season,
          price
        });
    
        res.json({
          status: 'success',
          message: 'New garment added.',
          authData
        });
      }
    }
  })
});


app.get('/api/garments/price/:price', verifyToken,  (req, res) => {
    const maxPrice = Number(req.params.price)
	const filteredGarments = garments.filter(garment => {
		if (maxPrice > 0) {
			return garment.price <= maxPrice
		}
		return true
	})

	res.json({ 
		garments : filteredGarments
	})
})

const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  });
}

//app.post('/auth', (req, res) => {
  //const username = req.query.username
   // if(username == 'simelane-jpd'){
      //console.log('works!')
     // const user = {username: 'simelane-jpd'}
      //const accessToken = generateToken(user)
      //res.json({accessToken: accessToken})
    // }else{
    //   throw new Error('Access Denied')
    // }
//})
app.post('/auth', (req, res) => {
	// Mock user
	
	  
const user = {
	  
	  username: 'simelane-jpd',
	 
	}
  
	jwt.sign({user},'secretkey',  (err, token) => {
		res.json({
		  token
		});
	  });
	});
function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined'){
    const token = bearerHeader.split(' ')[1]
    req.token = token
    next()
  }else {
    res.sendStatus(403)
  }
}

const PORT = process.env.PORT || 4017

app.listen(PORT, () => console.log('App started on port ' + PORT))
//require('dotenv').config()
//const express = require('express');
//const { get } = require('express/lib/request');
//const app = express();
//const fs = require("fs");


//console.log(process.env)

//const jwt = require('jsonwebtoken');
//app.use(express.json());

// enable the static folder...
//app.use(express.static('public'));
// enable the req.body object
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

//function checkToken(req, res, next){
	

	//const token =  req.headers.authorization && req.headers.authorization.split(" ")[1];

	//console.log(req.headers.authorization);

	//if (!req.headers.authorization || !token){
		//res.sendStatus(401);
		//return;
	//}
	// what do I need to do with the token ?

	// unwrap the decode the token...
	//const decoded = jwt.verify(token, 'thisIsMySecret@120815');

	// find the username in the token ?
	//const {username} = decoded;
	
	//console.log(username);

	// check if the username in the token is 'avermeulen'
	//if (username && username === 'simelane-jpd') {
		//next();
	//} else {
	//	res.sendStatus(403);
	//}

//}
//app.post('/auth', function(req, res){
	//const {username} = req.body;
	
	//console.log(req.body)

	//const token = jwt.sign({
	//	username
	//}, 'thisIsMySecret@120815');

	//res.json({
	//	token
	//});

//});
// import the dataset to be used here

// API routes to be added here
//app.get('/api/garments', checkToken, function (req, res) {
	//const gender = req.query.gender;
	//const season = req.query.season;

	//const filteredGarments = garments.filter(garment => {
		// if both gender & season was supplied
	//	if (gender != 'All' && season != 'All') {
			//return garment.gender === gender
			//	&& garment.season === season;
		//} else if (gender != 'All') { // if gender was supplied
		//	return garment.gender === gender
		//} else if (season != 'All') { // if season was supplied
		//	return garment.season === season
		//}
		//return true;
	//});
	// note that this route just send JSON data to the browser
	// there is no template
	//res.json({ garments: filteredGarments });
//});

//app.post('/api/garments',checkToken, (req, res) => {
	
		

	// get the fields send in from req.body
	//const {
		//description,
		//img,
		//gender,
		//season,
	//	price
	//} = req.body;

	// add some validation to see if all the fields are there.
	// only 3 fields are made mandatory here
	// you can change that

	//if (!description || !img || !price || !gender || !season) {
		//res.json({
			//status: 'error',
		//	message: 'Required data not supplied',
		//});
	//} else {

		// you can check for duplicates here using garments.find
		//if (garments.find(element => element.description === description)) {
			//res.json({
				//status: 'error',
				//message: 'Item already exists',
			//});
		//}
		//else {

			// add a new entry into the garments list
			//garments.push({
				//description,
				//img,
				//gender,
				//season,
			//	price
			//});
			//adding garments into the JSON file
			//fs.writeFileSync('./garments.json', JSON.stringify(garments))

			//res.json({
			//	status: 'success',
			//	message: 'New garment added.',
		//	});
		//}
	//}
	
	//});

//app.get('/api/garments/price/:price', checkToken,  function (req, res) {
	//const maxPrice = Number(req.params.price);
	//const filteredGarments = garments.filter(garment => {
		// filter only if the maxPrice is bigger than maxPrice
		//if (maxPrice > 0) {
		//	return garment.price <= maxPrice;
		//}
	//	return true;
	//});

	//res.json({
	//	garments: filteredGarments
	//});
//});

//app.listen(PORT, function () {
//	console.log(`App started on port ${PORT}`)
//});

//app.post('/auth', (req, res) => {
	// Mock user
	//const username = req.query.username;
	//if (username == 'simelane-jpd') {
	//  const user = {username: 'simelane-jpd'};
	  
//const user = {
	  
	 // username: 'simelane-jpd',
	 
	//}
  
	//jwt.sign({user},'secretkey', { expiresIn: '24h' }, (err, token) => {
		//res.json({
		//  token
		//});
	  //});
	//});

	// Verify Token
//function verifyToken(req, res, next) {
	// Get auth header value
	//const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	//if(typeof bearerHeader !== 'undefined') {
	  // Split at the space
	 // const bearer = bearerHeader.split(' ');
	  // Get token from array
	 // const bearerToken = bearer[1];
	  // Set the token
	 // req.token = bearerToken;
	  // Next middleware
	 
	  //next();
	//} else {
	  // Forbidden
	//  res.sendStatus(403);
	//}
  
  //}
//authenticate jwt
//const generateAccessToken = (user) => {
	//return jwt.sign(user, 'secretkey', {
	//expiresIn: '24h',
	//});
  //};
//LOGIN
//app.post('/auth', (req, res) => {
//	const username = req.query.username;
	//if (username == 'simelane-jpd') {
	//  const user = {username: 'simelane-jpd'};
	  
	 // res.json({token});
	//}
	//res.sendStatus(401);
  //});
//authentification
 //function authenticateToken(req, res, next) {
	////const token = req.query.token;
	//if (token == null) return res.sendStatus(401);
	 //const autHeader = req.headers['authorization']
     //const token = autHeader && autHeader.split(' ')[1]
//if (token == null) return res.sendStatus(401);

	//jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
	 // if (err) return res.sendStatus(403);
	 // req.user = user;
	 // next();
	//});
//}
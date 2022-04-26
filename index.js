require('dotenv').config()
const express = require('express');
//const { get } = require('express/lib/request');
const app = express();
const fs = require("fs");


//console.log(process.env)

const jwt = require('jsonwebtoken');
app.use(express.json());

// enable the static folder...
app.use(express.static('public'));
// enable the req.body object
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// import the dataset to be used here
const garments = require('./garments.json');

const PORT = process.env.PORT || 4017;

// API routes to be added here
app.get('/api/garments', verifyToken, function (req, res) {
	const gender = req.query.gender;
	const season = req.query.season;

	const filteredGarments = garments.filter(garment => {
		// if both gender & season was supplied
		if (gender != 'All' && season != 'All') {
			return garment.gender === gender
				&& garment.season === season;
		} else if (gender != 'All') { // if gender was supplied
			return garment.gender === gender
		} else if (season != 'All') { // if season was supplied
			return garment.season === season
		}
		return true;
	});
	// note that this route just send JSON data to the browser
	// there is no template
	res.json({ garments: filteredGarments });
});

app.post('/api/garments',verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err) {
		  res.sendStatus(403);
		} else {
		  res.json({
			message: 'Post created...',
			authData
		  });
		

	// get the fields send in from req.body
	const {
		description,
		img,
		gender,
		season,
		price
	} = req.body;

	// add some validation to see if all the fields are there.
	// only 3 fields are made mandatory here
	// you can change that

	if (!description || !img || !price || !gender || !season) {
		res.json({
			status: 'error',
			message: 'Required data not supplied',
		});
	} else {

		// you can check for duplicates here using garments.find
		if (garments.find(element => element.description === description)) {
			res.json({
				status: 'error',
				message: 'Item already exists',
			});
		}
		else {

			// add a new entry into the garments list
			garments.push({
				description,
				img,
				gender,
				season,
				price
			});
			//adding garments into the JSON file
			fs.writeFileSync('./garments.json', JSON.stringify(garments))

			res.json({
				status: 'success',
				message: 'New garment added.',
			});
		}
	}
	}
	});
});
app.get('/api/garments/price/:price', verifyToken,   function (req, res) {
	const maxPrice = Number(req.params.price);
	const filteredGarments = garments.filter(garment => {
		// filter only if the maxPrice is bigger than maxPrice
		if (maxPrice > 0) {
			return garment.price <= maxPrice;
		}
		return true;
	});

	res.json({
		garments: filteredGarments
	});
});

app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});

app.post('/auth', (req, res) => {
	// Mock user
	//const username = req.query.username;
	//if (username == 'simelane-jpd') {
	 // const user = {username: 'simelane-jpd'};
	  
const user = {
	  
	  username: 'simelane-jpd',
	 
	}
  
	jwt.sign({user},'secretkey', { expiresIn: '24h' }, (err, token) => {
		res.json({
		  token
		});
	  });
	});

	// Verify Token
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	if(typeof bearerHeader !== 'undefined') {
	  // Split at the space
	  const bearer = bearerHeader.split(' ');
	  // Get token from array
	  const bearerToken = bearer[1];
	  // Set the token
	  req.token = bearerToken;
	  // Next middleware
	 
	  next();
	} else {
	  // Forbidden
	  res.sendStatus(403);
	}
  
  }
//authenticate jwt
//const generateAccessToken = (user) => {
	//return jwt.sign(user, 'secretkey', {
	//expiresIn: '24h',
	//});
  //};
//LOGIN
//app.post('/auth', (req, res) => {
	//const username = req.query.username;
	//if (username == 'simelane-jpd') {
	  //const user = {username: 'simelane-jpd'};
	  
	 // res.json({accessToken: accessToken});
	//}
	//res.sendStatus(401);
 // });
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
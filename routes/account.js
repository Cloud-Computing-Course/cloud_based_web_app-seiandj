const { json } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var account = require('../model/accountstructure.js');


/* GET home page. Passing in title variable*/
router.post('/', function(req, res, next) {
    account.name= req.body.name;
    account.email= req.body.email;
    account.password= req.body.password;
    //verify account was created
    console.log(account);

    //reading accounts from data.json file and assigning user to accountData variable
    let accountData = fs.readFileSync('./data.json');
    
    //The JSON.parse() is converting the string to JS objects
    let siteAccounts = JSON.parse(accountData);

    //Adding the new account to the end of the converted array that was just read in from data.json
    siteAccounts.push(account);

    /**Now that the account has been added to the array, the JSON.stringify() method converts the JS array
    * into a string so that we can override the data.json file and write the updated array of objects to data.json file
    **/ 
    const accountString = JSON.stringify(siteAccounts)
    fs.writeFile('./data.json', accountString, err => {
      //error handling if, issue arises with file, else output to successfully wrote file
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    })


    res.render('account', { name: account.name, email: account.email, password: account.password });
});

module.exports = router;

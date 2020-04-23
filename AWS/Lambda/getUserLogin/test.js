const _ = require('lodash');

var users = {
  "Items": [
    {
      "firstname": "Peter",
      "lastname": "Nguyen",
      "password": "password123",
      "user_id": "asdasd",
      "email": "peter.d.ngu@gmail.com"
    },
    {
      "firstname": "Captain",
      "lastname": "Underpants",
      "password": "captain.underpants",
      "user_id": "qFtwwQ",
      "email": "captain.underpants@gmail.com"
    }
  ],
  "Count": 2,
  "ScannedCount": 2
}

var email = "captain.underpants@gmail.com";
var password = "captain.underpants";
var user = _.find(users.Items, { email: email, password: password });
console.log(user);
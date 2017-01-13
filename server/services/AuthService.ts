var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require("jwt-simple");
import * as passport from 'passport';

import {Accounts,IAccounts} from '../models/Account';

const Records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', email: 'jack@example.com', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', email: 'jill@example.com', emails: [ { value: 'jill@example.com' } ] }
];
class AuthService {
  constructor(){}

// Endpoints
login = (req, res) => {
  console.log('login');
  return passport.authenticate('local', { session: false}), function(req, res) {res.send({status: 'good'})}
}

signUp = (req, res, next) => {
  // Accounts
  //var user = new User({ username: req.body.email, password: req.body.password});
  //user.save(function(err) {
    let account = new Accounts(req.body);
    console.log('req.body', req.body);
    account.save((err, data:IAccounts) => 
        res.status(200).send(Object.assign(req.body, {_id: data._id}) ));
  //});
}


generateToken = (req, res) => {
let email = req.body.email;
let password = req.body.password;  
console.log('token', req.body.email)
if (req.body.email && req.body.password) {
    Accounts.find({email: email, password: password}, function(err, users) {
      let user = users[0];
      if (err) { return res.sendStatus(401); }
      if (!user) { return res.sendStatus(401) }
      if (user.password != password) { return res.sendStatus(401) }
        var payload = {
            id: user._id,
            aud: 'localhost'
        };
        var token = jwt.encode(payload, authService.confOpts.secretOrKey);
        console.log('encode', payload, authService.confOpts.secretOrKey);
        return res.json({
            token: 'JWT '+ token,
            username: user.username,
            email: user.email
        });      
    });
} else { return res.sendStatus(401) }
}

logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

//////
findById(id, cb) {
  process.nextTick(function() {
    let user = Records.find(c => (c.id === id.id))
    console.log(user, id);
    cb(null, user);
    /*
    var idx = id - 1;
    if (Records[idx]) {
      cb(null, Records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  */
  });
}

findByUsername(username, cb) {
  console.log('findByUsername(username', username);
  process.nextTick(function() {
    for (var i = 0, len = Records.length; i < len; i++) {
      var record = Records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

confOpts:any = {
 jwtFromRequest: function (request) {
        var re = /(\S+)\s+(\S+)/;
        function parseAuthHeader(hdrValue) {
            if (typeof hdrValue !== 'string') {
                return null;
            }
            var matches = hdrValue.match(re);
            return matches && { scheme: matches[1], value: matches[2] };
        }
        var token = null;
        var auth_scheme = "JWT";
        if (request.headers['authorization']) {
            var auth_params = parseAuthHeader(request.headers['authorization']);
            if (auth_params && auth_scheme === auth_params.scheme) {
                token = auth_params.value;
                return token;
            }
        } else {
          return token;
        }
},
 secretOrKey: "secret",
 //issuer: "accounts.localhost.com",
 //audience: "localhost"
}

}

let authService = new AuthService();  

export {authService};
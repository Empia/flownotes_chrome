var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require("jwt-simple");
import * as passport from 'passport';
import {Accounts,IAccounts} from '../models/Account';


var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    console.log('sha512', password, salt);

    var hash = crypto.createHmac('sha512', salt.toString()); /** Hashing algorithm sha512 */
    hash.update(password.toString());
    var value = hash.digest('hex');
    console.log('value', value);
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    console.log('genRandomString', genRandomString(16));
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('\nSalt = '+passwordData.salt);
    return {
      password: passwordData.passwordHash,
      salt: passwordData.salt
    }
}


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
    let pass = saltHashPassword(account.password)
    account.password = pass.password
    account.salt     = pass.salt
    account.save((err, data:IAccounts) => { 
        console.log('account.save',data, err)
        res.json({
              token: 'JWT '+ pass.password,
              username: data.username,
              email: data.email
          })
    })
  //});
}


generateToken = (req, res) => {
let email = req.body.email;
let password = req.body.password;  
console.log('token', req.body.email)
if (req.body.email && req.body.password) {
    Accounts.find({email: email}, function(errForProb, probUsers) {
      if (probUsers.length < 1) { return res.status(401).send('{"status": "unauthorized", "msg":"no user"}')}

      let probUser = probUsers[0];
      let probUserSalt = !probUser.salt ? genRandomString(16) : probUser.salt
      Accounts.find({email: email, password: sha512(password, probUserSalt).passwordHash }, function(err, users) {
        if (err) { return res.status(401).send('{"status": "unauthorized"}')}
        console.log('login attempt:', users);
        if (!users || (users[0] == undefined) ) { return res.status(401).send('{"status": "unauthorized", "msg": "password"}') }
        let user = users[0];

        //if (user.password != password) { return res.sendStatus(401) }
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
    });
} else { return res.status(401).send('{"status": "unauthorized"}') }
}

logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

Records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];
////
findById(id, cb) {
  process.nextTick(function() {
    let user = this.Records.find(c => (c.id === id.id))
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
    for (var i = 0, len = this.Records.length; i < len; i++) {
      var record = this.Records[i];
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
          console.log('req');
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
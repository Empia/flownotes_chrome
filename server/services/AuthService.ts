var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const Records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];
class AuthService {
  constructor(){}


findById(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (Records[idx]) {
      cb(null, Records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
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
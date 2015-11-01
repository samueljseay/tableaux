var requireDir = require('require-dir'),
    app = require('../app');

console.log('seeding db...');

//load seeds
var seeds = requireDir('../seeds/' + app.get('env'));

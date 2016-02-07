//TODO split into separate node module
var requireDir = require('require-dir'),
    app = require('../app');

console.log('seeding db...');

//load seeds
if(app.get('env') !== 'production') {
  requireDir('../seeds/' + app.get('env'));
}

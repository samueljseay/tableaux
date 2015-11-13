var Menu = require('../../models/menu'),
    User = require('../../models/user'),
    Q = require('q');

module.exports = {
  order: 1,
  seed: function() {
    return Q.Promise(function(resolve,rej,notify) {
      User.find({}, function(err, res) {
        var menus = [{
          name: 'Our Menu',
          user: res[0],
          sections: [{
            name: 'Entrees',
            items: [{
              name: 'Big Breakfast',
              description: 'the biggest breakfast'
            }]
          }, {
            name: 'Mains',
            items: [{
              name: 'Big Lunch',
              description: 'a big lunch'
            }]
          }]
        }];

        Menu.remove(function(err,p) {
          menus.forEach(function(m) {
            Menu.find(m, function(err, res) {
              if(! res.length) {
                console.log('seeding menu: ' + m.name);
                new Menu(m).save(function(err) {
                  if (err) { throw err; }
                  resolve();
                });
              }
            });
          });
        });
      });
    });
  }
};

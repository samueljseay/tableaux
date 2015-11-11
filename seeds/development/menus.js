var Menu = require('../../models/menu');

var menus = [{
  name: 'Our Menu',
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
      if(!res.length) {
        console.log('seeding menu: ' + m.name);
        new Menu(m).save(function(err) {
          if (err) { throw err; }
        });
      }
    });
  });
});

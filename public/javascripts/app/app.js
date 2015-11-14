var React = require('react'),
    ReactDOM = require('react-dom'),
    MenuForm = require('./forms/menu');


if(document.getElementById('menu-form')) {
  var menu;

  if(window.app && window.app.menu) {
    var menu = window.app.menu;
    console.log(menu);
    ReactDOM.render(
      <MenuForm name={menu.name} sections={menu.sections} />,
      document.getElementById('menu-form')
    );
  }
  else {
    ReactDOM.render(
      <MenuForm />,
      document.getElementById('menu-form')
    );
  }
}

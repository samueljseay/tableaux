var React = require('react'),
    ReactDOM = require('react-dom'),
    MenuForm = require('./forms/menu');

if(document.getElementById('example')) {
  ReactDOM.render(
    <MenuForm />,
    document.getElementById('example')
  );
}

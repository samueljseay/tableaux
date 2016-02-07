# Tableaux.
Thin MVC framework for building express apps. A useful template of how to build an
express app with sequelize and passport session authentication.

**Please note that
this project is a learning experience for me, but if you'd like to get involved
then get in touch with me via twitter: @samseay.**

### Features

* Session based username/password authentication with roles
* Routing set up automatically via auto included controllers
* Protect routes with roles (see DashboardController)
* Basic seeding for database

### Using

* Express
* Passport
* Sequelize with Postgres

### Usage Example

Ensure you have a project directory with the following tree:

```
- controllers
- initializers
- models
- seeds
- views
index.js
```

Define a controller e.g. `controllers/dashboard.js`

```js
var Controller = require('tableaux/lib/controller');

var DashboardController = new Controller({
  name: 'dashboard',
  routes: [{
    urls: ['/'],
    role: 'user',
    requestType: 'GET',
    action: function(req, res) {
      // render views/dashboard
      this.render();

      // req.user contains passport authenticated user
      // only a user with role "user" will be able to access this route
    }
  }]
});

module.exports = DashboardController;
```

and then in your index.js:
`require('tableaux').start();`

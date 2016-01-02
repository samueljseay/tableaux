'use strict';

var expect = require('expect.js'),
    sinon = require('sinon'),
    express = require('express'),
    Controller = require('../../lib/controller');

describe('Controller', function() {

  beforeEach(function() {
    this.fakeApp = express();
    this.controller = new Controller({
      name: 'test',
      routes: [{
        urls: ['/foo/bar'],
        role: 'user',
        requestType: 'GET',
        action: function(req, res) {}
      }, {
        urls: ['/bar/baz'],
        role: 'user',
        requestType: 'PUT',
        action: function(req, res) {}
      }]
    });
  });

  describe('constructor', function() {

    it('adds routes to controller router', function() {
      let routes = this.controller.router.stack;

      expect(routes.length).to.equal(2);
      expect(routes[0].route.path).to.equal('/foo/bar');
      expect(routes[1].route.path).to.equal('/bar/baz');
    });
  });

  describe('#mount', function() {

    it('mounts the routes prefixed by controller name on to provided app', function() {
      let spy = sinon.spy(this.fakeApp, 'use');

      this.controller.mount(this.fakeApp);
      expect(spy.calledOnce).to.be.ok();
      expect(spy.calledWith('/test', this.controller.router));
    });
  });
});
/*global describe:true, beforeEach:true, it:true, afterEach:true */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');
var fs = require('fs');

var EXPECTED_FILES = [
  '.gitignore',
  '.gitattributes',
  '.bowerrc',
  'bower.json',
  'package.json',
  '.jshintrc',
  '.editorconfig',
  'Gruntfile.js',
  'app/scripts/app.js',
  'app/scripts/store.js',
  'app/scripts/routes/application_route.js',
  'app/templates/application.hbs',
  'app/templates/index.hbs',
  'app/index.html'
];

describe('File Creation', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.ember = helpers.createGenerator('recroom:app', [
        '../../router',
        '../../app', [
          helpers.createDummyGenerator(),
          /*jshint scripturl:true*/
          'mocha:app'
        ]
      ]);
      helpers.mockPrompt(this.ember, {
        compassBootstrap: true
      });
      this.ember.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('every generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    require('../app');
    require('../router');
    require('../controller');
    require('../view');
    require('../model');
  });

  it('creates the expected files', function (done) {
    this.ember.run({}, function () {
      helpers.assertFile(EXPECTED_FILES);
      done();
    });
  });

  it('properly links ember data', function (done) {
    this.ember.run({}, function () {
      helpers.assertFile('app/index.html', /<script src="@@ember_data"><\/script>/);
      done();
    });
  });

  describe('the app name', function () {
    beforeEach(function () {
      this.ember.appname = 'some-app';
    });

    it('creates an application object named App (see issue #8)',
       function (done) {
      this.ember.run({}, function () {
        helpers.assertFileContent('app/scripts/app.js', /var App = window.App = Ember\.Application\.create\(\);/);
        done();
      });
    });
  });

  describe('store', function () {
    it('uses FixtureAdapter by default', function (done) {
      this.ember.run({}, function () {
        helpers.assertFileContent('app/scripts/store.js', /ApplicationAdapter = DS.FixtureAdapter;/);
        done();
      });
    });
  });
});

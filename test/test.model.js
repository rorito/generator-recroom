/*global describe:true, beforeEach:true, it:true */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');
var fs = require('fs');

require('fleck');

require('./helpers/expected_model_files');

describe('Model', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      done();
    }.bind(this));
  });

  var filesDoNotExist = function(list_of_files){
    for (var i = 0; i < list_of_files.length; i++) {
      assert(!fs.existsSync(list_of_files[i]));
    }
  };

  //it('takes singular noun and creates singular route, controller, template for edit')
  //it('takes singular noun and registers singular and plural routes with router')
  //it('takes singular noun and creates plural route, template for read of all')
  //it('takes singular noun and creates singular controller, template for read')
  it('with javascript', function (done) {
    this.model = {};
    var cmd_line_args = ['User', 'name:string', 'zipcode:number'];
    this.model = helpers.createGenerator('recroom:model',
       ['../../model','../../controller','../../view','../../router'],
       cmd_line_args);

    filesDoNotExist(JS_FILES_GENERATED_BY_MODEL_SUBGEN);

    var model = this.model;
    this.model.run({}, function () {
      helpers.assertFile(JS_FILES_GENERATED_BY_MODEL_SUBGEN);
      helpers.assertFileContent('app/scripts/models/user_model.js', /User = DS.Model/);
      helpers.assertFileContent('app/scripts/models/user_model.js', /name: DS.attr\('string'\)/);
      helpers.assertFileContent('app/scripts/models/user_model.js', /zipcode: DS.attr\('number'\)/);
      helpers.assertFileContent('app/scripts/models/user_model.js', /User.FIXTURES/);
      done();
    });
  });
});

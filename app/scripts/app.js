'use strict';

// API
var mcmApi = (function () {
  return {
    init: function () {

      // METHOD METHOD
      if (typeof Function.prototype.method !== 'function') {
        Function.prototype.method = function (name, fn) {
          if (!this.prototype[name] || typeof this.prototype[name] !== 'function') {
            this.prototype[name] = fn;
          }
          return this;
        };
      }

      // REMOVES TEXT NODES FROM NODE LIST
      Function.method('removeTextNodes', function () {
        if (this instanceof HTMLCollection) {
          angular.forEach(machine.childNodes, function (node) {
            if (node.nodeType !== 1) {
              machine.removeChild(node);
            }
          });  
        }        
      });

    }
  };
})();

angular
  .module('tweetMachineApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    mcmApi.init();
  });

/**
 * AngularJS 
 * @author vinu <vinodanasuri@gmail.com>
 */

/**
 * Main App Creation
 */


var app = angular.module('Kaakateeya', ['ngSanitize', 'ui.bootstrap', 'ui.router']);
app.apiroot = 'http://183.82.0.58:8025/Api/';
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {


    var states = [
        { name: 'testing', url: '/', templateUrl: 'testing.html' },

    ];

    $urlRouterProvider.otherwise('/');

    _.each(states, function(item) {

        var innerView = {};
        if (item.name === "login" || item.name === "dashboard4") {
            innerView = {
                "content@": {
                    templateUrl: item.templateUrl,
                    controller: item.controller
                }
            };
        } else {
            innerView = {

                "topbar@": {
                    templateUrl: "templates/topheader.html"
                },
                "content@": {
                    templateUrl: item.templateUrl,
                    controller: item.controller
                },
                "bottompanel@": {
                    templateUrl: "templates/footer.html"
                }

            };
        }

        $stateProvider.state(item.name, {
            url: item.url,
            views: (innerView)

        });
        $locationProvider.html5Mode(true);
    });
}]);
/**
 * AngularJS 
 * @author vinu <vinodanasuri@gmail.com>
 */

/**
 * Main App Creation
 */


var app = angular.module('Kaakateeya', ['ngSanitize', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad']);
app.apiroot = 'http://183.82.0.58:8025/Api/';
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {


    var states = [
        // { name: 'testing', url: '/', templateUrl: 'testing.html' },
        { name: 'dashboard', url: '/home' },
        { name: 'login', url: '/mg' },

    ];
    $ocLazyLoadProvider.config({
        debug: true
    });
    $urlRouterProvider.otherwise('/mg');

    _.each(states, function(item) {

        var innerView = {};

        innerView = {

            "topbar@": {
                templateUrl: "templates/topheader.html"
            },
            "content@": {
                templateUrl: item.name + '/index.html',
                controller: item.name + 'Ctrl'
            },
            "bottompanel@": {
                templateUrl: "templates/footer.html"
            }

        };


        $stateProvider.state(item.name, {
            url: item.url,
            views: {
                "lazyLoadView": {
                    controller: item.name + 'Ctrl', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: item.name + '/index.html',
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load(['' + item.name + '/controller/' + item.name + 'ctrl.js', '*.js']);
                }]
            }

        });
        $locationProvider.html5Mode(true);
    });
}]);
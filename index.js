/**
 * AngularJS 
 * @author vinu <vinodanasuri@gmail.com>
 */

/**
 * Main App Creation
 */


var app = angular.module('Kaakateeya', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngIdle', 'ngMaterial',
    'ngMessages', 'ngAria', 'ngPassword', 'jcs-autoValidate', 'angularPromiseButtons', 'KaakateeyaRegistration', 'oc.lazyLoad'
]);
app.apiroot = 'http://183.82.0.58:8025/Api/';
app.env = "dev";
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
    var states = [
        { name: 'dashboard', url: '/' },
        //{ name: 'login', url: '/loginpage' },
        { name: 'searchpage', url: '/search' },

    ];
    $ocLazyLoadProvider.config({
        debug: true
    });
    $urlRouterProvider.otherwise('/');

    _.each(states, function(item) {

        var innerView = {};

        innerView = {

            "topbar@": {
                templateUrl: "templates/topheader.html"
            },
            "lazyLoadView@": {
                templateUrl: "app/" + item.name + '/index.html',
                controller: item.name + 'Ctrl as page'
            },
            "bottompanel@": {
                templateUrl: "templates/footer.html"
            }

        };


        $stateProvider.state(item.name, {
            url: item.url,
            views: innerView,
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    if (app.env === "dev") {
                        return $ocLazyLoad.load(['app/' + item.name + '/css/style.css', 'app/' + item.name + '/controller/' + item.name + 'ctrl.js', 'app/' + item.name + '/model/' + item.name + 'Mdl.js', 'app/' + item.name + '/service/' + item.name + 'service.js']);

                    } else {
                        return $ocLazyLoad.load(['app/' + item.name + '/css/style.css', 'app/' + item.name + '/src/scripts.min.js']);

                    }
                }]
            }

        });
        $locationProvider.html5Mode(true);
    });
}]);
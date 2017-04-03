/**
 * AngularJS 
 * @author vinu <vinodanasuri@gmail.com>
 */

/**
 * Main App Creation
 */

var app = angular.module('Kaakateeya', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngIdle', 'ngMaterial',
    'ngMessages', 'ngAria', 'ngPassword', 'jcs-autoValidate', 'angularPromiseButtons', 'oc.lazyLoad', 'ngMdIcons',
    'KaakateeyaEmpReg', 'KaakateeyaEmpEdit', 'ngPrint'
]);
app.apiroot = 'http://183.82.0.58:8025/Api/';
app.apirootold = 'http://183.82.0.58:8010/Api/';
app.env = "dev";
app.payfixedAmt = 100;
app.paypoints = 10;
app.payDays = 30;
app.PaymentDays = parseInt(app.payDays) / parseInt(app.payfixedAmt);
app.paymentPoints = parseInt(app.paypoints) / parseInt(app.payfixedAmt);
app.ServiceTaxPercent = 14 / 100;

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
        var states = [
            { name: 'dashboard', url: '/dashboardpage', isloginrequired: true },
            { name: 'login', url: '/', isloginrequired: false },
            { name: 'searchpage', url: '/search/:id', isloginrequired: true },
            { name: 'editViewprofile', url: '/editViewprofileurl', isloginrequired: false },
            { name: 'EmployeePayment', url: '/EmployeePayments', isloginrequired: false },
            { name: 'EmployeePaymentInsert', url: '/EmployeePaymentInserts/:ProfileID/:status/:paymentID', isloginrequired: false },
            { name: 'bootstrapTable', url: '/bootstrapTables', isloginrequired: false },
            { name: 'employeeViewfullprofile', url: '/Viewfullprofile/:ProfileID', isloginrequired: false },
            { name: 'expressInterest', url: '/expressInterestpage', isloginrequired: false },
            { name: 'myProfile', url: '/myProfilepage', isloginrequired: false },
            { name: 'matchFollowup', url: '/matchFollowuppage', isloginrequired: false }

        ];
        $ocLazyLoadProvider.config({
            debug: true
        });

        $ocLazyLoadProvider.config({
            modules: [{
                    name: 'dashboard',
                    files: ['common/services/fileSaver.js']
                },
                {
                    name: 'complex-grid',
                    files: [
                        'directives/complex-grid/directive.js',
                        'directives/complex-grid/model/config.js',
                        'directives/complex-grid/svc.js',
                        'bower_components/json-export-excel/dest/json-export-excel.min.js'
                    ]
                }
            ]
        });

        $urlRouterProvider.otherwise('/');
        _.each(states, function(item) {
            var innerView = {};
            if (item.name === "login") {
                innerView = {
                    "lazyLoadView@": {
                        templateUrl: "app/" + item.name + '/index.html',
                        controller: item.name + 'Ctrl as page'
                    }
                };
            } else {
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
            }

            $stateProvider.state(item.name, {
                url: item.url,
                views: innerView,
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        if (app.env === "dev") {
                            if (item.name === 'dashboard') {
                                $ocLazyLoad.load('dashboard');
                                return $ocLazyLoad.load(['app/' + item.name + '/css/style.css', 'app/' + item.name + '/controller/' + item.name + 'ctrl.js', 'app/' + item.name + '/model/' + item.name + 'Mdl.js', 'app/' + item.name + '/service/' + item.name + 'service.js']);
                            } else if (item.name === 'editViewprofile' || item.name === 'EmployeePayment') {

                                $ocLazyLoad.load('complex-grid');
                                return $ocLazyLoad.load(['app/' + item.name + '/css/style.css', 'app/' + item.name + '/controller/' + item.name + 'ctrl.js', 'app/' + item.name + '/model/' + item.name + 'Mdl.js', 'app/' + item.name + '/service/' + item.name + 'service.js']);
                            } else {
                                return $ocLazyLoad.load(['app/' + item.name + '/css/style.css', 'app/' + item.name + '/controller/' + item.name + 'ctrl.js', 'app/' + item.name + '/model/' + item.name + 'Mdl.js', 'app/' + item.name + '/service/' + item.name + 'service.js']);
                            }
                        } else {
                            return $ocLazyLoad.load(['app/' + item.name + '/css/style.css', 'app/' + item.name + '/src/scripts.min.js']);
                        }
                    }]
                },
                data: {
                    requiresLogin: item.isloginrequired,
                }
            });
            $locationProvider.html5Mode(true);
        });
    }
]);
app.run(function($rootScope, $state, $stateParams) {
    $rootScope.$on('$stateChangeStart', function(e, to) {
        if (to.data && to.data.requiresLogin) {
            if (sessionStorage.getItem('LoginEmpid') === null || sessionStorage.getItem('LoginEmpid') === undefined || sessionStorage.getItem('LoginEmpid') === "") {
                e.preventDefault();
                console.log('success');
                $state.go('dashboard');
            } else {
                if (sessionStorage.getItem('LoginEmpid') !== null && sessionStorage.getItem('LoginEmpid') !== undefined && sessionStorage.getItem('LoginEmpid') !== "") {}
            }
        }
    });
});
/**
 * AngularJS 
 * @author vinu <vinodanasuri@gmail.com>
 */

/**
 * Main App Creation
 */

var app = angular.module('Kaakateeya', ['ui.router', 'ngSanitize', 'ui.bootstrap', 'angular-loading-bar',
    'ngAnimate', 'ngIdle', 'ngMaterial',
    'ngMessages', 'ngAria', 'ngPassword', 'jcs-autoValidate',
    'angularPromiseButtons', 'oc.lazyLoad', 'ngMdIcons',
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


app.GlobalImgPath = 'http://d16o2fcjgzj2wp.cloudfront.net/';
//regapp.GlobalImgPathforimage = 'https://s3.ap-south-1.amazonaws.com/kaakateeyaprod/';
app.GlobalImgPathforimage = 'https://s3.ap-south-1.amazonaws.com/angularkaknew/';
app.prefixPath = 'Images/SettlementImages/';
app.S3PhotoPath = app.GlobalImgPath + 'Images/ProfilePics/';
app.Mnoimage = app.GlobalImgPath + "Images/customernoimages/Mnoimage.jpg";
app.Fnoimage = app.GlobalImgPath + "Images/customernoimages/Fnoimage.jpg";
app.accesspathdots = app.GlobalImgPathforimage + app.prefixPath;
app.BucketName = 'angularkaknew';

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
        var states = [
            // { routeName: 'base', name: 'base', abstract: true },
            { routeName: 'login', name: 'base.login', url: '/', isloginrequired: false },
            { routeName: 'dashboard', name: 'base.dashboard', url: '/dashboardpage', isloginrequired: true, module: 'dashboard' },
            { routeName: 'searchpage', name: 'base.searchpage', url: '/search/:id', isloginrequired: true },
            { routeName: 'editViewprofile', name: 'base.editViewprofile', url: '/editViewprofileurl', isloginrequired: false },
            { routeName: 'EmployeePayment', name: 'base.EmployeePayment', url: '/EmployeePayments', isloginrequired: false },
            { routeName: 'EmployeePaymentInsert', name: 'base.EmployeePaymentInsert', url: '/EmployeePaymentInserts/:ProfileID/:status/:paymentID', isloginrequired: false },
            { routeName: 'bootstrapTable', name: 'base.bootstrapTable', url: '/bootstrapTables', isloginrequired: false },
            { routeName: 'employeeViewfullprofile', name: 'base.employeeViewfullprofile', url: '/Viewfullprofile/:ProfileID', isloginrequired: false },
            { routeName: 'expressInterest', name: 'base.expressInterest', url: '/expressInterestpage', isloginrequired: false },
            { routeName: 'myProfile', name: 'base.myProfile', url: '/myProfilepage', isloginrequired: false },
            { routeName: 'matchFollowup', name: 'base.matchFollowup', url: '/matchFollowuppage', isloginrequired: false },
            { routeName: 'marketing', name: 'base.marketing', url: '/marketingpage', isloginrequired: false },
            { routeName: 'bootstrapSlide', name: 'base.bootstrapSlide', url: '/bootstrapSlideshow', isloginrequired: false, module: 'complex-slide' },
            { routeName: 'bootstrapPopup', name: 'base.bootstrapPopup', url: '/bootstrapPopups', isloginrequired: false, module: 'complex-popup' },
            { routeName: 'mailViewFullProfile', name: 'base.mailViewFullProfile', url: '/mailViewFullProfile', isloginrequired: false }
        ];
        $ocLazyLoadProvider.config({
            debug: true
        });

        $ocLazyLoadProvider.config({
            modules: [{
                    name: 'dashboard',
                    files: ['common/services/fileSaver.js',
                        'src/js/alasql.js',
                        'src/js/xlsx.js',
                        'common/services/fileuploadservice.js'
                    ]
                },
                {
                    name: 'complex-grid',
                    files: [
                        'directives/complex-grid/directive.js',
                        'directives/complex-grid/model/config.js',
                        'directives/complex-grid/svc.js',
                        // 'bower_components/json-export-excel/dest/json-export-excel.min.js',
                        'src/js/alasql.js',
                        'src/js/xlsx.js',
                        'directives/complex-grid/css/style.css'

                    ]
                },
                {
                    name: 'complex-slide',
                    files: [
                        'directives/complex-slide/directive.js',
                        'directives/complex-slide/model/config.js',
                        'directives/complex-slide/css/style.css'

                    ]
                },
                {
                    name: 'complex-popup',
                    files: [
                        'directives/complex-popup/directive.js',
                        'directives/complex-popup/model/config.js',
                        'directives/complex-popup/css/style.css'

                    ]
                },
                {
                    name: 'commonjs',
                    files: ['common/services/modalPopupmethods.js',
                        'common/services/errorInterceptor.js',
                        'common/controllers/LoaderCtrl.js',
                        'common/services/authSvc.js',
                        'common/controllers/topheaderctrl.js',
                        'common/services/serviceBind.js',
                        'common/services/dependencyservices.js',
                        'common/services/getArray.js',
                        'common/services/helpService.js',
                        'common/services/route.js'
                    ]
                },
                {
                    name: 'directives',
                    files: ['directives/dynamicSlideshow.js',
                        'directives/multiSelectDirective.js',
                        'directives/angularMaterialmultiselectDirectives.js',
                        'directives/dynamicAlets.js',
                        'directives/datePickerDirective.js',
                        'directives/checkboxList.js',
                        'directives/accessForm.js',
                        'directives/invalidFocus.js',
                        'directives/focusDirective.js',
                        'directives/bindHtmlEvents.js',
                        'directives/tickethistryInfm.js',
                        'directives/marketingticket.js'
                    ]
                },
                {
                    name: 'constants',
                    files: ['constants/arrayConstants.js']
                },
                {
                    name: 'modules',
                    files: [
                        'node_modules/bootstrap-multiselect/dist/js/bootstrap-multiselect.js',
                        'node_modules/moment/min/moment.min.js',
                        'bower_components/toastr/toastr.min.js'
                    ]
                },
                {
                    name: 'Expressintrst',
                    files: [
                        'app/expressInterest/controller/expressInterestctrl.js',

                        'app/expressInterest/css/style.css',

                        'app/expressInterest/model/expressInterestMdl.js',
                        'app/expressInterest/service/expressInterestservice.js'
                    ]
                }

            ]
        });

        $urlRouterProvider.otherwise('/');
        $stateProvider.state('base', {
            abstract: true,
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    $ocLazyLoad.load('commonjs');
                    $ocLazyLoad.load('directives');
                    $ocLazyLoad.load('constants');
                    $ocLazyLoad.load('modules');
                    $ocLazyLoad.load('complex-grid');
                    $ocLazyLoad.load('complex-slide');
                    $ocLazyLoad.load('Expressintrst');
                }]
            }
        });
        _.each(states, function(item) {
            var innerView = {};
            if (item.routeName === "login") {
                innerView = {
                    "lazyLoadView@": {
                        templateUrl: "app/" + item.routeName + '/index.html',
                        controller: item.routeName + 'Ctrl as page'
                    }
                };
            } else {
                innerView = {
                    "topbar@": {
                        templateUrl: "templates/topheader.html"
                    },
                    "lazyLoadView@": {
                        templateUrl: "app/" + item.routeName + '/index.html',
                        controller: item.routeName + 'Ctrl as page'
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
                            if (item.module !== undefined) {
                                $ocLazyLoad.load(item.module);
                            }
                            return $ocLazyLoad.load([
                                'app/' + item.routeName + '/css/style.css',
                                'app/' + item.routeName + '/controller/' + item.routeName + 'ctrl.js',
                                'app/' + item.routeName + '/model/' + item.routeName + 'Mdl.js',
                                'app/' + item.routeName + '/service/' + item.routeName + 'service.js'
                            ]);
                        } else {
                            return $ocLazyLoad.load(['app/' + item.routeName + '/css/style.css', 'app/' + item.routeName + '/src/scripts.min.js']);
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
                $state.go('dashboard');
            } else {
                if (sessionStorage.getItem('LoginEmpid') !== null && sessionStorage.getItem('LoginEmpid') !== undefined && sessionStorage.getItem('LoginEmpid') !== "") {}
            }
        }
    });
});
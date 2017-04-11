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
            { name: 'matchFollowup', url: '/matchFollowuppage', isloginrequired: false },
            { name: 'marketing', url: '/marketingpage', isloginrequired: false },
            { name: 'bootstrapSlide', url: '/bootstrapSlideshow', isloginrequired: false, module: 'complex-slide' },
            { name: 'bootstrapPopup', url: '/bootstrapPopups', isloginrequired: false, module: 'complex-popup' }
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
                        'directives/bindHtmlEvents.js'
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
                            if (item.module !== undefined) {
                                $ocLazyLoad.load(item.module);
                            }
                            if (item.name === 'login' || item.name === "employeeViewfullprofile" || item.name === "EmployeePayment") {
                                $ocLazyLoad.load('commonjs');
                                $ocLazyLoad.load('directives');
                                $ocLazyLoad.load('constants');
                                $ocLazyLoad.load('modules');
                                $ocLazyLoad.load('complex-grid');
                                $ocLazyLoad.load('complex-slide');
                                return $ocLazyLoad.load(['app/' + item.name + '/css/style.css', 'app/' + item.name + '/controller/' + item.name + 'ctrl.js', 'app/' + item.name + '/model/' + item.name + 'Mdl.js', 'app/' + item.name + '/service/' + item.name + 'service.js']);
                            } else if (item.name === 'dashboard') {
                                $ocLazyLoad.load('dashboard');
                                return $ocLazyLoad.load(['app/' + item.name + '/css/style.css', 'app/' + item.name + '/controller/' + item.name + 'ctrl.js', 'app/' + item.name + '/model/' + item.name + 'Mdl.js', 'app/' + item.name + '/service/' + item.name + 'service.js']);
                            } else if (item.name === 'editViewprofile' || item.name === 'EmployeePayment') {
                                return $ocLazyLoad.load(['app/' + item.name + '/css/style.css', 'app/' + item.name + '/controller/' + item.name + 'ctrl.js', 'app/' + item.name + '/model/' + item.name + 'Mdl.js', 'app/' + item.name + '/service/' + item.name + 'service.js']);
                            } else {
                                // $ocLazyLoad.load('commonjs');
                                // $ocLazyLoad.load('directives');
                                // $ocLazyLoad.load('constants');
                                // $ocLazyLoad.load('modules');
                                // $ocLazyLoad.load('complex-grid');
                                // $ocLazyLoad.load('complex-slide');

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
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
    'ui.date'
]);

// app.apiroot = 'http://52.66.131.254:8025/Api/';
// app.apipathold = 'http://52.66.131.254:8010/Api/';

app.apiroot = 'http://183.82.0.58:8025/Api/';
app.apipathold = 'http://183.82.0.58:8010/Api/';

app.env = "dev";
app.payfixedAmt = 100;
app.paypoints = 10;
app.payDays = 30;
app.PaymentDays = parseInt(app.payDays) / parseInt(app.payfixedAmt);
app.paymentPoints = parseInt(app.paypoints) / parseInt(app.payfixedAmt);
app.ServiceTaxPercent = 14 / 100;

app.GlobalImgPath = 'http://d16o2fcjgzj2wp.cloudfront.net/';
app.GlobalImgPathforimage = 'https://s3.ap-south-1.amazonaws.com/kaakateeyaprod/';
//app.GlobalImgPathforimage = 'https://s3.ap-south-1.amazonaws.com/angularkaknew/';
app.prefixPath = 'Images/SettlementImages/';

app.Mnoimage = app.GlobalImgPath + "Images/customernoimages/Mnoimage.jpg";
app.Fnoimage = app.GlobalImgPath + "Images/customernoimages/Fnoimage.jpg";
app.accesspathdots = app.GlobalImgPathforimage + app.prefixPath;
app.BucketName = 'kaakateeyaprod';

app.S3PhotoPath = app.GlobalImgPath + 'Images/ProfilePics/';

app.accesspathdotsImg = app.S3PhotoPath;
app.prefixPathImg = 'Images/ProfilePics/';

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
        var states = [
            { routeName: 'login', name: 'login', url: '/', isloginrequired: false, subname: ['common/services/authSvc.js', 'common/services/helpService.js'] },
            { routeName: 'dashboard', name: 'base.dashboard', url: '/dashboardpage', isloginrequired: true, module: 'dashboard' },
            { routeName: 'searchpage', name: 'base.searchpage', url: '/search/:id/:Profileid', isloginrequired: true },
            { routeName: 'editViewprofile', name: 'base.editViewprofile', url: '/editViewprofileurl', isloginrequired: true },
            { routeName: 'EmployeePayment', name: 'base.EmployeePayment', url: '/EmployeePayments', isloginrequired: true },
            { routeName: 'EmployeePaymentInsert', name: 'base.EmployeePaymentInsert', url: '/EmployeePaymentInserts/:ProfileID/:status/:paymentID', isloginrequired: true },
            { routeName: 'bootstrapTable', name: 'base.bootstrapTable', url: '/bootstrapTables', isloginrequired: true },
            { routeName: 'employeeViewfullprofilePrint', name: 'base.employeeViewfullprofile', url: '/Viewfullprofile/:ProfileID', isloginrequired: true },
            { routeName: 'expressInterest', name: 'base.expressInterest', url: '/expressInterestpage', isloginrequired: true },
            { routeName: 'myProfile', name: 'base.myProfile', url: '/myProfilepage', isloginrequired: true },
            { routeName: 'matchFollowup', name: 'base.matchFollowup', url: '/matchFollowuppage', isloginrequired: true },
            { routeName: 'marketing', name: 'base.marketing', url: '/marketingpage', isloginrequired: true },
            { routeName: 'bootstrapSlide', name: 'base.bootstrapSlide', url: '/bootstrapSlideshow', isloginrequired: true, module: 'complex-slide' },
            { routeName: 'bootstrapPopup', name: 'base.bootstrapPopup', url: '/bootstrapPopups', isloginrequired: true, module: 'complex-popup' },

            { routeName: 'basicRegistration', name: 'base.basicRegistration', url: '/Registration', isloginrequired: true },
            { routeName: 'secondaryRegistration', name: 'base.secondaryRegistration', url: '/secondaryReg/:CustID/:ProfileID/:fn/:ln/:countryID/:genderID', isloginrequired: true },
            { routeName: 'regManagePhoto', name: 'base.regManagePhoto', url: '/ManagePhoto/:CustID/:ProfileID/:genderID', isloginrequired: true },

            { routeName: 'editEducation', name: 'editandviewbase.editEducation', url: '/Education', isloginrequired: true },
            { routeName: 'editManagePhoto', name: 'editandviewbase.editManagePhoto', url: '/ManagePhoto' },
            { routeName: 'editParent', name: 'editandviewbase.editParent', url: '/Parent' },
            { routeName: 'editPartnerpreference', name: 'editandviewbase.editPartnerpreference', url: '/Partnerpreference' },
            { routeName: 'editSibbling', name: 'editandviewbase.editSibbling', url: '/Sibbling' },
            { routeName: 'editAstro', name: 'editandviewbase.editAstro', url: '/Astro', subname: ['common/services/fileUploadSevice.js', 'common/directives/fileUploadDirective.js'] },
            { routeName: 'editProperty', name: 'editandviewbase.editProperty', url: '/Property' },
            { routeName: 'editRelative', name: 'editandviewbase.editRelative', url: '/Relative' },
            { routeName: 'editReference', name: 'editandviewbase.editReference', url: '/Reference' },
            { routeName: 'editSpouse', name: 'editandviewbase.editSpouse', url: '/Spouse', subname: ['common/directives/datePickerDirective.js'] },
            { routeName: 'editContact', name: 'editandviewbase.editContact', url: '/Contact' },
            { routeName: 'editOfcePurpose', name: 'editandviewbase.editOfcePurpose', url: '/OfcePurpose' },
            { routeName: 'editProfileSetting', name: 'editandviewbase.editProfileSetting', url: '/ProfileSetting' },
            { routeName: 'employeeViewfullprofilePrint', name: 'base.employeeViewfullprofilePrint', url: '/employeeViewfullprofiles/:ProfileID', subname: ['directives/divPrint.js'] },
            { routeName: 'registrationValidation', name: 'base.registrationValidation', url: '/registrationValidations' },
            { routeName: 'communicationLog', name: 'base.communicationLog', url: '/communicationLogs', isloginrequired: true }

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
                        'common/controllers/topheaderctrl.js',
                        'common/controllers/LoaderCtrl.js',
                        'common/services/helpService.js',
                        'common/services/authSvc.js',
                        'common/services/serviceBind.js',
                        'common/services/dependencyservices.js',
                        'common/services/getArray.js',
                        'common/services/route.js',
                        'common/services/getArrayService.js',
                        'common/services/selectBindServices.js',
                        'common/services/selectBindServicesEdit.js',
                        'constants/arrayBindConstatnsEdit.js',
                        'common/services/fileuploadservice.js'
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
                        'directives/marketingticket.js',
                        'directives/marketHistryDirective.js',
                        'directives/newdatePicker.js',
                        'directives/matchfollowupTicketDirective.js',
                        'directives/fileUploadDirective.js',
                        'directives/commondependency.js',
                        'directives/fileUploadDirective.js',
                        'directives/commonFactory.js',
                        'directives/contactDirecrive.js',
                        'directives/countryDirective.js',
                        'directives/pageReviewDirective.js',
                        'directives/datePickerDirectiveEdit.js',
                        'directives/divPrint.js',
                        'directives/editFooter.js'
                    ]
                },
                {
                    name: 'constants',
                    files: ['constants/arrayConstants.js', 'constants/arrayBindConstatns.js']
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
                        'app/expressInterest/expressInterestctrl.js',
                        'app/expressInterest/style.css',
                        'app/expressInterest/expressInterestMdl.js',
                        'app/expressInterest/expressInterestservice.js'
                    ]
                },
                {
                    name: 'marketing-slide',
                    files: [
                        'directives/marketing-slide/css/style.css',
                        'directives/marketing-slide/model/config.js',
                        'directives/marketing-slide/service/svc.js',
                        'directives/marketing-slide/directive.js'
                    ]
                },
                {
                    name: 'matchfollowup-ticket',
                    files: [
                        'directives/matchfollowup-ticket/css/style.css',
                        'directives/matchfollowup-ticket/model/config.js',
                        'directives/matchfollowup-ticket/service/svc.js',
                        'directives/matchfollowup-ticket/directive.js'
                    ]
                },
                {
                    name: 'EditSideMenu-base',
                    files: [
                        'app/base/basectrl.js',
                        'app/base/baseMdl.js',
                        'app/base/baseservice.js'
                    ]
                },
                {
                    name: 'EditSlide-popup',
                    files: [
                        'directives/slidePopup/config.js',
                        'directives/slidePopup/directive.js',
                        'directives/slidePopup/service.js',
                        'directives/slidePopup/css/style.css'
                    ]
                }
            ]
        });

        $urlRouterProvider.otherwise('/');
        $stateProvider.state('base', {
            abstract: true,
            templateUrl: "app/base/index.html",
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    $ocLazyLoad.load('commonjs');
                    $ocLazyLoad.load('directives');
                    $ocLazyLoad.load('constants');
                    $ocLazyLoad.load('modules');
                    $ocLazyLoad.load('complex-grid');
                    $ocLazyLoad.load('complex-slide');
                    $ocLazyLoad.load('Expressintrst');
                    $ocLazyLoad.load('marketing-slide');
                    $ocLazyLoad.load('matchfollowup-ticket');
                    $ocLazyLoad.load('EditSideMenu-base');
                    $ocLazyLoad.load('EditSlide-popup');
                }]
            }
        });


        $stateProvider.state('editandviewbase', {
            abstract: true,
            url: '/editView/:CustID',
            templateUrl: "app/editandviewbase/index.html",
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    $ocLazyLoad.load('commonjs');
                    $ocLazyLoad.load('directives');
                    $ocLazyLoad.load('constants');
                    $ocLazyLoad.load('modules');
                    $ocLazyLoad.load('complex-grid');
                    $ocLazyLoad.load('complex-slide');
                    $ocLazyLoad.load('Expressintrst');
                    $ocLazyLoad.load('marketing-slide');
                    $ocLazyLoad.load('matchfollowup-ticket');
                    $ocLazyLoad.load('EditSideMenu-base');
                    $ocLazyLoad.load('EditSlide-popup');
                }]
            }
        });
        _.each(states, function(item) {
            $stateProvider.state(item.name, {
                url: item.url,
                templateUrl: "app/" + item.routeName + '/index.html',
                controller: item.routeName + 'Ctrl as page',
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        if (app.env === "dev") {
                            if (item.module !== undefined) {
                                $ocLazyLoad.load(item.module);
                            }
                            return $ocLazyLoad.load([
                                'app/' + item.routeName + '/style.css',
                                'app/' + item.routeName + '/' + item.routeName + 'ctrl.js',
                                'app/' + item.routeName + '/' + item.routeName + 'Mdl.js',
                                'app/' + item.routeName + '/' + item.routeName + 'service.js'

                            ].concat(item.subname || []));
                        } else {
                            return $ocLazyLoad.load(['app/' + item.routeName + '/style.css', 'app/' + item.routeName + '/scripts.min.js']);
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
                $state.go('base.login');
            } else {
                if (sessionStorage.getItem('LoginEmpid') !== null && sessionStorage.getItem('LoginEmpid') !== undefined && sessionStorage.getItem('LoginEmpid') !== "") {}
            }
        }
    });
});
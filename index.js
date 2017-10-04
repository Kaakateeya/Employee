/**
 * AngularJS 
 * @author vinu <vinodanasuri@gmail.com>
 */
/**
 * Main App Creation 
 */
var app = angular.module('Kaakateeya', ['ui.router', 'ngSanitize', 'ui.bootstrap',
    'ngAnimate', 'ngIdle', 'ngMaterial', 'ngMessages', 'ngAria', 'ngPassword', 'jcs-autoValidate',
    'angularPromiseButtons', 'oc.lazyLoad', 'ngMdIcons', 'ui.date', 'ng-clipboard', 'ng-fusioncharts',
    'infinite-scroll', 'ngLoadingSpinner', 'ui-notification'
]);
//'angular-loading-bar',
app.apiroot = 'http://52.66.131.254:8025/Api/';
app.apipathold = 'http://52.66.131.254:8010/Api/';

// app.apiroot = 'http://183.82.0.58:8025/Api/';
// app.apipathold = 'http://183.82.0.58:8070/Api/';

app.env = "dev";
app.kammaPayfixedAmt = 1000;
app.kammaPaypoints = 12;
app.kammaPayDays = 30;
app.kammaPaymentDays = parseInt(app.kammaPayDays) / parseInt(app.kammaPayfixedAmt);
app.kammaPaymentPoints = parseInt(app.kammaPaypoints) / parseInt(app.kammaPayfixedAmt);

app.payfixedAmt = 1000;
app.paypoints = 22;
app.payDays = 42;
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
app.S3PhotoPath = app.GlobalImgPathforimage + 'Images/ProfilePics/';
app.accesspathdotsImg = app.S3PhotoPath;
app.prefixPathImg = 'Images/ProfilePics/';
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
        var states = [
            { routeName: 'login', name: 'login', url: '/', isloginrequired: false },
            { routeName: 'dashboard', name: 'base.dashboard', url: '/dashboardpage', isloginrequired: true, module: 'dashboard' },
            { routeName: 'searchpage', name: 'base.searchpage', url: '/search/:id/:Profileid', isloginrequired: true, reload: true },
            { routeName: 'editViewprofile', name: 'base.editViewprofile', url: '/editViewprofileurl', isloginrequired: true },
            { routeName: 'EmployeePayment', name: 'base.EmployeePayment', url: '/EmployeePayments/:ProfileID' },
            { routeName: 'EmployeePaymentInsert', name: 'base.EmployeePaymentInsert', url: '/EmployeePaymentInserts/:ProfileID/:status/:paymentID/:histryid', isloginrequired: true },
            { routeName: 'employeeViewfullprofilePrint', name: 'base.employeeViewfullprofilePrint', url: '/Viewfullprofile/:ProfileID/:contacts', isloginrequired: true, subname: ['directives/divPrint.js'] },
            { routeName: 'expressInterest', name: 'base.expressInterest', url: '/expressInterestpage', isloginrequired: true },
            { routeName: 'myProfile', name: 'base.myProfile', url: '/myProfilepage', isloginrequired: true },
            { routeName: 'matchFollowup', name: 'base.matchFollowup', url: '/matchFollowuppage', isloginrequired: true },
            { routeName: 'marketing', name: 'base.marketing', url: '/marketingpage', isloginrequired: true },
            { routeName: 'basicRegistration', name: 'base.basicRegistration', url: '/Registration', isloginrequired: true },
            { routeName: 'secondaryRegistration', name: 'base.secondaryRegistration', url: '/secondaryReg/:CustID/:ProfileID/:fn/:ln/:countryID/:genderID', isloginrequired: true },
            { routeName: 'regManagePhoto', name: 'base.regManagePhoto', url: '/ManagePhoto/:CustID/:ProfileID/:genderID', isloginrequired: true },
            { routeName: 'editEducation', name: 'base.editEducation', url: '/Education/:CustID', isloginrequired: true },
            { routeName: 'editManagePhoto', name: 'base.editManagePhoto', url: '/ManagePhoto/:CustID', isloginrequired: true },
            { routeName: 'editParent', name: 'base.editParent', url: '/Parent/:CustID', isloginrequired: true },
            { routeName: 'editPartnerpreference', name: 'base.editPartnerpreference', url: '/Partnerpreference/:CustID', isloginrequired: true },
            { routeName: 'editSibbling', name: 'base.editSibbling', url: '/Sibbling/:CustID', isloginrequired: true },
            { routeName: 'editAstro', name: 'base.editAstro', url: '/Astro/:CustID', subname: ['common/services/fileUploadSevice.js', 'common/directives/fileUploadDirective.js'] },
            { routeName: 'editProperty', name: 'base.editProperty', url: '/Property/:CustID', isloginrequired: true },
            { routeName: 'editRelative', name: 'base.editRelative', url: '/Relative/:CustID', isloginrequired: true },
            { routeName: 'editReference', name: 'base.editReference', url: '/Reference/:CustID', isloginrequired: true },
            { routeName: 'editSpouse', name: 'base.editSpouse', url: '/Spouse/:CustID', isloginrequired: true, subname: ['common/directives/datePickerDirective.js'] },
            { routeName: 'editContact', name: 'base.editContact', url: '/Contact/:CustID', isloginrequired: true },
            { routeName: 'editOfcePurpose', name: 'base.editOfcePurpose', url: '/OfcePurpose/:CustID', isloginrequired: true },
            { routeName: 'editProfileSetting', name: 'base.editProfileSetting', url: '/ProfileSetting/:CustID', isloginrequired: true },
            { routeName: 'registrationValidation', name: 'base.registrationValidation', url: '/registrationValidations', isloginrequired: true },
            { routeName: 'communicationLog', name: 'base.communicationLog', url: '/communicationLogs', isloginrequired: true },
            { routeName: 'uploadSettlementForm', name: 'base.uploadSettlementForm', url: '/uploadSettlementFormPage', isloginrequired: true },
            { routeName: 'viewSettlementform', name: 'base.viewSettlementform', url: '/viewSettlementforms', isloginrequired: true },
            { routeName: 'serviceSlideShow', name: 'base.serviceSlideShow', url: '/serviceSlideShows', isloginrequired: true },
            { routeName: 'settleDeleteProfile', name: 'base.settleDeleteProfile', url: '/settleDeleteProfilePage', isloginrequired: true },
            { routeName: 'assignSettings', name: 'base.assignSettings', url: '/assignSetting', isloginrequired: true },
            { routeName: 'employeeViewfullprofilePrintchk', name: 'base.employeeViewfullprofilePrintchk', isloginrequired: true, url: '/employeeViewfullprofileschk/:ProfileID/:contacts', subname: ['directives/divPrint.js'] },
            { routeName: 'paymentAuthorization', name: 'base.paymentAuthorization', url: '/paymentAuthorizationpage', isloginrequired: true },
            { routeName: 'reviewPendinrReports', name: 'base.reviewPendinrReports', url: '/reviewPendinrReport', isloginrequired: true },
            { routeName: 'ticketCreation', name: 'base.ticketCreation', url: '/ticketCreationpage', isloginrequired: true },
            { routeName: 'updateMacAdress', name: 'base.updateMacAdress', url: '/updateMacAdresspage', isloginrequired: true },
            { routeName: 'customerMessagesverification', name: 'base.customerMessagesverification', url: '/customerMessagesverificationpage', isloginrequired: true },
            { routeName: 'marketingticketverification', name: 'base.marketingticketverification', url: '/marketingticketverificationpage', isloginrequired: true },
            { routeName: 'emailbounceEntryform', name: 'base.emailbounceEntryform', url: '/emailbounceEntryformpage', isloginrequired: true },
            { routeName: 'matchMeetingEntryForm', name: 'base.matchMeetingEntryForm', url: '/matchMeetingEntryFormPage', isloginrequired: true },
            { routeName: 'paymentdetailsReport', name: 'base.paymentdetailsReport', url: '/paymentdetailsReportpage', isloginrequired: true },
            { routeName: 'brokerEntryForm', name: 'base.brokerEntryForm', url: '/brokerEntryFormpage', isloginrequired: true },
            { routeName: 'brokerProfileRegistration', name: 'base.brokerProfileRegistration', url: '/brokerProfileRegistrationpage', isloginrequired: true },
            { routeName: 'myAssignedPhotos', name: 'base.myAssignedPhotos', url: '/myAssignedPhotosPage', isloginrequired: true },
            { routeName: 'unAssignedPhotos', name: 'base.unAssignedPhotos', url: '/unAssignedPhotosPage', isloginrequired: true },
            { routeName: 'paymentOffersAssignnew', name: 'base.paymentOffersAssignnew', url: '/paymentOffersAssignPage', isloginrequired: true },
            { routeName: 'employeeCreation', name: 'base.employeeCreation', url: '/employeeCreationPage', isloginrequired: true },
            // { routeName: 'keywordlikeSearch', name: 'base.keywordlikeSearch', url: '/keywordlikeSearchpage', isloginrequired: true },
            { routeName: 'customerFactsheet', name: 'base.customerFactsheet', url: '/customerFactsheetpage', isloginrequired: true },
            { routeName: 'empTracking', name: 'base.empTracking', url: '/empTrackingPage', isloginrequired: true },
            { routeName: 'dashboardAdminReport', name: 'base.dashboardAdminReport', url: '/dashboardAdminReports', isloginrequired: true },
            { routeName: 'fixedtableTesting', name: 'base.fixedtableTesting', url: '/fixedtableTestings', isloginrequired: true },
            { routeName: 'viewUploadSettledProfiles', name: 'base.viewUploadSettledProfiles', url: '/viewUploadSettledProfilesPage', isloginrequired: true },
            { routeName: 'ReportsofEmployees', name: 'base.ReportsofEmployees', url: '/ReportsofEmployee', isloginrequired: true },
            { routeName: 'viewSuccessStories', name: 'base.viewSuccessStories', url: '/viewSuccessStoriesPage', isloginrequired: true },
            { routeName: 'NomatchesReasonpage', name: 'base.NomatchesReasonpage', url: '/NomatchesReason', isloginrequired: true },
            { routeName: 'oldKmplKeywordSearch', name: 'base.oldKmplKeywordSearch', url: '/oldKmplKeywordSearchpage', isloginrequired: true },
            { routeName: 'matchMeetingCountReport', name: 'base.matchMeetingCountReport', url: '/matchMeetingCountReportPage', isloginrequired: true },
            { routeName: 'settleDeleteProfileseReport', name: 'base.settleDeleteProfileseReport', url: '/settleDeleteProfileseReportPage', isloginrequired: true },
            { routeName: 'employeeViewfullprofilePrint', name: 'base.employeeViewfullprofilePrintmail', url: '/Viewfullprofilemail/:ProfileID/:contacts', isloginrequired: false, subname: ['directives/divPrint.js'] },
            // { routeName: 'showHoro', name: 'base.showHoro', url: '/showHoro', isloginrequired: false },
            { routeName: 'keywordSearch', name: 'base.keywordSearch', url: '/keywordSearchpage', isloginrequired: true },
            { routeName: 'horoDisplay', name: 'base.horoDisplay', url: '/horoDisplay', isloginrequired: false }
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
                        'src/js/alasql.js',
                        'src/js/xlsx.js',
                        'directives/complex-grid/css/style.css'
                    ]
                },
                {
                    name: 'complex-grid-new',
                    files: [
                        'directives/complex-grid-new/directive.js',
                        'directives/complex-grid-new/model/config.js',
                        'src/js/alasql.js',
                        'src/js/xlsx.js',
                        'directives/complex-grid-new/css/style.css'
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
                    files: [
                        'common/services/modalPopupmethods.js',
                        'common/services/errorInterceptor.js',
                        'common/services/serviceBind.js',
                        'common/services/dependencyservices.js',
                        'common/services/getArray.js',
                        'common/services/route.js',
                        'common/services/getArrayService.js',
                        'common/services/selectBindServices.js',
                        'common/services/selectBindServicesEdit.js',
                        'common/services/fileuploadservice.js',
                        'common/models/headermodel.js',
                        'common/controllers/topheaderctrl.js',
                        'common/controllers/LoaderCtrl.js'
                    ]
                },
                {
                    name: 'directives',
                    files: [
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
                        'directives/editFooter.js',
                        'directives/allowOnlyNumbers.js',
                        'directives/allowAdminManagement.js',
                        'directives/comparePassword.js',
                        'directives/avoidFormsubmit.js'
                    ]
                },
                {
                    name: 'constants',
                    files: ['constants/arrayBindConstatnsEdit.js', 'constants/arrayConstants.js'
                        // 'constants/arrayBindConstatns.js'
                    ]
                },
                {
                    name: 'properties',
                    files: ['common/properties/paymentProperty.js']
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
                },
                {
                    name: 'single-grid',
                    files: [
                        'directives/singel-grid/config.js',
                        'directives/singel-grid/directive.js'
                    ]
                },
                {
                    name: 'norecordsalert-popup',
                    files: [
                        'directives/norecordsalert-popup/css/style.css',
                        'directives/norecordsalert-popup/model/config.js',
                        'directives/norecordsalert-popup/service/svc.js',
                        'directives/norecordsalert-popup/directive.js'
                    ]
                },
                {
                    name: 'payment-editpointsdate',
                    files: [
                        'directives/payment-editpointsdate/css/style.css',
                        'directives/payment-editpointsdate/model/config.js',
                        'directives/payment-editpointsdate/service/svc.js',
                        'directives/payment-editpointsdate/directive.js'
                    ]
                },
                {
                    name: 'auth',
                    files: [
                        'common/services/authSvc.js',
                        'common/services/helpService.js',
                    ]
                },
                {
                    name: 'payment',
                    files: [
                        'directives/paymentDetailsDirective/paymentDetailsDirective.js',
                        'app/EmployeePayment/EmployeePaymentMdl.js',
                        'app/EmployeePayment/EmployeePaymentservice.js'
                    ]
                },
                {
                    name: 'horoDisplay',
                    files: [
                        'app/horoDisplay/horoDisplayctrl.js',
                        'app/horoDisplay/horoDisplayMdl.js',
                        'app/horoDisplay/horoDisplayservice.js'
                    ]
                }

            ]
        });
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('base', {
            abstract: true,
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', '$timeout', function($ocLazyLoad, timeout) {
                    $ocLazyLoad.load('auth');
                    // timeout(function() {
                    loadmodules($ocLazyLoad);
                    // }, 500);
                }]
            }
        });
        var innerView = {
            "topbar@": {
                templateUrl: "templates/topheader.html"
            },
            "lazyLoadView@": {
                templateUrl: "app/editandviewbase/index.html",
            },
            "bottompanel@": {
                templateUrl: "templates/footer.html"
            }
        };
        $stateProvider.state('editandviewbase', {
            abstract: true,
            url: '/editView/:CustID',
            views: innerView,
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    loadmodules($ocLazyLoad);
                }]
            }
        });
        _.each(states, function(item) {
            var innerView = {};
            if (item.routeName === "login" || item.routeName === "horoDisplay") {
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
                resolve: {
                    // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        if (app.env === "dev") {
                            if (item.module !== undefined) {
                                $ocLazyLoad.load(item.module);
                            }
                            if (item.routeName === 'login') {
                                $ocLazyLoad.load('auth');
                            }
                            return $ocLazyLoad.load([
                                'app/' + item.routeName + '/style.css',
                                'app/' + item.routeName + '/' + item.routeName + 'ctrl.js',
                                'app/' + item.routeName + '/' + item.routeName + 'Mdl.js',
                                'app/' + item.routeName + '/' + item.routeName + 'service.js'
                            ]);
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
app.run(function($rootScope, $state, $stateParams, $ocLazyLoad) {
    $rootScope.ProfileOwner = '';
    $rootScope.EditProfilePaidStatus = '';
    // $rootScope.processingsymbol = true;
    $rootScope.$on('$stateChangeStart', function(e, to) {
        if (to && to.name !== 'login' && to.name !== 'base.employeeViewfullprofilePrintmail' && to.name !== 'base.horoDisplay') {
            if (sessionStorage.getItem('logintime') && (sessionStorage.getItem('logintime')) === moment().format('MM/DD/YYYY')) {
                if (to.data && to.data.requiresLogin) {
                    if (sessionStorage.getItem('LoginEmpid') === null || sessionStorage.getItem('LoginEmpid') === undefined || sessionStorage.getItem('LoginEmpid') === "") {
                        e.preventDefault();
                        $state.go('login');
                    } else {
                        if (sessionStorage.getItem('LoginEmpid') !== null && sessionStorage.getItem('LoginEmpid') !== undefined && sessionStorage.getItem('LoginEmpid') !== "") {}
                    }
                }
            } else {
                if (to.name === 'base.employeeViewfullprofilePrintmail' || to.name !== 'base.horoDisplay') {} else {
                    e.preventDefault();
                    $state.go('login');
                }
            }
        }
    });
    // $rootScope.$on('$stateChangeSuccess', function(event, view) {
    //     if (view.name === 'login') {
    //         $ocLazyLoad.load('auth');
    //         loadmodules($ocLazyLoad);
    //     }
    // });
});

function loadmodules($ocLazyLoad) {
    $ocLazyLoad.load('constants');
    $ocLazyLoad.load('commonjs');
    $ocLazyLoad.load('directives');
    $ocLazyLoad.load('modules');
    $ocLazyLoad.load('complex-grid');
    $ocLazyLoad.load('complex-grid-new');
    $ocLazyLoad.load('complex-slide');
    $ocLazyLoad.load('Expressintrst');
    $ocLazyLoad.load('marketing-slide');
    $ocLazyLoad.load('matchfollowup-ticket');
    $ocLazyLoad.load('EditSideMenu-base');
    $ocLazyLoad.load('EditSlide-popup');
    $ocLazyLoad.load('single-grid');
    $ocLazyLoad.load('properties');
    $ocLazyLoad.load('norecordsalert-popup');
    $ocLazyLoad.load('payment-editpointsdate');
    $ocLazyLoad.load('payment');
    $ocLazyLoad.load('horoDisplay');
}
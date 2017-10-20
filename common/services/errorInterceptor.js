(function(app) {
    'use strict';
    angular
        .module('Kaakateeya').factory('errorInterceptor', ['$rootScope', '$q',
            function($rootScope, $q) {
                return {
                    request: function(config) {
                        $rootScope.$broadcast('request-start');
                        // config.headers.Authorization = 'Bearer' + ' ' + sessionStorage.getItem('Token');
                        config.headers['Content-Type'] = undefined;
                        return config;
                    },
                    responseError: function(rejection) {
                        $rootScope.$broadcast('request-fail');
                        $rootScope.$broadcast('notify-error', rejection);
                        return $q.reject(rejection);
                    },
                    response: function(config) {
                        $rootScope.$broadcast('request-end');
                        var deferred = $q.defer();
                        deferred.resolve(config);
                        // $rootScope.processingsymbol = false;
                        return deferred.promise;
                    }
                };
            }
        ]);
    angular.module('Kaakateeya').config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('errorInterceptor');
    }]);
}(window.app));

angular
    .module('Kaakateeya').config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
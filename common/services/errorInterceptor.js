(function(app) {
    'use strict';
    app.factory('errorInterceptor', ['$rootScope', '$q', function($rootScope, $q) {
        return {
            request: function(config) {
                $rootScope.$broadcast('request-start');
                config.headers = config.headers || {};
                // $rootScope.processingsymbol = true;
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

    }]);
    angular.module('Kaakateeya').config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('errorInterceptor');
    }]);
}(window.app));
app.service('route', ['$state', function($state) {
    this.go = function(stateName, param) {
        $state.go(stateName, param);
    };
}]);
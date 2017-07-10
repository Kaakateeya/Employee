(function() {

    angular
        .module('Kaakateeya')
        .service('paymentProperty', service);

    service.$inject = ['$http'];

    function service($http) {

        var payObj = { paymentHistryID: 0 };
        this.setData = setData;
        this.getData = getData;

        function setData(val) {
            payObj = { paymentHistryID: val };
        }

        function getData() {
            return payObj;
        }

    }
})();
 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .factory('updateMacAdressModel', factory)

     factory.$inject = ['updateMacAdressService', 'complex-grid-config'];

     function factory(updateMacAdressService, gridConfig) {

         var model = {};
         model = gridConfig;


         model.init = function() {
             model.columns = [
                 { text: 'SNO', key: 'sno', type: 'label' },
                 { text: 'Branch', key: 'BranchName', type: 'label' },
                 { text: 'IP Adress', key: 'MacAddressName', type: 'morelinks', templateUrl: model.ipaddr },
                 { text: '', key: '', type: 'customlink', templateUrl: model.optionTemplate, method: model.actionlink }
             ];
             var inObj = {
                 Religion: '',
                 BranchID: '',
                 Ipaddress: '',
                 flag: ''
             };
             updateMacAdressService.getmacIps(inObj).then(function(response) {
                 console.log(response);
                 model.data = response.data[0];
                 _.map(model.data, function(item, index) {
                     item.sno = index + 1;
                     item.optionType = 'label';
                     //  item.optionType = 'input';

                 });
             });
             return model;
         };
         model.ipaddr = function(row) {
             var str = row.optionType === 'label' ? '<label>' + row.MacAddressName + '</label>' : '<input  type="text" ng-model="row.MacAddressName" class="form-control">';
             return str;
         };

         model.optionTemplate = function(row) {
             var lblname = row.optionType === 'label' ? 'Update' : 'save';
             var str = '<a>' + lblname + '</a>';
             return str;
         };

         model.actionlink = function(row) {

             if (row.optionType === 'input') {
                 //  updateMacAdressService.UpdatemacIps().then(function() {



                 //  });
             }
             row.optionType = row.optionType === 'label' ? 'input' : 'label';

         };

         return model.init();

     }
 })();
 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .factory('updateMacAdressModel', factory)

     factory.$inject = ['updateMacAdressService', 'complex-grid-config', 'alert'];

     function factory(updateMacAdressService, gridConfig, alertss) {

         var model = {};
         model = gridConfig;
         model.scope = {};
         model.init = function() {
             model.columns = [
                 { text: 'SNO', key: 'sno', type: 'label' },
                 { text: 'Branch', key: 'BranchName', type: 'label' },
                 { text: 'IP Adress', key: 'MacAddressName', type: 'textbox', templateUrl: model.ipaddr, model: 'txtMac' },
                 { text: '', key: '', type: 'customlink', templateUrl: model.optionTemplate, method: model.actionlink }
             ];
             model.gridBind();
             return model;
         };

         model.gridBind = function() {
             var inObj = {
                 Religion: model.region,
                 BranchID: '',
                 Ipaddress: '',
                 flag: ''
             };
             updateMacAdressService.getmacIps(inObj).then(function(response) {
                 console.log(response);
                 model.sdata = response.data[0];
                 _.map(model.sdata, function(item, index) {
                     item.sno = index + 1;
                     item.optionType = 'label';
                     model['txtMac' + item.sno] = item.MacAddressName;
                 });
             });

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
             if (model.Admin === '1') {
                 if (row.optionType === 'input') {
                     var ipaddr = model['txtMac' + row.sno];
                     if (ipaddr) {
                         updateMacAdressService.UpdatemacIps(ipaddr, row.BranchID).then(function(response) {
                             console.log(response);
                             if (response.data && parseInt(response.data) === 1) {
                                 alertss.timeoutoldalerts(model.scope, 'alert-success', 'IP Address Updated Succesfully', 4500);
                             }
                         });
                         row.optionType = 'label';

                     } else {
                         alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter IP Address', 4500);
                     }
                 } else {
                     row.optionType = 'input';
                 }
             } else {
                 alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please contact Admin to update IP Adress', 4500);
             }
         };

         model.radioOnchange = function(val) {
             model.gridBind();
         };


         return model.init();

     }
 })();
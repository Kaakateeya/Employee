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
                 { text: 'IP Adress2', key: 'MacAddressName_1', type: 'textbox', templateUrl: model.ipaddr1, model: 'txtMacnew' },
                 { text: '', key: '', type: 'customlink', templateUrl: model.optionTemplate, method: model.actionlink }
                 //  { text: '', key: '', type: 'customlink', templateUrl: model.optionTemplate1, method: model.actionlink }
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
                 model.sdata = response.data[0];
                 _.map(model.sdata, function(item, index) {
                     item.sno = index + 1;
                     item.optionType = 'label';
                     item.optionType1 = 'label2';
                     model['txtMac' + item.sno] = item.MacAddressName;
                     model['txtMacnew' + item.sno] = item.MacAddressName_1;
                 });
             });

         };
         model.ipaddr = function(row) {
             var str = row.optionType === 'label' ? '<label>' + row.MacAddressName + '</label>' : '<input  type="text" ng-model="row.MacAddressName" class="form-control">';
             return str;
         };
         model.ipaddr1 = function(row) {
             var str = row.optionType1 === 'label1' ? '<label>' + row.MacAddressName_1 + '</label>' : '<input  type="text" ng-model="row.MacAddressName_1" class="form-control">';
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
                     var ipaddr1 = model['txtMacnew' + row.sno] !== "" && model['txtMacnew' + row.sno] !== null && model['txtMacnew' + row.sno] !== undefined ? model['txtMacnew' + row.sno] : "";
                     if (ipaddr) {
                         updateMacAdressService.UpdatemacIps(ipaddr, ipaddr1, row.BranchID).then(function(response) {
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
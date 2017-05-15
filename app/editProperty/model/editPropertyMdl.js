(function(angular) {
    'use strict';


    function factory(editPropertyService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.scope = {};

        //declaration part
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        model.propertyArr = [];
        model.proObj = {};

        var isSubmit = true;
        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        //end declaration block

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.pageload();

            return model;
        };

        model.pageload = function() {
            editPropertyService.getPropertyData(custID).then(function(response) {
                model.propertyArr = response.data;
                model.propertymodifiedby = (model.propertyArr.length > 0 && model.propertyArr[0].EmpLastModificationDate !== undefined && model.propertyArr[0].EmpLastModificationDate !== null) ? model.propertyArr[0].EmpLastModificationDate : '';
            });
        };

        model.populateProperty = function(item) {
            isSubmit = true;
            model.Custpropertyid = null;
            model.eventType = 'add';
            model.RefrenceCust_Reference_ID = null;
            model.popupdata = model.Refrence;
            model.popupHeader = 'Property Details';
            if (item !== undefined) {
                model.eventType = 'edit';
                model.Custpropertyid = item.Custpropertyid;
                model.ddlFamilyStatus = item.FamilyValuesID;
                model.rdlSharedProperty = item.SharedPropertyID === true ? 1 : 0;
                model.txtValueofproperty = item.PropertyValue;
                model.txtPropertydesc = item.PropertyDetails;
            }
            commonFactory.open('propertyContent.html', model.scope, uibModal);

        };


        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;
                inObj.GetDetails.PropertyType = '281';
                inObj.GetDetails.Custpropertyid = model.Custpropertyid;
                inObj.GetDetails.PropertyID = model.Custpropertyid;
                inObj.GetDetails.CustId = custID;
                model.submitPromise = editPropertyService.submitPropertyData(inObj).then(function(response) {
                    console.log(response);
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        editPropertyService.getPropertyData(custID).then(function(response) {
                            model.propertyArr = response.data;
                        });
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Property Details Submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Property Details Updation failed', 4500);
                    }
                });
            }

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };
        //performance code
        model.Refrence = [
            { lblname: 'Family Status', controlType: 'select', ngmodel: 'ddlFamilyStatus', typeofdata: 'familyStatus', parameterValue: 'FamilyStatus' },
            { lblname: 'Is shared property', controlType: 'radio', ngmodel: 'rdlSharedProperty', arrbind: 'boolType', parameterValue: 'Issharedproperty' },
            { lblname: 'Value of property', controlType: 'textboxNumber', maxLength: 5, span: true, spanText: 'Lakhs', ngmodel: 'txtFname', parameterValue: 'Valueofproperty' },
            {
                lblname: 'Property description',
                controlType: 'textarea',
                ngmodel: 'txtPropertydesc',
                parameterValue: 'Propertydescription'
            }

        ];
        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('editPropertyModel', factory);

    factory.$inject = ['editPropertyService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);
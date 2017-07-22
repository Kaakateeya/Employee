(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('emailbounceEntryformModel', ['emailbounceEntryformService', '$filter', 'alert',
            function(emailbounceEntryformService, filter, alerts) {
                var model = {};
                model.emailpattaren = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i;
                model.dateOptions = {
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-40:+5",
                    dateFormat: 'yy-mm-dd',
                    minDate: null,
                    maxDate: null
                };
                model.submitemailbouncesubmitform = function() {
                    var CurrentDate = new Date();
                    var obj = {
                        profileID: model.txtemailbounceprofileid !== "" && model.txtemailbounceprofileid !== null && model.txtemailbounceprofileid !== undefined ? model.txtemailbounceprofileid : null,
                        EmailID: model.txtemailbounceemailid !== "" && model.txtemailbounceemailid !== null && model.txtemailbounceemailid !== undefined ? model.txtemailbounceemailid : null,
                        CategoryID: model.ddlcategoryid !== "" && model.ddlcategoryid !== null && model.ddlcategoryid !== undefined && model.ddlcategoryid !== 0 ? parseInt(model.ddlcategoryid) : null,
                        Bounce_From_date: model.txtemailbouncedate !== "" && model.txtemailbouncedate !== null && model.txtemailbouncedate !== undefined ? filter('date')(model.txtemailbouncedate, 'yyyy-mm-dd hh:mm:ss') : null,
                        Email_Sent_From_Date: model.txtemailbouncesentdate !== "" && model.txtemailbouncesentdate !== null && model.txtemailbouncesentdate !== undefined ? filter('date')(model.txtemailbouncesentdate, 'yyyy-mm-dd hh:mm:ss') : null,
                        Narration_Date: filter('date')(CurrentDate, 'yyyy-mm-dd hh:mm:ss'),
                        Narration: model.txtemailbouncenarration !== "" && model.txtemailbouncenarration !== null && model.txtemailbouncenarration !== undefined ? model.txtemailbouncenarration : null,
                        EnteredbyEmpID: model.empid,
                        status: null
                    };
                    emailbounceEntryformService.InsertEmailBouceEntry(obj).then(function(response) {
                        console.log(response);
                    });
                };

                model.chkprofileidstatus = function() {
                    if (model.txtemailbounceprofileid !== "" && model.txtemailbounceprofileid !== null && model.txtemailbounceprofileid !== undefined) {
                        emailbounceEntryformService.getexistanceprofileornot(model.txtemailbounceprofileid).then(function(response) {
                            console.log(response);
                            if (parseInt(response.data) === 2) {

                            } else if (parseInt(response.data) === 3) {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'ProfileID does Not Exists', 3000);
                            }
                        });
                    }
                };
                model.resetemailbounce = function() {
                    model.clearcontrols();
                    model.scope.emailbounceentryform.$setPristine();
                    model.scope.emailbounceentryform.$setUntouched();
                };
                model.clearcontrols = function() {
                    model.txtemailbounceprofileid = "";
                    model.ddlcategoryid = undefined;
                    model.txtemailbounceemailid = "";
                    model.txtemailbouncedate = "";
                    model.txtemailbouncesentdate = "";
                    model.txtemailbouncenarration = "";
                };
                return model;
            }
        ]);
})();
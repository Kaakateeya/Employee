(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settleDeleteProfileModel', factory);

    factory.$inject = ['settleDeleteProfileService', 'SelectBindServiceApp', 'alert', 'authSvc'];

    function factory(settleDeleteProfileService, SelectBindServiceApp, alertss, authSvc) {
        return function() {
            var model = {};
            model.scope = {};
            var empid;
            model.dateOptions = {
                changeMonth: true,
                changeYear: true,
                yearRange: "-40:+5",
                dateFormat: 'dd-mm-yy'
            };

            model.init = function() {
                empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                return model;
            };

            model.SettleArray = [{
                    div: [
                        { name: 'Settled profile ID', controlType: 'textbox', ngModel: 'ProfileID', method: 'checkProfileID', param: 'from', required: true },
                        { name: 'Settled with profile', controlType: 'textbox', ngModel: 'settledWithProfileID', method: 'checkProfileID', param: 'to', required: true },
                        { name: 'Engagement date ', controlType: 'date', ngModel: 'engagementDate' },
                        { name: 'Marriage date', controlType: 'date', ngModel: 'marriageDate', required: true },
                        { name: 'Relationship name', controlType: 'select', ngModel: 'relationshipName' },
                        { name: 'Do You Want Send Mail', controlType: 'radio', ngModel: 'issendMail', Arrbind: 'sendmailArr' }

                    ]
                },
                {
                    div: [
                        { name: 'with profile owner', controlType: 'label', ngModel: 'toProfileOwner' },
                        { name: 'Engagement venue', controlType: 'textbox', ngModel: 'engageMentVenue' },
                        { name: 'Marriage venue', controlType: 'textbox', ngModel: 'marriagevenue' },
                        { name: 'Settled date', controlType: 'date', ngModel: 'settleDate' },
                        { name: 'Informed by', controlType: 'radio', ngModel: 'informedBy', Arrbind: 'informedByArr' }
                    ]
                }
            ];


            model.DeleteArray = [{
                    div: [
                        { name: 'Deleted profile ID', controlType: 'textbox', ngModel: 'ProfileID', method: 'checkProfileID', param: 'from', required: true },
                        { name: 'Engagement date', controlType: 'date', ngModel: 'engagementDate' },
                        { name: 'Marriage date', controlType: 'date', ngModel: 'marriageDate' },
                        { name: 'Surname', controlType: 'textbox', ngModel: 'surname' },
                        { name: 'Father name', controlType: 'textbox', ngModel: 'fathername' },
                        { name: 'Education', controlType: 'textbox', ngModel: 'education' },
                        { name: 'Reason for delete', controlType: 'radio', ngModel: 'reasnForDelete', Arrbind: 'reasonForDeleteArr' },
                        { name: 'Deletedby relation', controlType: 'select', ngModel: 'deletedbyRelation' },
                        { name: 'Do You Want Send Mail', controlType: 'radio', ngModel: 'issendMail', Arrbind: 'sendmailArr' }
                    ]
                },
                {
                    div: [
                        { name: 'Engagement venue', controlType: 'textbox', ngModel: 'engagementVenue' },
                        { name: 'Marriage venue', controlType: 'textbox', ngModel: 'marriageVenue' },
                        { name: 'Name', controlType: 'textbox', ngModel: 'name' },
                        { name: 'Native', controlType: 'textbox', ngModel: 'native' },
                        { name: 'Profession', controlType: 'textbox', ngModel: 'profession' },
                        { name: 'Name Of the relation', controlType: 'textbox', ngModel: 'nameOfTherelation', readonly: true },
                        { name: 'Settled date', controlType: 'date', ngModel: 'settleDate' }
                    ]
                }
            ];

            model.sendmailArr = [
                { label: 'Yes', value: 1 },
                { label: 'No', value: 2 }
            ];

            model.informedByArr = [
                { label: 'BrideSide', value: 0 },
                { label: 'GroomSide', value: 1 }
            ];

            model.reasonForDeleteArr = [
                { label: 'Married', value: 0 },
                { label: 'MarriageFixed', value: 1 },
                { label: 'Other Reasons', value: 2 }
            ];

            model.changeDiv = function(val) {
                model.mainArray = [];
                model.mainArray = val === '0' ? model.SettleArray : model.DeleteArray;
                model.reset();
            };

            model.alertmsg = function(msg) {
                if (model.typeofID === 'from')
                    model.ProfileID = '';
                else
                    model.settledWithProfileID = '';
                alertss.timeoutoldalerts(model.scope, 'alert-danger', msg, 4500);

            };

            model.checkProfileID = function(type) {
                model.typeofID = type;
                if (model.ProfileID && model.ProfileID === model.settledWithProfileID) {
                    model.alertmsg('Sorry Same profile ID Given');
                    return false;
                }

                var profileID = type === 'from' ? model.ProfileID : model.settledWithProfileID;

                if (profileID) {
                    settleDeleteProfileService.checkProfileStatus(profileID).then(function(response) {
                        if (response.data) {

                            switch (response.data.m_Item1) {
                                case 0:

                                    if (response.data.m_Item2 === 1) {
                                        SelectBindServiceApp.getRelationName(7, profileID, '').then(function(res) {
                                            if (res.data) {
                                                if (type === 'from') {
                                                    model.fromProfileOwner = res.data[0][0].ProfileOwnerName;
                                                    model.fromprofileOwnerId = res.data[0][0].ProfileOwnerEmpID;
                                                    model.fromGenderID = res.data[0][0].GenderID;
                                                    model.fromCustID = res.data[0][0].Cust_ID;
                                                    model.fromticketID = res.data[0][0].EmpTicketID;
                                                    model.fromEmpNumber = res.data[0][0].OfficialContactNumber;
                                                } else {
                                                    model.toProfileOwner = res.data[0][0].ProfileOwnerName;
                                                    model.toprofileOwnerId = res.data[0][0].ProfileOwnerEmpID;
                                                    model.toGenderID = res.data[0][0].GenderID;
                                                    model.toCustID = res.data[0][0].Cust_ID;
                                                    model.toticketID = res.data[0][0].EmpTicketID;
                                                    model.toEmpNumber = res.data[0][0].OfficialContactNumber;
                                                    if (model.fromGenderID === model.toGenderID) {
                                                        model.toProfileOwner = 'Owner Name';
                                                        model.alertmsg('Sorry Same Gender');
                                                    }

                                                }
                                            }
                                        });

                                    } else if (response.data.m_Item2 === 2) {
                                        model.alertmsg('The given profile  Does Not Contain Primary Email');
                                    }

                                    break;
                                case 1:
                                    model.alertmsg('The given profile is not active status');
                                    break;
                                case 2:
                                    model.alertmsg('The given profile is not Reviewed');

                                    break;
                                case 3:
                                    model.alertmsg('Invalid profile ID');

                                    break;
                                case 4:
                                    model.alertmsg(profileID + ' profile is not yet allotted to any Employee');

                                    break;
                                case 5:
                                    model.alertmsg('The given profile has been settled');

                                    break;
                                case 6:
                                    model.alertmsg('The given profile has been deleted');

                                    break;
                                case 7:
                                    model.alertmsg('The given profile is waiting for settled');

                                    break;
                                case 8:
                                    model.alertmsg('The given profile is waiting for deleted');

                                    break;
                                case 9:
                                    model.alertmsg('The given profile is in match meeting serious');

                                    break;
                            }



                        }
                    });
                }

            };


            model.RelationshipChange = function(RelationshipID) {
                SelectBindServiceApp.getRelationName(3, model.ProfileID, RelationshipID).then(function(response) {
                    if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                        model.nameOfTherelation = response.data[0][0].NAME;
                    }
                });
            };


            model.convertToDate = function(val) {
                if (val)
                    return moment(val).format('MM/DD/YYYY HH:MM:SS');
            };


            model.settleSubmit = function() {

                if (!model.ProfileID)
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Settled Profile ID', 4500);
                else if (!model.settledWithProfileID)
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Settled with Profile ID', 4500);
                else if (!model.marriageDate)
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Marriage Date', 4500);

                var GroomCustID, GroomEmpID, BrideCustID, BrideEmpID;


                if (model.fromGenderID === 1) {
                    GroomCustID = model.fromCustID;
                    GroomEmpID = model.fromprofileOwnerId;
                    BrideCustID = model.toCustID;
                    BrideEmpID = model.toprofileOwnerId;
                } else {
                    GroomCustID = model.toCustID;
                    GroomEmpID = model.toprofileOwnerId;
                    BrideCustID = model.fromCustID;
                    BrideEmpID = model.fromprofileOwnerId;
                }

                var obj = {
                    GroomCustID: GroomCustID ? GroomCustID : null,
                    GroomEmpID: GroomEmpID ? GroomEmpID : null,
                    BrideCustID: BrideCustID ? BrideCustID : null,
                    BrideEmpID: BrideEmpID ? BrideEmpID : null,
                    Engagementdate: model.convertToDate(model.engagementDate),
                    EngagementVenue: model.engageMentVenue,
                    Marriagedate: model.convertToDate(model.marriageDate),
                    MarriageVenue: model.marriagevenue,
                    InformedBySide: model.informedBy,
                    InformedBy: model.relationshipName,
                    Narriation: model.narration,
                    EmpID: empid,
                    AuthorizeStatus: 0,
                    SendMailfornew: model.issendMail,
                    Settleddate: model.convertToDate(model.settleDate),
                    smslist: [{ empname: model.fromProfileOwner, number: model.fromEmpNumber, ticketId: model.fromticketID },
                        { empname: model.toProfileOwner, number: model.toEmpNumber, ticketId: model.toticketID }
                    ]
                };


                settleDeleteProfileService.settleSubmit(obj).then(function(response) {
                    if (response.data && parseInt(response.data) === 1) {
                        model.reset();
                        model.scope.settledDeleteForm.$setPristine();
                        model.scope.settledDeleteForm.$setUntouched();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Settled submitted Successfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Settled submission Failed', 4500);
                    }

                });

            };

            model.deleteSubmit = function() {
                if (!model.ProfileID)
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Deleted Profile ID', 4500);

                var obj = {
                    Int64ProfileID: model.fromCustID,
                    SendMail: null,
                    Engagementdate: model.convertToDate(model.engagementDate),
                    EngagementVenue: model.engagementVenue,
                    Marriagedate: model.convertToDate(model.marriageDate),
                    MarriageVenue: model.marriageVenue,
                    DelSurname: model.surname,
                    DelName1: model.name,
                    DelFatherName: model.fathername,
                    DelNative: model.native,
                    DelEducation: model.education,
                    DelProfession: model.profession,
                    DelReasonForDelete: model.reasnForDelete,
                    DelRelationship: model.deletedbyRelation,
                    DelRelationshipName: model.nameOfTherelation,
                    Narriation: model.narration,
                    EmpID: empid,
                    AuthorizeStatus: 0,
                    SendMailfornew: model.issendMail,
                    smslist: [{ empname: model.fromProfileOwner, number: '8985201371', ticketId: model.fromticketID }]
                };
                //model.fromEmpNumber
                settleDeleteProfileService.deleteSubmit(obj).then(function(response) {
                    if (response.data && parseInt(response.data) === 1) {
                        model.reset();
                        model.scope.settledDeleteForm.$setPristine();
                        model.scope.settledDeleteForm.$setUntouched();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Profile deleted Successfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Deleted submitted Failed', 4500);
                    }
                });
            };

            model.submit = function() {
                if (model.settleType === '0') {
                    model.settleSubmit();
                } else {
                    model.deleteSubmit();
                }
            };

            model.reset = function() {

                if (model.settleType === '0') {
                    _.map(model.SettleArray, function(item) {
                        _.map(item.div, function(inneritem) {
                            model[inneritem.ngModel] = undefined;
                        });
                    });
                } else {
                    _.map(model.DeleteArray, function(item) {
                        _.map(item.div, function(inneritem) {
                            model[inneritem.ngModel] = undefined;
                        });
                    });
                }
                model.issendMail = 2;
                model.fromProfileOwner = model.toProfileOwner = 'Owner name';
                model.relationshipName = model.deletedbyRelation = '';
                model.narration = '';
            };

            return model.init();
        };
    }
})();
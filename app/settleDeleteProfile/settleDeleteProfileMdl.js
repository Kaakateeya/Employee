(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settleDeleteProfileModel', factory);

    factory.$inject = ['settleDeleteProfileService', 'SelectBindServiceApp'];

    function factory(settleDeleteProfileService, SelectBindServiceApp) {
        return function() {
            var model = {};

            model.dateOptions = {
                changeMonth: true,
                changeYear: true,
                yearRange: "-40:+5",
                dateFormat: 'dd-mm-yy'
            };

            model.SettleArray = [{
                    div: [
                        { name: 'Settled profile ID', controlType: 'textbox', ngModel: 'settleProfileID', method: 'ProfileID' },
                        { name: 'Settled with profile', controlType: 'textbox', ngModel: 'settledWithProfileID' },
                        { name: 'Engagement date ', controlType: 'date', ngModel: 'engagementDate' },
                        { name: 'Marriage date', controlType: 'date', ngModel: 'marriageDate' },
                        { name: 'Relationship name', controlType: 'select', ngModel: 'relationshipName' },
                        { name: 'Do You Want Send Mail', controlType: 'radio', ngModel: 'issendMail', Arrbind: 'sendmailArr' }

                    ]
                },
                {
                    div: [
                        { name: 'with profile owner', controlType: 'label', ngModel: 'withProfileOwner' },
                        { name: 'Engagement venue', controlType: 'textbox', ngModel: 'engageMentdate' },
                        { name: 'Marriage venue', controlType: 'textbox', ngModel: 'marriagevenue' },
                        { name: 'Settled date', controlType: 'date', ngModel: 'settleDate' },
                        { name: 'Informed by', controlType: 'radio', ngModel: 'informedBy', Arrbind: 'informedByArr' }
                    ]
                }
            ];


            model.DeleteArray = [{
                    div: [
                        { name: 'Deleted profile ID', controlType: 'textbox', ngModel: 'ProfileID' },
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
                        { name: 'Name Of the relation', controlType: 'textbox', ngModel: 'nameOfTherelation' },
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
            };



            model.checkProfileID = function() {

                settleDeleteProfileService.checkProfileStatus(model.ProfileID).then(function(response) {



                });

            };























            return model;
        };
    }
})();
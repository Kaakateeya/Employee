(function() {
    'use strict';

    function factory($http) {
        var model = {};
        model.arraydata = [];
        model.init = function() {
            model.setSlides = function(data) {
                model.slides = [];
                model.slides = data;
                model.slides = model.displayArray(model.slides, 1);
            };
            model.addSlides = function(data) {
                data = model.displayArray(data, 10);
                $.merge(model.slides, data);
            };
            model.displayArray = function(arr, frompage) {
                model.headervisileble = true;
                if (model.pagename === 'matchfollowup') {
                    model.headervisileble = false;
                }
                $.each(arr, function(index, item) {
                    model.data = [];
                    model.data.push({
                        label: 'ProfileID',
                        value: '',
                        ProfileID: item.ProfileID,
                        KMPLID: item.KMPLID,
                        paid: item.paid,
                        IsConfidential: item.IsConfidential,
                        SuperConfidentila: item.SuperConfidentila,
                        HoroscopeStatus: item.HoroscopeStatus
                    });
                    model.data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                    model.data.push({ label: 'DOB(age)', value: item.DOB + '(' + item.Age + ')' });
                    model.data.push({ label: 'Height', value: item.Height });
                    model.data.push({ label: 'Time of Birth', value: item.TOB });
                    model.data.push({ label: 'Place of Birth', value: item.PlaceOfBirth });
                    model.data.push({ label: 'Gothram', value: item.Gothram });
                    model.data.push({ label: 'Caste', value: item.Caste });
                    model.data.push({ label: 'Marital Status', value: item.maritalstatus || item.MaritalStatusID });
                    model.data.push({ label: 'Star', value: item.Star });
                    model.data.push({ label: 'Qualification', value: item.EducationGroup + "," + item.EduGroupnamenew });
                    model.data.push({ label: 'Profession', value: item.Profession });
                    model.data.push({ label: 'Job Location', value: item.JobLocation });
                    model.data.push({ label: 'Income(P.M)', value: item.Income });
                    model.data.push({ label: 'Father Native', value: item.FFNative });
                    model.data.push({ label: 'Mother Native', value: item.MFNative });
                    model.data.push({ label: 'Property(Lakhs)', value: item.Property });
                    model.data.push({
                        label: 'backendFields',
                        Custid: item.Cust_ID,
                        ProfileID: item.ProfileID,
                        PhotoCount: item.PhotoCount,
                        Age: item.Age,
                        HeightInCentimeters: item.HeightInCentimeters,
                        MaritalStatusID: item.MaritalStatusID,
                        CasteID: item.CasteID,
                        serviceDate: item.serviceDate,
                        CustPhoto: item.CustomerFullPhoto,
                        totalrecords: item.TotalRowsKeyword
                    });
                    if (item.serviceDate != "--" && item.serviceDate !== "" && item.serviceDate !== null)
                        model.data.push({ label: 'ServiceDate', value: item.serviceDate, style: 'style= color:red;' });
                    if (item.Intercaste == "True")
                        model.data.push({ label: 'Intercaste', value: (item.fathercaste + "/" + item.mothercaste) });
                    if (item.ProfileGrade !== 0)
                        model.data.push({ label: 'ProfileGrade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                    model.arraydata.push({
                        itmArr: model.data,
                        custPhoto: item.CustomerFullPhoto,
                        Custid: item.Cust_ID,
                        Tickid: item.TicketID,
                        PhotoCount: item.PhotoCount,
                        Mystatus: item.Mystatus,
                        OppStatus: item.OppStatus,
                        FromTicketIdSuf: item.FromTicketIdSuf,
                        ToTicketIDSuf: item.ToTicketIDSuf,
                        FromTicketID: item.FromTicketID,
                        ToTicketID: item.ToTicketID,
                        Cust_ProfileInterestsLog_ID: item.Cust_ProfileInterestsLog_ID
                    });
                });
                return model.arraydata;
            };
            return model;
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('complex-slide-config', factory);

    factory.$inject = ['$http'];
})();
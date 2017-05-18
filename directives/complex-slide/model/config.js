(function() {
    'use strict';

    function factory($http) {
        var model = {};
        model.arraydata = [];
        model.isshortlistprogressbar = false;
        model.currentrecord = 0;
        model.init = function() {
            model.setSlides = function(data, topage, typeofpage) {
                model.slides = [];
                if (typeofpage === 'normal') {
                    model.slides = data;
                } else if (typeofpage === 'myprofile') {
                    model.displayArray(data, topage, "myprofile");
                } else {
                    model.displayArray(data, topage, typeofpage);
                }
            };
            model.addSlides = function(data, arrayslide, topage, typeofpage) {
                if (typeofpage === 'normal') {
                    model.slides = $.merge(model.slides, data);
                } else if (typeofpage === 'myprofile') {
                    model.displayArray(data, topage, "myprofile");
                } else {
                    model.displayArray(data, 11, typeofpage);
                }
            };
            model.backtosearchpage = function() {
                model.divcontrolls = true;
                model.headervisileble = false;
                model.gridTableshow = false;
            };
            model.displayArray = function(arr, topage, typebind) {
                model.headervisileble = true;
                if (topage === parseInt(10)) {
                    model.slides = [];
                }
                if (typebind === "myprofile") {
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
                            HoroscopeStatus: item.HoroscopeStatus,
                            HoroscopeImage: item.HoroScopeImage
                        });
                        model.data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                        model.data.push({ label: 'Caste', value: item.mothertongue + "-" + item.Caste });
                        model.data.push({ label: 'Dor', value: item.RegistrationDate });
                        model.data.push({ label: 'Profile Grade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                        model.slides.push({
                            itmArr: model.data,
                            custPhoto: item.Photo,
                            Custid: item.Cust_ID,
                            lastlogin: item.LastLoginDate,
                            logincount: item.LoginCount,
                            matkteingticket: item.TicketID,
                            matchmarktingcount: item.MatchMeetingCount,
                            ownername: item.ProfileOwnername,
                            branch: item.KMPLID,
                            reg: item.RegistrationDate,
                            SAForm: item.SAForm,
                            primarynumber: item.Primarynumber,
                            primaryemail: item.Primaryemail,
                            CreatedDate: item.CreatedDate,
                            SRCount: item.SRCount,
                            PaidAmount: item.PaidAmount,
                            ExpiryDate: item.ExpiryDate,
                            Points: item.Points,
                            mobilestatus: item.CNumberVerStatus,
                            emailstatus: item.CEmailVerStatus,
                            UserName: item.EmpUserName,
                            Reason4InActive: item.Reason4InActive,
                            ProfileID: item.ProfileID,
                            CountryCodeID: item.CountryCodeID,
                            Cust_Family_ID: item.Cust_Family_ID,
                            PhotoCount: item.PhotoCount,
                            Age: item.Age,
                            HeightInCentimeters: item.HeightInCentimeters,
                            MaritalStatusID: item.MaritalStatusID,
                            CasteID: item.CasteID,
                            serviceDate: item.serviceDate,
                            bouncedEmailID: item.EmailID,
                            bouncedemailentryid: item.Cust_EmailBounceEntryId,
                            Cust_NotificationID: item.Cust_NotificationID,
                            CategoryID: item.CategoryID,
                            ActionType: item.ActionType,
                            ReadStatus: item.ReadStatus,
                            Tickets: item.Tickets,
                            TicketID: item.TicketID,
                            onlinepaidcls: item.onlinepaidcls,
                            onlinepaid: item.onlinepaid,
                            offlinepaidcls: item.offlinepaidcls,
                            offlinepaid: item.offlinepaid,
                            educationspecialisation: item.educationspecialisation,
                            currency: item.currency,
                            countrylivingin: item.countrylivingin,
                            UploadedPhotoscount: item.UploadedPhotoscount,
                            TOB: item.TOB,
                            SubCaste: item.SubCaste,
                            Star: item.Star,
                            Profession: item.Profession,
                            PlaceOfBirth: item.PlaceOfBirth,
                            MFNative: item.MFNative

                        });
                    });
                } else {
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
                            HoroscopeStatus: item.HoroscopeStatus,
                            HoroscopePath: item.HoroscopePath
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
                        if (typebind === 'regvali') {
                            model.data.push({ label: 'Color', value: item.Color });
                        }
                        model.data.push({ label: 'Qualification', value: item.EducationGroup + "," + item.EduGroupnamenew });
                        model.data.push({ label: 'Profession', value: item.Profession });
                        model.data.push({ label: 'Job Location', value: item.JobLocation });
                        model.data.push({ label: 'Income(P.M)', value: item.Income !== null && item.Income !== "" ? item.currency + " " + item.Income : "--" });
                        model.data.push({ label: 'Father Native', value: item.FFNative });
                        model.data.push({ label: 'Mother Native', value: item.MFNative });
                        model.data.push({ label: 'Property(Lakhs)', value: item.Property });
                        if (item.serviceDate != "--" && item.serviceDate !== "" && item.serviceDate !== null && typebind !== 'regvali')
                            model.data.push({ label: 'ServiceDate', value: item.serviceDate, style: 'color:red;' });
                        if (item.Intercaste == "True")
                            model.data.push({ label: 'Intercaste', value: (item.fathercaste + "/" + item.mothercaste) });
                        // if (item.ProfileGrade !== 0)
                        //     model.data.push({ label: 'ProfileGrade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                        model.slides.push({
                            itmArr: model.data,
                            custPhoto: item.CustomerFullPhoto || item.Photo,
                            Custid: item.Cust_ID,
                            Tickid: item.TicketID,
                            PhotoCount: item.PhotoCount,
                            Mystatus: item.Mystatus,
                            OppStatus: item.OppStatus,
                            FromTicketIdSuf: item.FromTicketIdSuf,
                            ToTicketIDSuf: item.ToTicketIDSuf,
                            FromTicketID: item.FromTicketID,
                            ToTicketID: item.ToTicketID,
                            Cust_ProfileInterestsLog_ID: item.Cust_ProfileInterestsLog_ID,
                            Age: item.Age,
                            HeightInCentimeters: item.HeightInCentimeters,
                            MaritalStatusID: item.MaritalStatusID,
                            CasteID: item.CasteID,
                            serviceDate: item.serviceDate,
                            ProfileID: item.ProfileID,
                            HoroscopePath: item.HoroscopePath,
                            FTicketStatus: item.FTicketStatus,
                            TTicketStatus: item.TTicketStatus
                        });
                    });
                }
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
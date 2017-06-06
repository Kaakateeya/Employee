(function() {
    'use strict';



    function factory($http, serviceSlideShowService, slideconfig, helpService, alerts, modelpopupopenmethod) {
        var model = {};
        model = slideconfig;
        model.getstatus = function(val) {
            var oppositestatus = "";
            switch (val) {
                case 'I':
                    oppositestatus = 'Proceed';
                    break;
                case 'NI':
                    oppositestatus = 'Dont Proceed';
                    break;
                case 'V':
                    oppositestatus = 'Viewed';
                    break;
                case 'NV':
                    oppositestatus = 'Not Viewed';
                    break;
            }
            return oppositestatus;
        };
        model.displayArrayprofile = function(arr, topage) {
            model.headervisileble = true;
            var array = [];
            _.each(arr, function(item) {
                var data = [];
                data.push({
                    label: 'ProfileID',
                    value: '',
                    ProfileID: item.Toprofileid,
                    KMPLID: item.KMPLID,
                    paid: item.PaidStatus,
                    IsConfidential: item.IsConfidential,
                    SuperConfidentila: item.SuperConfidentila,
                    HoroscopeStatus: item.HoroscopeStatus,
                    HoroscopePath: item.HoroscopePath
                });
                data.push({ label: 'Name', value: item.ToName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                data.push({ label: 'DOB(age)', value: item.DOB });
                data.push({ label: 'Height', value: item.Height });
                data.push({ label: 'Time of Birth', value: item.ToB });
                data.push({ label: 'Place of Birth', value: item.PlaceOfBirth });
                data.push({ label: 'Gothram', value: item.Gothram });
                data.push({ label: 'Caste', value: item.Caste });
                data.push({ label: 'Marital Status', value: item.maritalstatus });
                data.push({ label: 'Star', value: item.Star });
                data.push({ label: 'Qualification', value: item.EducationGroup + "," + item.EduGroupnamenew });
                data.push({ label: 'Profession', value: item.Profession });
                data.push({ label: 'Job Location', value: item.JobLocation });
                data.push({ label: 'Income(P.M)', value: item.Income });
                data.push({ label: 'Father Native', value: item.FFNative });
                data.push({ label: 'Mother Native', value: item.MFNative });
                data.push({ label: 'Property(Lakhs)', value: item.Property !== null ? item.Property : "--" });
                if (item.serviceDate != "--" && item.serviceDate !== "" && item.ServiceDate !== null)
                    data.push({ label: 'ServiceDate', value: item.ServiceDate, style: 'color:red;' });
                if (item.Intercaste == "True")
                    data.push({ label: 'Intercaste', value: (item.fathercaste + "/" + item.mothercaste) });
                array.push({
                    itmArr: data,
                    custPhoto: (item.ToApplicationPhoto).replace("~/", "../../"),
                    Custid: item.tocustid,
                    Tickid: item.TicketID,
                    PhotoCount: item.PhotoCountnew,
                    Mystatus: item.Mystatus,
                    OppStatus: item.OppStatus,
                    Cust_ProfileInterestsLog_ID: item.Cust_ProfileInterestsLog_ID,
                    Age: item.Age,
                    HeightInCentimeters: item.HeightInCentimeters,
                    MaritalStatusID: item.MaritalStatusID,
                    CasteID: item.CasteID,
                    serviceDate: item.serviceDate,
                    ProfileID: item.Toprofileid,
                    HoroscopePath: item.HoroscopePath,
                    fromticketid: item.fromticketid,
                    FromticketStatusID: item.FROMNEW,
                    fromTicket: item.FromTicket,
                    Logid: item.Logid,
                    Fromcustintstatus: item.FromCust_InterestStatus,
                    Toticketid: item.Toticketid,
                    ToTicket: item.ToTicket,
                    TONEW: item.TONEW,
                    ToCust_InterestStatus: item.ToCust_InterestStatus,
                    ISRvrSend: item.ISRvrSend,
                    fromstatusformticket: model.getstatus($.trim(item.FromCust_InterestStatus)),
                    tostatusforticket: model.getstatus($.trim(item.ToCust_InterestStatus)),
                    fromcust_id: item.fromcust_id
                });
            });
            return array;
        };
        model.Intetestflag = function(flag) {
            switch (flag) {
                case '0':
                    model.fromIntetestflag = null;
                    model.toIntetestflag = null;
                    break;
                case '1':
                    model.fromIntetestflag = 'I';
                    model.toIntetestflag = null;
                    break;
                case '2':
                    model.fromIntetestflag = 'NI';
                    model.toIntetestflag = null;
                    break;
                case '3':
                    model.fromIntetestflag = 'V';
                    model.toIntetestflag = null;
                    break;
                case '4':
                    model.fromIntetestflag = 'NV';
                    model.toIntetestflag = null;
                    break;
                case '5':
                    model.fromIntetestflag = 'I';
                    model.toIntetestflag = 'I';
                    break;
                case '6':
                    model.fromIntetestflag = null;
                    model.toIntetestflag = 'I';
                    break;
            }
        };
        model.serviceslideshowsubmit = function(profileid, frompage, topage) {
            model.Intetestflag(model.typeofbind);
            model.topage = topage;
            var obj = {
                v_profileid: profileid,
                i_empid: parseInt(model.empid),
                c_intersttype: model.fromIntetestflag,
                c_oppintersttype: model.toIntetestflag,
                pagefrom: frompage,
                pageto: topage
            };
            serviceSlideShowService.getServiceSlideshowdata(obj).then(function(response) {
                console.log(response.data);
                if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                    model.serviceslideshowarray = [];
                    _.each(response.data[0].BothsideInterest, function(item) {
                        model.serviceslideshowarray.push(item);
                    });
                    if (parseInt(frompage) === 1) {
                        model.datapersonal = true;
                        model.slides = [];
                        model.servicepersonalarray = response.data[1].BothsideInterest;
                    }
                    if (parseInt(frompage) === 1) {
                        model.totalRecords = parseInt(frompage) === 1 && response !== undefined && response.data !== undefined && model.serviceslideshowarray.length > 0 ? model.serviceslideshowarray[0].TotalRows : 0;
                        model.setSlides(model.displayArrayprofile(model.serviceslideshowarray, 10), 10, 'normal');
                    } else {
                        model.addSlides(model.displayArrayprofile(model.serviceslideshowarray, 11), model.serviceslideshowarray, 11, 'normal');
                    }
                }
            });
        };
        model.slidebind = function(old, news, array) {
            if (parseInt(model.topage) - parseInt(news) === 4) {
                model.serviceslideshowsubmit(model.viewsettlementprofileid, (model.topage) + 1, (model.topage) + 10);
            }
        };
        model.ViewProfilewithvalueredirect = function(profileid) {
            window.open("Viewfullprofile/" + profileid + '/0', "_blank");
        };
        model.acceptlink = function(slide, status) {
            if (slide.isProceed) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'You have already proceeded this profile', 3000);
            } else if (slide.isSkipped) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'You have already skipped this profile', 3000);
            } else {
                if (status === "NI") {
                    helpService.acceptrejectexpressinterest(slide.fromcust_id, slide.Custid, slide.Logid, status, parseInt(model.empid)).then(function(response) {
                        if (response.data === parseInt(1)) {
                            slide.isSkipped = true;
                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'Skipped successfully', 4000);
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Skipped fail', 4000);
                        }
                    });
                } else if (status === "I") {
                    if (model.servicepersonalarray[0].paid === "Paid") {
                        helpService.acceptrejectexpressinterest(slide.fromcust_id, slide.Custid, slide.Logid, status, parseInt(model.empid)).then(function(response) {
                            if (response.data === parseInt(1)) {
                                slide.isProceed = true;
                                alerts.timeoutoldalerts(model.scope, 'alert-success', 'Proceed successfully', 4000);
                            } else {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Proceed fail', 4000);
                            }
                        });
                    } else {
                        serviceSlideShowService.getInsertUnpaidStatus(slide.fromcust_id, slide.Custid, parseInt(model.empid), 'proceed').then(function(response) {
                            console.log(response.data);
                        });
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please Upgrade online membership', 4000);
                    }
                }
            }
        };
        model.ResendMail = function(slide) {
            var Mobj = {
                Notes: 'mail sent',
                EMPID: parseInt(model.empid),
                LFromCustID: slide.Custid,
                LToCustID: slide.fromcust_id,
                FromProfileID: slide.ProfileID,
                ToProfileID: model.servicepersonalarray[0].FromProfileid,
                TicketStatusID: "NotViewed",
                Subject: "Kaakateeya Email For Bothsideinterest"
            };
            helpService.ResendMail(Mobj).then(function(response) {
                console.log(response.data);
                if (response.data === parseInt(1)) {
                    alerts.timeoutoldalerts(model.scope, 'alert-success', 'Mail sent succesfully', 4000);
                } else {
                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Mail sending failed', 4000);
                }
            });
        };

        model.clickticketupdate = function(ticketid, TicketStatusID) {
            model.marketingTicket = ticketid;
            model.TicketStatusID = TicketStatusID;
            modelpopupopenmethod.showPopupphotopoup('matchfollowup.html', model.scope, 'md', "modalclassdashboardphotopopup");
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('serviceSlideShowModel', factory);

    factory.$inject = ['$http', 'serviceSlideShowService', 'complex-slide-config', 'helperservice', 'alert', 'modelpopupopenmethod'];
})();
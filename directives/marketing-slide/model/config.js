(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('marketticketHistrymdl', factory);
    factory.$inject = ['SelectBindServiceApp', 'authSvc', 'marketingTicketHistryservice', 'alert', 'modelpopupopenmethod', 'arrayConstants', '$timeout', '$filter', 'SelectBindServiceApp', 'helperservice'];

    function factory(bindservice, authSvc, marketsvc, alertss, commonpage, arrayConstants, timeout, $filter, SelectBindServiceApp, helperservice) {
        var model = {};
        model.MAobj = {};
        model.ticketid = '';
        model.marReplyArr = [];
        model.marInfo = [];
        model.marHistry = [];
        model.ProfileID = '';
        model.scope = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'dd-mm-yy'
        };
        model.init = function() {
            model.onlyempnames = [];
            model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            timeout(function() {
                model.marketReplytype();
            }, 500);
            return model;
        };
        model.RelationshipChange = function(RelationshipID, type) {
            bindservice.getRelationName(3, model.ProfileID, RelationshipID).then(function(response) {
                if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                    model.MAobj.txtmrktRelationnameIn = response.data[0][0].NAME;
                    model.MAobj.txtmrktRelationnameout = response.data[0][0].NAME;
                } else {
                    model.MAobj.txtmrktRelationnameIn = '';
                    model.MAobj.txtmrktRelationnameout = '';
                }
            });
        };
        model.getMrktSlideInfo = function(ticketid) {
            model.ticketid = ticketid;
            marketsvc.getmarSlide(ticketid, 'I').then(function(respnse) {
                model.marInfo = [];
                model.marHistry = [];
                if (respnse.data !== undefined && respnse.data !== null && respnse.data.length > 0) {
                    model.marInfo = respnse.data;
                    model.ProfileID = (model.marInfo)[0].ProfileID;
                    model.MAobj.txtmrktCalltelephonenumberIn = model.MAobj.txtmrktCalltelephonenumberout = (model.marInfo)[0].PrimaryContactNumber !== "--" ? (model.marInfo)[0].PrimaryContactNumber : null;
                    marketsvc.getmarSlide(ticketid, 'H').then(function(innrespnse) {
                        model.marHistry = innrespnse.data;
                        _.map(model.marHistry, function(item) {
                            item.ReplyDatenew = moment(item.ReplyDatenew).format('DD-MMM-YYYY h:mm:ss');
                        });
                    });
                    timeout(function() {
                        model.RelationshipChange(39, 'In');
                    }, 500);
                }
            });
        };
        model.marketReplytype = function() {
            bindservice.marketReplytype().then(function(response) {
                if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                    model.marReplyArr.push({ "label": "--Select--", "title": "--Select--", "value": "", "text": "" });
                    _.each(response.data[0], function(item) {
                        model.marReplyArr.push({ "label": item.Heder, "title": item.Heder, "value": item.ID, "text": item.TEXT });
                    });
                }
            });
        };
        model.getemployee = function(flag, id) {
            bindservice.onlyEmpNames(flag, id).then(function(response) {
                model.onlyempnames = [];
                if (_.isArray(response.data) && response.data.length > 0) {
                    model.onlyempnames.push({ "label": "--select--", "title": "--select--", "value": "" });
                    _.each(response.data, function(item) {
                        model.onlyempnames.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    });
                }
            });
        };
        model.mailchange = function(val) {
            return _.where(model.marReplyArr, { value: parseInt(val) })[0].text;
        };
        model.inOutSubmit = function(obj) {
            var curdate = moment().format('DD-MMM-YYYY h:mm:ss');
            //22-Apr-2017 18:32:39'
            var inputObj = {
                CallType: obj.CallType,
                Calledon: curdate,
                RelationID: obj.RelationID,
                RelationName: obj.RelationName,
                CallResult: obj.CallResult,
                StaffCalled: model.empid,
                PhoneNum: obj.PhoneNum,
                CallDiscussion: obj.CallDiscussion,
                DisplayStatus: obj.DisplayStatus,
                ticketid: model.ticketid,
                EmpID: model.empid
            };
            marketsvc.InOutSubmit(inputObj).then(function(response) {
                commonpage.closepopuppoptopopup();
                var msg = parseInt(response.data) === 1 ? (obj.CallType === 1 ? 'Incoming Call Created successfully' : 'Outgoing Call Created successfully') :
                    ((obj.CallType === 1 ? 'Incoming Call updation failed' : 'Outgoing Call updation failed'));
                var msgClass = parseInt(response.data) === 1 ? 'alert-success' : 'alert-danger';
                alertss.timeoutoldalerts(model.scope, msgClass, msg, 9500);
            });
        };
        model.incallSubmit = function(obj, type) {
            var inobj = {
                CallType: 1,
                RelationID: obj.ddlmrktreceivedIn,
                RelationName: obj.txtmrktRelationnameIn,
                CallResult: obj.ddlmrktCallresultIn,
                PhoneNum: obj.txtmrktCalltelephonenumberIn,
                CallDiscussion: obj.txtmrktCalldiscussionin,
                DisplayStatus: obj.rbtnmarketDisplayIn
            };
            model.inOutSubmit(inobj);
            if (type === 'assign') {
                model.assignSubmit();
            }
        };
        model.outcallSubmit = function(obj, type) {
            var inobj = {
                CallType: 2,
                RelationID: obj.ddlmrktreceivedout,
                RelationName: obj.txtmrktRelationnameout,
                CallResult: obj.ddlmrktcallresultout,
                PhoneNum: obj.txtmrktCalltelephonenumberout,
                CallDiscussion: obj.txtmrktCalldiscussionout,
                DisplayStatus: obj.rbtndisplayOut
            };
            model.inOutSubmit(inobj);
            if (type === 'assign') {
                model.assignSubmit();
            }
        };
        model.memoSubmit = function(obj, type) {
            //msg, tktID, empid, assignEmpid
            marketsvc.memoSubmit(obj.txtmrktcalldiscussionMemo, model.ticketid, model.empid, obj.ddlmrktAssignmemo).then(function(response) {
                commonpage.closepopuppoptopopup();
                if (parseInt(response.data) === 1) {
                    if (type === 'assign') {
                        model.assignSubmit();
                    }

                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Memo Created successfully', 9500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Memo updation failed', 9500);
                }
            });
        };
        model.closeSubmit = function(obj) {
            //reasn, tktID, empid
            marketsvc.closeSubmit(obj.txtmrktcloseReasn, model.ticketid, model.empid).then(function(response) {
                commonpage.closepopuppoptopopup();
                if (parseInt(response.data) === 1) {
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Ticket closed successfully', 9500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Ticket closing failed', 9500);
                }
            });
        };
        model.assignSubmit = function() {
            marketsvc.assignEmpSubmit(model.ticketid, model.empid, model.empid).then(function(respnse) {});
        };
        model.close = function() {
            commonpage.closepopuppoptopopup();
        };
        model.closerem = function() {
            commonpage.thirdClosepopup();
        };
        model.replytype = function(type) {
            var options = [];
            options.push({ label: '--select--', title: '--select--', value: "" });
            if (type === 'calltype') {
                var calltypeArray = [{ value: 377, text: 'INCOMING' }, { value: 378, text: 'OUT GOING' }, { value: 379, text: 'INTERNAL MEMO' }];
                for (var i = 0; i < calltypeArray.length; i++) {
                    options.push({ label: calltypeArray[i].text, title: calltypeArray[i].text, value: calltypeArray[i].value });
                }
            }
            return options;
        };
        model.changereminder = function(slidearray) {
            model.reminderidsession = "";
            model.reminderidsession = slidearray.ReminderID;
            model.reminderslidearray = {};
            model.reminderslidearray = slidearray;
            model.txtprofileidreminder = slidearray.ProfileID;
            model.reminderticketid = slidearray.TicketID;
            model.ddlHrs = "";
            model.ddlmins = "";
            model.ddlcontactperson = "";
            model.ddlremCaltype = "";
            commonpage.thirdshowPopup('templates/reminderPopup.html', model.scope, 'md', "modalclassdashboardremainder");
            model.Hoursarray = commonpage.getnumberbind(0, 23, 'Hrs', 1);
            model.miniutearray = commonpage.getnumberbind(0, 59, 'Mins', 1);
            model.calltypearray = model.replytype('calltype');
            model.replaytypearray = arrayConstants.childStayingWith;
            model.categoryarray = arrayConstants.catgory;
            model.ddlremCatgory = 462;
            model.ticketIDRem = slidearray.Emp_Ticket_ID;
            model.RemID = slidearray.ReminderID;
            if (slidearray.ReminderID) {
                model.txtreminderDate = moment(slidearray.ReminderDate).format('MM-DD-YYYY');
                model.ddlremCaltype = parseInt(slidearray.TicketTypeID);
                model.ddlcontactperson = slidearray.ReminderRelationID;
                model.contactpersonname = slidearray.ReminderRelationName;
                model.ddlremCatgory = parseInt(slidearray.Category);
                model.remembertickets = slidearray.Reminderbody;
                if (slidearray.ReminderDate) {
                    var remindertime = moment(slidearray.ReminderDate).format('HH:mm');
                    var remindertimeArr = remindertime.split(':');
                    model.ddlHrs = parseInt(remindertimeArr[0]) + 1;
                    model.ddlmins = parseInt(remindertimeArr[1]) + 1;
                }
            } else {
                model.remReset();
            }
        };
        model.remReset = function() {
            model.txtreminderDate = '';
            model.ddlremCaltype = '';
            model.ddlcontactperson = '';
            model.contactpersonname = '';
            model.ddlremCatgory = '';
            model.remembertickets = '';
            model.ddlHrs = '';
            model.ddlmins = '';
        };
        model.reminderSubmit = function() {
            var Mobj = {
                ProfileID: model.txtprofileidreminder,
                ReminderID: model.reminderslidearray.ReminderID,
                EmpID: model.empid,
                TicketID: model.reminderslidearray.Emp_Ticket_ID,
                DateOfReminder: $filter('date')(model.txtreminderDate, 'MM-dd-yyyy'),
                ReminderType1: model.ddlremCaltype,
                Body: model.remembertickets,
                RelationID: model.ddlcontactperson,
                Name: model.contactpersonname,
                Category: model.ddlremCatgory,
                IsFollowup: 0
            };
            model.closerem();
            bindservice.upadateremainderdate(Mobj).then(function(response) {
                if (response !== undefined && response.data === parseInt(1)) {
                    //alertss.timeoutoldalerts(model.scope, 'alert-success', 'Reminder date  Updated Successfully', 3000);
                    alert("Reminder date  Updated Successfully");
                    model.marInfo[0].ReminderDate = moment(Mobj.DateOfReminder).format('DD-MM-YYYY hh:mm:ss');
                    model.txtreminderDate = moment(Mobj.DateOfReminder).format('MM-DD-YYYY');
                    model.ddlremCaltype = Mobj.ReminderType1;
                    model.ddlcontactperson = Mobj.ddlcontactperson;
                    model.contactpersonname = Mobj.contactpersonname;
                    model.ddlremCatgory = parseInt(Mobj.ddlremCatgory);
                    model.remembertickets = Mobj.remembertickets;
                } else {
                    alert("Reminder date  Updated Failed");
                    // alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Reminder date Updated Failed', 3000);
                }
            });
        };
        model.RelationshipChangerem = function(RelationshipID) {
            model.txtprofileidreminder = model.ProfileID;
            SelectBindServiceApp.getRelationName(3, model.txtprofileidreminder, RelationshipID).then(function(response) {
                if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                    model.contactpersonname = response.data[0][0].NAME;
                }
            });
        };
        model.onTabSelected = function(index) {
            if (index === 3 && model.empnamecalled !== true) {
                model.empnamecalled = true;
                model.getemployee('EmapName', '2');
            }
        };
        model.closereminderstatus = function(reminderid) {
            model.closerem();
            model.Reminderidforclose = reminderid;
            model.txtremCloseNotes = "";
            commonpage.thirdshowPopup('templates/closeReminderStatus.html', model.scope, 'md', "modalclassdashboardremainder");

        };
        model.closeremindersubmit = function(reminderid, reason) {
            var obj = {
                Reminderid: parseInt(reminderid),
                closeEmpid: parseInt(model.empid),
                ClosedReminderreason: reason
            };
            helperservice.closereminderstatus(obj).then(function(response) {
                if (response !== undefined && response.data === parseInt(1)) {
                    model.closerem();
                    alerts.timeoutoldalerts(model.scope, 'alert-success', 'Reminder Closed Successfully', 3000);
                } else {
                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Reminder Closed Failed', 3000);
                }
            });
        };
        model.slidepopup = function(custid) {
            model.photoalbum = "Photo Album";
            model.slidephotos = [];
            model.activeslidephoto = 0;
            model.myIntervalphoto = 0;
            model.noWrapSlidesphoto = true;
            SelectBindServiceApp.getphotoslideimages(custid).then(function(response) {
                model.slidephotos = [];
                model.popupmodalbody = false;
                _.each(response.data, function(item) {
                    model.slidephotos.push(item);
                });
                commonpage.thirdshowPopup('phototicket.html', model.scope, '', "modalclassdashboardremainder");
            });
        };
        model.viewfullprofile = function(ProfileID) {
            window.open('/Viewfullprofile/' + ProfileID + '/0', '_blank');
        };
        return model.init();
    }
})();
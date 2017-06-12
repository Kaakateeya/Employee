(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('commonFactory', factory)

    factory.$inject = ['SelectBindService', '$filter'];

    function factory(SelectBindService, filter) {
        var modalpopupopen;

        return {
            open: function(url, scope, uibModal, size) {
                modalpopupopen = uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: url,
                    scope: scope,
                    size: size,
                    backdrop: 'static',
                    keyboard: false

                });
            },
            closepopup: function() {
                modalpopupopen.close();
            },
            listSelectedVal: function(val) {

                var str = null;
                if (val !== undefined && val !== null && val !== '') {
                    if (angular.isString(val)) {
                        str = val === '' ? null : val;
                    } else if (angular.isNumber(val)) {
                        str = val === '' ? null : val;
                    } else if (angular.isArray(val)) {
                        str = val.join(',');
                    } else {
                        str = val;
                    }
                }
                return str;
            },
            StateBind: function(parentval) {
                var stateArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    stateArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.stateSelect(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            stateArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return stateArr;
            },
            districtBind: function(parentval) {
                var disttrictArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    disttrictArr.push({ "label": "--select--", "title": "--select--", "value": "" });

                    SelectBindService.districtSelect(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            disttrictArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return disttrictArr;
            },
            cityBind: function(parentval) {
                var cityeArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    cityeArr.push({ "label": "--select--", "title": "--select--", "value": "" });

                    SelectBindService.citySelect(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            cityeArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return cityeArr;
            },
            professionBind: function(parentval) {
                var professionArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    professionArr.push({ "label": "--select--", "title": "--select--", "value": "" });

                    SelectBindService.ProfessionSpecialisation(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            professionArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return professionArr;
            },
            educationGroupBind: function(parentval) {
                var educationGroupArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    if (parentval !== undefined && parentval !== null && parentval !== '') {
                        educationGroupArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                        SelectBindService.EducationGroup(parentval).then(function(response) {
                            _.each(response.data, function(item) {
                                educationGroupArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                        });
                    }
                }
                return educationGroupArr;
            },
            educationSpeciakisationBind: function(parentval) {
                var educationSpecialArr = [];

                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    educationSpecialArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.EducationSpecialisation(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            educationSpecialArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return educationSpecialArr;
            },
            numbersBind: function(str, from, to) {
                var numArr = [];

                numArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                for (var i = from; i <= to; i++) {
                    numArr.push({ "label": i + " " + str, "title": i + " " + str, "value": i });
                }
                return numArr;
            },
            numberBindWithZeros: function(str, from, to) {
                var numArr = [];
                var y;
                numArr.push({ "label": str, "title": str, "value": "" });
                for (var x = from; x <= to; x++) {
                    if (x < 10)
                        y = ("0" + x);
                    else
                        y = x;
                    numArr.push({ "label": y, "title": y, "value": parseInt(y) });
                }
                return numArr;
            },
            starBind: function(parentval) {
                var starArr = [];
                if (parentval !== undefined && parentval !== null && parentval !== '') {
                    starArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.stars(parentval).then(function(response) {
                        _.each(response.data, function(item) {
                            starArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return starArr;
            },
            casteDepedency: function(parentval1, parentval2) {
                var casteArr = [];
                parentval1 = parentval1 === null || parentval1 === undefined ? '' : parentval1;
                parentval2 = parentval2 === null || parentval2 === undefined ? '' : parentval2;
                casteArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                SelectBindService.castedependency(parentval1, parentval2).then(function(response) {
                    _.each(response.data, function(item) {
                        casteArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    });
                });
                return casteArr;
            },
            subCaste: function(parentval1) {
                var subcasteArr = [];
                if (parentval1 !== undefined && parentval1 !== null && parentval1 !== '') {
                    subcasteArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.subCasteBind(parentval1).then(function(response) {
                        _.each(response.data, function(item) {
                            subcasteArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return subcasteArr;
            },
            branch: function(parentval1) {
                var branchArr = [];
                if (parentval1 !== undefined && parentval1 !== null && parentval1 !== '') {
                    branchArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    SelectBindService.branch(parentval1).then(function(response) {
                        _.each(response.data, function(item) {
                            branchArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                    });
                }
                return branchArr;
            },
            showConfirm: function(ev, mdDialog, header, okTxt, cancelTxt) {

                var status = false;
                var confirm = mdDialog.confirm()
                    .title(header)
                    //.textContent('All of the banks have agreed to forgive you your debts.')
                    .ariaLabel('Lucky day')
                    //.targetEvent(ev)
                    .cancel(cancelTxt)
                    .ok(okTxt);

                return confirm;

            },
            checkvals: function(val) {
                return (val !== undefined && val !== null && val !== '') ? true : false;
            },
            convertDateFormat: function(val, format) {

                format = format || 'DD-MM-YYYY';
                if (val !== undefined && val !== null && val !== '') {
                    return moment(val, format).format();
                } else {
                    return '';
                }
            },
            AstroCity: function(countryName, stateName) {
                var AstrocityArr = [];
                AstrocityArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                SelectBindService.AstroCities(countryName, stateName).then(function(response) {
                    _.each(response.data, function(item) {
                        AstrocityArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    });
                });
                return AstrocityArr;
            }
        };
    }
})();
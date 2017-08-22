(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('getArray', factory);

    factory.$inject = ['arrayConstantsreg', 'SelectBindServicereg'];

    function factory(cons, service) {
        return {
            GArray: function(type) {
                var option = [];
                switch (type) {
                    case 'MaritalStatus':
                        option = cons.MaritalStatusreg;
                        break;
                    case 'height':
                        option = cons.heightreg;
                        break;
                    case 'heightregistration':
                        option = cons.heightregistrationreg;
                        break;
                    case 'Religion':
                        option = cons.Religionreg;
                        break;
                    case 'Mothertongue':
                        option = cons.Mothertonguereg;
                        break;
                    case 'educationcategory':
                        option = cons.educationcategoryreg;
                        break;
                    case 'visastatus':
                        option = cons.visastatusreg;
                        break;
                    case 'stars':
                        option = cons.starsreg;
                        break;
                    case 'region':
                        option = cons.regionreg;
                        break;
                    case 'bodyType':
                        option = cons.bodyTypereg;
                        break;
                    case 'bloodGroup':
                        option = cons.bloodGroupreg;
                        break;
                    case 'healthCondition':
                        option = cons.healthConditionreg;
                        break;
                    case 'starLanguage':
                        option = cons.starLanguagereg;
                        break;
                    case 'lagnam':
                        option = cons.lagnamreg;
                        break;
                    case 'ZodaicSign':
                        option = cons.ZodaicSignreg;
                        break;
                    case 'paadam':
                        option = cons.paadamreg;
                        break;
                    case 'familyStatus':
                        option = cons.familyStatusreg;
                        break;
                    case 'RelationshipType':
                        option = cons.RelationshipTypereg;
                        break;
                    case 'childStayingWith':
                        option = cons.childStayingWithreg;
                        break;
                    case 'Complexion':
                        option = cons.Complexionreg;
                        break;
                    case 'PhysicalStatus':
                        option = cons.PhysicalStatusreg;
                        break;
                    case 'Country':
                        service.countrySelect().then(function(response) {
                            _.each(response.data, function(item) {
                                option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                            option = option;
                        });
                        break;
                    case 'ProfCatgory':
                        service.ProfessionCatgory().then(function(response) {
                            _.each(response.data, function(item) {
                                option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                            option = option;
                        });
                        break;

                    case 'ProfGroup':
                        service.ProfessionGroup().then(function(response) {
                            _.each(response.data, function(item) {
                                option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                            option = option;
                        });
                        break;

                    case 'indiaStates':
                        service.stateSelect('1').then(function(response) {
                            _.each(response.data, function(item) {
                                option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                            option = option;
                        });
                        break;
                    case 'countryCode':
                        service.countryCodeselect().then(function(response) {
                            _.each(response.data, function(item) {
                                option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                            option = option;
                        });
                        break;
                    case 'caste':
                        service.casteselect().then(function(response) {
                            _.each(response.data, function(item) {
                                option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                            option = option;
                        });
                        break;
                    case 'currency':
                        service.currency().then(function(response) {
                            _.each(response.data, function(item) {
                                option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            });
                            option = option;
                        });
                        break;
                }
                return option;
            }
        };

    }
})();
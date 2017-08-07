app.factory('getArraysearch', ['arrayConstants', 'SelectBindServiceApp', function(cons, service) {
    return {
        GArray: function(type) {
            var option = [];
            switch (type) {
                case 'MaritalStatus':
                    option = cons.MaritalStatus;
                    break;
                case 'height':
                    option = cons.height;
                    break;
                case 'heightregistration':
                    option = cons.heightregistration;
                    break;
                case 'Religion':
                    option = cons.Religion;
                    break;
                case 'Mothertongue':
                    option = cons.Mothertongue;
                    break;
                case 'educationcategory':
                    option = cons.educationcategory;
                    break;
                case 'visastatus':
                    option = cons.visastatus;
                    break;
                case 'stars':
                    option = cons.stars;
                    break;
                case 'region':
                    option = cons.region;
                    break;
                case 'bodyType':
                    option = cons.bodyType;
                    break;
                case 'bloodGroup':
                    option = cons.bloodGroup;
                    break;
                case 'healthCondition':
                    option = cons.healthCondition;
                    break;
                case 'starLanguage':
                    option = cons.starLanguage;
                    break;
                case 'lagnam':
                    option = cons.lagnam;
                    break;
                case 'ZodaicSign':
                    option = cons.ZodaicSign;
                    break;
                case 'paadam':
                    option = cons.paadam;
                    break;
                case 'familyStatus':
                    option = cons.familyStatus;
                    break;
                case 'RelationshipType':
                    option = cons.RelationshipType;
                    break;
                case 'childStayingWith':
                    option = cons.childStayingWith;
                    break;
                case 'Complexion':
                    option = cons.Complexion;
                    break;
                case 'PhysicalStatus':
                    option = cons.PhysicalStatus;
                    break;
                case 'Regionofbranches':
                    option = cons.Regionofbranches;
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
                case 'currencyselect':
                    service.currency().then(function(response) {
                        option.push({ "label": "--select--", "title": "--select--", "value": "" });
                        _.each(response.data, function(item) {
                            option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                        option = option;
                    });
                    break;
                case 'BranchName':
                    service.BranchName().then(function(response) {
                        _.each(response.data, function(item) {
                            option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                        option = option;
                    });
                    break;
                case 'Applicationstatus':
                    service.Applicationstatus().then(function(response) {
                        _.each(response.data, function(item) {
                            option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                        option = option;
                    });
                    break;

                case 'Smoke':
                    service.Smoke().then(function(response) {
                        _.each(response.data, function(item) {
                            option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                        option = option;
                    });
                    break;

                case 'Diet':
                    service.Diet().then(function(response) {
                        _.each(response.data, function(item) {
                            option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        });
                        option = option;
                    });
                    break;
                case 'EmployeeNames':
                    service.EmpBinding(1, 2, '').then(function(response) {
                        _.each(response.data, function(item) {
                            if (item.CountryCode === 'Profile Owner') {
                                option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            }
                        });
                        option = option;
                    });
                    break;

                case 'EmployeeNameswithbranches':
                    service.EmpwithBranch('ProfileBranch', '').then(function(response) {
                        _.each(response.data, function(item) {
                            option.push({ "label": item.Name, "title": item.Name, "value": item.ID, ParentName: item.BranchesName });
                        });
                        option = option;
                    });
                    break;
                case 'MediatorBranchName':
                    service.MediatorBranchName('Mediator').then(function(response) {
                        _.each(response.data, function(item) {
                            option.push({ "label": item.Name, "title": item.Name, "value": item.ID, ParentName: item.BranchesName });
                        });
                        option = option;
                    });
                    break;
            }
            return option;
        }
    };

}]);
(function() {
    'use strict';

    function factory($http, config) {
        var model = {};
        model = config;
        var arrayslide = [{
            ProfileID: "310910220",
            Name: "ram kumar",
            Gender: "Male",
            GenderID: null,
            Gothram: "PAMIDIPALA",
            Height: "6'1 in - 185 cms",
            HoroscopePath: "--",
            HoroscopeStatus: 0,
            Income: "100000",
            Intercaste: null,
            IsConfidential: false,
            JobLocation: "Bellary City ",
            KMPLID: "HD",
            LastName: "chaparala",
            MFNative: "--",
            MaritalStatusID: 44,
            MaxHeight: null,
            MinHeight: null,
            NoOfBrothers: 1,
            NoOfSisters: 0,
            Ownerflag: false,
            PhotoCount: 3,
            custPhoto: "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_100329_Images/Img1_Images/011003298_FullPhoto.jpg",

        }, {
            ProfileID: "310910220",
            Name: "ram kumar",
            Gender: "Male",
            GenderID: null,
            Gothram: "PAMIDIPALA",
            Height: "6'1 in - 185 cms",
            HoroscopePath: "--",
            HoroscopeStatus: 0,
            Income: "100000",
            Intercaste: null,
            IsConfidential: false,
            JobLocation: "Bellary City ",
            KMPLID: "HD",
            LastName: "chaparala",
            MFNative: "--",
            MaritalStatusID: 44,
            MaxHeight: null,
            MinHeight: null,
            NoOfBrothers: 1,
            NoOfSisters: 0,
            Ownerflag: false,
            PhotoCount: 3,
            custPhoto: "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_100329_Images/Img1_Images/011003298_FullPhoto.jpg",

        }];
        model.setSlides(arrayslide);
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('bootstrapSlideModel', factory);
    factory.$inject = ['$http', 'complex-slide-config'];
})();
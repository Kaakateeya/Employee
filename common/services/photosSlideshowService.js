app.factory('photoalubum', ['$http', function(http) {
    return {
        getphotoslideimages: function(custid) {
            return http.get(app.apiroot + 'StaticPages/GetPhotoSlideImages', { params: { CustID: custid } });
        }
    };
}]);
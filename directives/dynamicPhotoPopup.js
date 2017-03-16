app.directive("photoAlbum", ['commonpage', 'photoalubum',
    function(commonpage, photoalubum) {
        return {
            restrict: "E",
            scope: {
                custid: '='
            },
            templateUrl: "templates/dynamicPhotoPopup.html",

            link: function(scope, element, attrs) {
                debugger;
                scope.slides = [];


                scope.close = function() {
                    commonpage.closepopup();
                };

                photoalubum.getphotoslideimages(scope.custid).then(function(response) {
                    scope.slides = [];
                    _.each(response.data, function(item) {
                        scope.slides.push(item);
                    });
                });

            }

        };
    }
]);
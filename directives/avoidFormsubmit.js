app.directive('enterDirective', function() {

    return {
        link: function(scope, element, attrs) {
            $(element).keypress(function(e) {
                if (e.keyCode == 13) {
                    debugger;
                    console.log("Enter pressed " + element.val());
                    e.preventDefault();
                    return;
                }
            });
        }
    };
});
(function(angular) {
    "use strict";

    function factory($timeout) {
        function link(scope, elem, attr) {
            var styles = [
                '/node_modules/bootstrap/dist/css/bootstrap.min.css',
                '/node_modules/font-awesome/css/font-awesome.min.css',
                '/node_modules/angular-material/angular-material.min.css',
                '/css/build/css/custom.min.css',
                '/css/scss/mainstyles.css',
                '/css/build/css/custom_styles.css'
               // '/app/employeeViewfullprofilePrint/style.css'
            ];

            scope.printDiv = function() {
                var contents = '';
                if (scope.divInfo) {
                    styles = styles.concat(scope.divInfo.styles);
                    $timeout(function() {
                        contents = $('#' + scope.divInfo.printDivId).html();
                        var frameData = $('<iframe/>');
                        frameData[0].name = 'frameData';
                        frameData.css({ 'position': 'absolute', 'top': '-1000000px' });
                        $('body').append(frameData);
                        var frameDoc = frameData[0].contentWindow ? frameData[0].contentWindow : frameData[0].contentDocument.document ? frameData[0].contentDocument.document : frameData[0].contentDocument;
                        frameDoc.document.open();
                        frameDoc.document.write('<html><head><title>' + scope.divInfo.title + '</title>');
                        frameDoc.document.write('</head><body>');
                        _.each(styles, function(item) {
                            frameDoc.document.write('<link href=' + item + ' rel="stylesheet"  type="text/css" />');
                        });
                        frameDoc.document.write(contents);
                        frameDoc.document.write('<script>window.onload = function () { parent.document.title="View Profile"; window.focus(); window.print(); parent.document.title="View Profile";};</script></body></html>');
                        frameDoc.document.close();
                    }, 1000);
                }
            };
        }

        return {
            scope: {
                divInfo: '=',
            },
            link: link,
            restrict: 'E',
            template: "<button class='btn btn-danger pull-right' ng-click=printDiv()> <i class='fa fa-print'></i>Print</button>"
        };
    }

    angular
        .module("Kaakateeya")
        .directive('divPrint', ['$timeout', factory]);
})(angular);
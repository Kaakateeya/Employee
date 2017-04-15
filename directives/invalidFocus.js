 app.directive('accessibleForm', function() {
     return {
         restrict: 'A',
         link: function(scope, elem) {
             // set up event handler on the form element
             elem.on('submit', function() {
                 var firstInvalid = elem[0].querySelector('.ng-invalid');
                 if (firstInvalid !== null)
                     firstInvalid.focus();
                 var firstInvalidselect = elem[0][1];
                 $('select').each(function() {
                     console.log('valilog');
                     var testtt = $(this).attr('class');
                     if (testtt.indexOf('ng-invalid-required') !== -1) {
                         firstInvalidselect.focus();
                         return false;
                     }
                 });
             });
         }
     };
 });
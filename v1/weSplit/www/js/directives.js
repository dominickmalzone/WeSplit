var app = angular.module('wesplit.directives', []);


  app.directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
      elem.on(attr.eventFocus, function() {
        focus(attr.eventFocusId);
      });
      
      scope.$on('$destroy', function() {
        elem.off(attr.eventFocus);
      });
    };
  });







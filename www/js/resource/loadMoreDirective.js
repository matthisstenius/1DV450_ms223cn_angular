var module = angular.module('ToerhApp.directives', []);

module.directive('toerhLoadMore', function() {
    return {
        restrict: 'A',
        scope: {
            toerhLoadMore: '&'
        },

        link: function(scope, element, attrs) {
            var scrollable = element[0];
            
            document.addEventListener('scroll', function() {
                if (window.scrollY > scrollable.offsetHeight - 700) {
                    scope.$apply(scope.toerhLoadMore());
                }
            }, false);
        }
    };
});
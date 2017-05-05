(function () {
    angular.module('app.stacks').directive('stackDescription', ['config',
        function (config) {
            return {
                restrict: 'EA',
                replace: true,
                templateUrl: config.SRC_FOLDER + 'stacks/templates/stack-description.html',
                scope: true,
                controller: ['$scope', '$rootScope', '$cookies', '$element', 
                    function ($scope, $rootScope, $cookies, $element) {
                       
                       $scope.events = {};
                       
                       /**
                        * Filter by stack
                        */
                       $scope.$on('stack-selected', function(evt, stack) {

                           // provide info to view
                           $scope.context.stack = stack;

                           // refresh animation (when element already visible)
                           $element.find('.stack-description').addClass('flipInX');
                       });    

                       /**
                        * Clear stack description animation class when finished
                        */
                       $element.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '.stack-description', function() {
                           $(this).removeClass("flipInX");
                       });

                       if($cookies.get("stack")) {

                           // provide info to view
                           $scope.context.stack = $cookies.getObject("stack");                           
                       }
                       
                       /**
                        * Uncheck current stack filter
                        */
                       $scope.events.removeStackFilter = function(stack) {
                           $rootScope.$broadcast('stack-unselected', stack);
                       }
                       
                       $scope.$on('stack-unselected', function(stack) {
                           $scope.context.stack = null;
                       });
                       
                       /**
                        * 
                        */
                       $scope.events.editStack = function() {
                           
                       }
                }]
            };
        }
    ]);
})();
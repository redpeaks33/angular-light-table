var main = angular.module("app", []);

main.controller('MyController', ['$scope', '$timeout', 'JSONCreationService',
    function ($scope, $timeout, JSONCreationService) {
        $scope.initialize = function () {
            var startTime = new Date();

            $scope.collection = JSONCreationService.execute();

            $scope.$on("repeatFinishedEventFired", function () {
                var endTime = new Date();
                //alert(endTime - startTime + "ms");
            })
        }
    }]);

main.directive("repeatFinished", function ($timeout) {
    return function (scope, element, attrs) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit("repeatFinishedEventFired"); //イベント着火！
            });
        }
    }
});
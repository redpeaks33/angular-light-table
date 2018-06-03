var main = angular.module("app", ["million-dollar-table"]);

main.controller('MyController', ['$scope', '$timeout', 'JSONCreationService',
    function ($scope, $timeout, JSONCreationService) {
        $scope.initialize = function () {
            var startTime = new Date();

            $scope.collection = JSONCreationService.execute();

            //$scope.$on("repeatFinishedEventFired", function () {
            //    var endTime = new Date();
            //    //alert(endTime - startTime + "ms");
            //})
        }
        //$scope.initializeFilter = function () {
        //    alert('initializeFilter -basecontroller');
        //}
    }]);

main.directive("myHello", function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: false,
        templateUrl: '/custom/html/Table.html'
    }
});
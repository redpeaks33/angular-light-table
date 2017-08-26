var main = angular.module("app", []);

main.controller('MyController', ['$scope',  function ($scope) {
    $scope.collection = [];

    $scope.initialize = function()
    {
        //createRandomList();
        createFixedList();
    }
    //#region Random List
    function createRandomList() {
        for (var j = 0; j < 100; j++) {
            $scope.collection.push(createRandomItem(j));
        };
    }
    var
        nameList = [{ id: 1, name: 'Pierre' }, { id: 2, name: 'Pol' }, { id: 3, name: 'Jacques' }, { id: 4, name: 'Robert' }, { id: 5, name: 'Elisa' }],
        familyName = [{ id: 1, name: 'Dupont' }, { id: 2, name: 'Germain' }, { id: 3, name: 'Delcourt' }, { id: 4, name: 'bjip' }, { id: 5, name: 'Menez' }],
        nationList = [{ id: 1, name: 'USA' }, { id: 2, name: 'France' }, { id: 3, name: 'Germany' }],
        educationList = [{ id: 1, name: 'Doctorate' }, { id: 2, name: 'Master' }, { id: 3, name: 'Bachelor' }, { id: 4, name: 'High school' }];

    function createRandomItem(index) {
        var firstName = nameList[Math.floor(Math.random() * 5)],
          lastName = familyName[Math.floor(Math.random() * 5)],
          nationality = nationList[Math.floor(Math.random() * 3)],
          education = educationList[Math.floor(Math.random() * 4)];

        return {
            id: index,
            firstName: firstName,
            lastName: lastName,
            nationality: nationality,
            education: education,
            visible: true
        };
    }
    //#endregion Random List

    //#region Fixed List
    function createFixedList ()
    {
        var line = [{id:1,name:11},{id:2,name:12},{id:3,name:13},{id:4,name:14},{id:5,name:15}]
        var model = [{id:1,name:'A'},{id:2,name:'B'},{id:3,name:'C'},{id:4,name:'D'},{id:5,name:'E'}]
        for (var j = 0; j < 10; j++) {
            var item = {
                id: j,
                firstName: line[Math.floor((Math.random() * 5))],
                lastName: model[Math.floor((Math.random() * 5))],
                nationality: {id:j,name:'EQ' + j},
                education: { id: j, name: 'EQ' + j },
                visible: true,
            };
            $scope.collection.push(item);
        };
    }
    //#endregion Fixed List

}]);

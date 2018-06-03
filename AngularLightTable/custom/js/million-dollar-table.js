var mdt = angular.module('million-dollar-table', [])

mdt.constant('mdtConfig', {
    list: {
        original: [],
        display: []
    },
    pagination: {
        template: 'template/smart-table/pagination.html',
        itemsByPage: 10,
        displayedPages: 5
    },
    search: {
        delay: 400, // ms
        inputEvent: 'input'
    },
    select: {
        mode: 'single',
        selectedClass: 'st-selected'
    },
    filter: {
        map: [],
        text: ''
    },
    sort: {
        order: [],
        ascentClass: 'st-sort-ascent',
        descentClass: 'st-sort-descent',
        descendingFirst: false,
        skipNatural: false,
        delay: 300
    },
    pipe: {
        delay: 100 //ms
    }
});

mdt.directive('mildTableFilter', [function () {
    return {
        restrict: 'EA',
        //scope: {
        //    //original: '=',
        //    //showing: '='
        //},
        //scope: false,
        controller: ['$scope', '$rootScope', '$timeout', 'mdtConfig',
            function ($scope, $rootScope, $timeout, mdtConfig) {
                $scope.filterInfoContainer = {};

                ////#region getter
                //this.getFilterInfoContainer = function () {
                //    return $scope.filterInfoContainer;
                //}

                //this.getOriginalCollection = function () {
                //    return $scope.original;
                //};

                //this.getShowingCollection = function () {
                //    return $scope.showing;
                //};
                ////#endregion

                //#region execute filter
                this.executeFilter = function (element, predicate) {
                    //if selected all, don't execute filter. Display all
                    if (element.value == 'Select All') {
                        //Synchronize with 'All'
                        _.each($scope.original, function (item) {
                            item.visible = element.selected;
                        })
                    }
                    else {
                        //initialize
                        _.each($scope.original, function (item) {
                            item.visible = true;
                        });

                        //#region synchronize visible of table row with on/off item.
                        _.each($scope.original, function (item) {
                            var filterElement = _.find($scope.filterInfoContainer[predicate], function (n) {
                                return n.value == item[predicate].name
                            });
                            if (!filterElement) {
                                item.visible = false;
                            }
                            else {
                                item.visible = filterElement.selected;
                            }
                        });
                        //#endregion
                    }
                    //set collection in order to display
                    $scope.showing = _.filter($scope.original, function (n) { return n.visible })
                };
                //#endregion

                //#region sort
                this.executeSort = function (isDesc, predicate) {
                    $scope.showing = _.sortBy($scope.showing, function (n) {
                        return n[predicate].name;
                    });

                    if (isDesc) {
                        $scope.showing = $scope.showing.reverse();
                    }
                };
                //#endregion

                //#region text search
                this.executeTextSearch = function (text, predicate) {
                    //this.executeInitialize();
                    //set collection in order to display
                    $scope.showing = _.filter($scope.showing, function (n) {
                        return n[predicate].name.toLowerCase().indexOf(text.toLowerCase()) != -1;
                    })
                };
                //#endregion

                //#region initialize
                this.executeInitialize = function () {
                    //set collection in order to display
                    $scope.showing = $scope.original;
                };
                //#endregion
            }],

        compile: function (element, attr) {
            initializeFixedHeader(element);

            function initializeFixedHeader(element) {
                //let html = $('html')[0];
                //html.style.overflow = 'hidden';
                //html.style.height = '100%';
                //let body = $('body')[0];
                //body.style.overflow = 'hidden';
                //body.style.height = '100%';
                let tbody = $('tbody')[0];
                tbody.style.display = 'block';
                tbody.style.overflowY = 'scroll';
                tbody.style.height = '85vh';
                let thead = $('thead')[0];
                thead.style.display = 'block';
                thead.style.paddingRight = '17px';
            }

            return function (scope, element, attr, ctrl) {
            }
        }
    };
}]);

mdt.directive('mildTableCol', ['mdtConfig', '$rootScope', function (mdtConfig, $rootScope) {
    return {
        restrict: 'EA',
        require: '^mildTable',
        scope: {
            predicate: '@',
            title: '@',
            colwidth: '@',
            enable: '='
        },
        templateUrl: '/custom/html/TableColumnFilter.html',
        compile: function (element, attr) {
            //#region column size
            initializeColumn(element);
            function initializeColumn(element) {
                element[0].style.width = attr.colwidth + '%';
                element[0].style.backgroundColor = 'gray';

                //search index of th, and use its index in order to set td width.
                var index = $('th').index(element[0]) + 1;
                _.each($('tbody > tr > td:nth-child(' + index + ')'), function (n) {
                    n.style.width = attr.colwidth + '%';
                });
            }
            //#endregion

            return function (scope, element, attr, tableFilterCtrl) {
                //in case of using title only without filter
                if (!scope.enable) return;

                initialize();

                //#region initialize
                function initialize() {
                    //initialize collection
                    //create on/off check items
                    scope.items = createItems();

                    ////set this column state to parent filter container .
                    //updateParentFilterContainer();
                }
                //#endregion

                //#region crate check on/off items for filter
                function createItems() {
                    //extract predicate and get uniq and sort.
                    let distinctRows = createDistinctRows(mdtConfig.list.original);
                    let map = createItemsMap(distinctRows);
                    mdtConfig.filter.map.push({ predicate: attr.predicate, map: map });
                    return map;
                }

                //function createItems_showing(rows) {
                //    //extract predicate and get uniq and sort.
                //    let distinctRows = createDistinctRows(rows);
                //    return createItemsMap(distinctRows)
                //}

                //function createItems_checked() {
                //    //extract predicate and get uniq and sort.
                //    let distinctRows = createDistinctRows(scope.original);
                //    return createItemsMap(distinctRows)
                //}

                function createDistinctRows(rows) {
                    return _.sortBy(_.uniq(_.flatten(_.pluck(rows, scope.predicate))));
                }

                function createItemsMap(distinctRows) {
                    //Add 'All' to list head.
                    distinctRows.unshift({
                        name: 'Select All',
                        selected: true
                    });
                    //convert for checkbox item list.
                    return _.map(distinctRows, function (n) {
                        let item = {
                            value: n.name, //
                            selected: true
                        }
                        return item;
                    });
                }
                //#endregion

                ////#region update check on/off state on filter container
                //function updateParentFilterContainer() {
                //    tableFilterCtrl.getFilterInfoContainer()[scope.predicate] = scope.items;
                //}
                ////#endregion

                //#region Synchronize 'Select All' and the other item check on/off
                function synchronizeAllSelection() {
                    //filter off item except 'Select All'.
                    let unCheckedElements = _.where(_.rest(scope.items), { selected: false });
                    //Set on/off to 'Select All'
                    _.first(scope.items).selected = (unCheckedElements.length == 0);
                }
                //#endregion

                //#region item click event
                scope.filterChanged = function (element) {
                    if (element.value != 'Select All') {
                        synchronizeAllSelection(element);
                    }
                    else {
                        //Synchronize all items with 'Select All' on/off
                        _.each(_.rest(scope.items), function (item) {
                            item.selected = element.selected;
                        });
                    }
                    let filterInfo = _.findWhere(mdtConfig.filter.map, { predicate: attr.predicate });
                    filterInfo.map = scope.items;

                    //Execute
                    $rootScope.$broadcast('updateMildTable');
                    //updateParentFilterContainer();
                    //tableFilterCtrl.executeFilter(element, scope.predicate);
                };
                //#endregion

                //#region button event
                //Sort
                scope.sort = function (isAsc) {
                    let sortInfo = _.findWhere(mdtConfig.sort.order, { predicate: scope.predicate });
                    mdtConfig.sort.order.push({ asc: isAsc, predicate: scope.predicate });

                    //if (sortInfo) {
                    //    sortInfo = { asc: isAsc, predicate: scope.predicate };
                    //}
                    //else {
                    //    mdtConfig.sort.order.push({ asc: isAsc, predicate: scope.predicate });
                    //}

                    //Execute
                    $rootScope.$broadcast('updateMildTable');
                };

                ////Clear
                //scope.clear = function () {
                //    //Recover State
                //    tableFilterCtrl.executeInitialize();
                //    //Check All
                //    let all = _.first(scope.items);
                //    all.selected = true;
                //    scope.filterChanged(all);
                //};

                ////Text Search
                //scope.textSearch = function (text) {
                //    tableFilterCtrl.executeTextSearch(text, scope.predicate);
                //};

                ////Show filter items only showed itemson table.
                //scope.showListingItem = function () {
                //    let list = tableFilterCtrl.getShowingCollection();
                //    scope.items = createItems_showing(list);
                //    updateParentFilterContainer();
                //};

                ////Show filter items only checked items on table.
                //scope.showCheckedItem = function () {
                //    updateParentFilterContainer();
                //};
                ////#endregion

                //#region synchronize item check on/off with rows when clicked dropdown
                scope.synchronizeCheckItems = function () {
                    //createItems();

                    let rows = mdtConfig.list.display;
                    //let rows = tableFilterCtrl.getShowingCollection();

                    _.each(_.rest(scope.items), function (item) {
                        let visibleRow = _.filter(rows, function (row) {
                            return row.visible && item.value == row[scope.predicate].name
                        });

                        item.selected = (visibleRow.length > 0);
                    });

                    synchronizeAllSelection();
                }
                //#endregion

                //scope.$on('updateFilterInfo', function (event, filterInfoContainer) {
                //    tableFilterCtrl.getFilterInfoContainer()[scope.predicate] = filterInfoContainer[scope.predicate]
                //});
            }
        }
    };
}]);

mdt.controller('mildTableController', ['$scope', '$timeout', 'mdtConfig', 'MildTableFilterService',
    function ($scope, $timeout, mdtConfig, MildTableFilterService) {
        //Deep Copy
        this.duplicate = function (original) {
            if (!original) {
                $scope.original = original;
            }

            if (original) {
                //Deep Copy
                $scope.display = [].concat($scope.original);

                mdtConfig.list = {
                    original: $scope.original,
                    display: $scope.display
                }
            }
        }

        $scope.$on('updateMildTable', function () {
            //Filter Logic
            MildTableFilterService.execute();
            $scope.original = mdtConfig.list.original;
            $scope.display = mdtConfig.list.display;
        })
    }
]);

mdt.directive("mildTablePipe", ['$timeout', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            if (scope.$first) {
                //scope.startTime = new Date();
                //alert("Start");
            }
            if (scope.$last) {
                $timeout(function () {
                    //var endTime = new Date();
                    //alert(endTime - scope.startTime + "ms");
                    //scope.$emit("repeatFinishedEventFired");
                });
            }
        }
    }
}]);

mdt.directive("mildTablePagenation", ['$rootScope', 'mdtConfig',
    function ($rootScope, mdtConfig) {
        return {
            restrict: 'A',
            scope: {
                itemsNum: '=',
                pagesNum: '=',
            },
            template: '<button ng-click="initializeFilter()"></button>',
            link: function (scope, element, attr, ctrl) {
                scope.initializeFilter = function () {
                    mdtConfig.list.display = [].concat(mdtConfig.list.original);
                    $rootScope.$broadcast('updateMildTable');
                }
            }
        };
    }]);

mdt.directive("mildTableTextFilter", ['$rootScope', 'mdtConfig',
    function ($rootScope, mdtConfig) {
        return {
            restrict: 'A',
            template: '<button ng-click="initializeFilter()"></button>',
            link: function (scope, element, attr, ctrl) {
                scope.initializeFilter = function () {
                    mdtConfig.list.display = [].concat(mdtConfig.list.original);
                    $rootScope.$broadcast('updateMildTable');
                }
            }
        };
    }]);

mdt.directive("mildTableInitialize", ['$rootScope', 'mdtConfig',
    function ($rootScope, mdtConfig) {
        return {
            restrict: 'A',
            template: '<button ng-click="initializeFilter()"></button>',
            link: function (scope, element, attr, ctrl) {
                scope.initializeFilter = function () {
                    mdtConfig.list.display = [].concat(mdtConfig.list.original);
                    mdtConfig.filter.map = [];
                    mdtConfig.filter.text = '';
                    mdtConfig.sort.order = [];
                    $rootScope.$broadcast('updateMildTable');
                }
            }
        };
    }]);

mdt.directive('mildTable', [function () {
    return {
        restrict: 'A',
        controller: 'mildTableController',
        scope: {
            original: '=',
            display: '='
        },
        compile: function (element, attr) {
            initializeFixedHeader(element);

            function initializeFixedHeader(element) {
                //let html = $('html')[0];
                //html.style.overflow = 'hidden';
                //html.style.height = '100%';
                //let body = $('body')[0];
                //body.style.overflow = 'hidden';
                //body.style.height = '100%';
                let tbody = $('tbody')[0];
                tbody.style.display = 'block';
                tbody.style.overflowY = 'scroll';
                tbody.style.height = '85vh';
                let thead = $('thead')[0];
                thead.style.display = 'block';
                thead.style.paddingRight = '17px';
            }

            return function (scope, element, attr, ctrl) {
                ctrl.duplicate(scope.original);
            }
        }
    };
}]);

mdt.service('MildTableFilterService', ['mdtConfig', function (mdtConfig) {
    this.execute = function () {
        //reset
        initializeVisible();

        //sort
        sort();

        //filter checkbox
        filterCheckbox();

        //filter text
        //filterText();

        //need update mdtConfig.filter
    }

    let initializeVisible = function () {
        mdtConfig.list.display = mdtConfig.list.original;
        _.each(mdtConfig.list.display, function (item) {
            item.visible = true;
        });
    }

    let sort = function () {
        let l = mdtConfig.list.display;
        _.each(mdtConfig.sort.order, function (s) {
            l = _.sortBy(l, function (n) {
                return n[s.predicate].name;
            });
            if (!s.asc) {
                l = l.reverse();
            }
        });

        mdtConfig.list.display = l;
    }

    let filterCheckbox = function () {
        let l = mdtConfig.list.display;

        _.each(l, function (item) {
            item.visible = true;
            _.each(mdtConfig.filter.map, function (f) {
                item.visible &= _.findWhere(f.map, { value: item[f.predicate].name }).selected
            });
        })
    }

    let filterText = function () {
        let l = mdtConfig.list.display;

        _.each(l, function (item) {
            _.each(mdtConfig.filter.map, function (f) {
                item.visible &= (item[f.predicate].name.toLowerCase().indexOf(text.toLowerCase()) != -1);
            });
        })
    }
}]);
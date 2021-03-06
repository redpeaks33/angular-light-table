﻿var mdt = angular.module('million-dollar-table', [])

mdt.constant('mdtConfig', {
    list: {
        original: [],
        display: [],
        scrolled: []
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
    scroll: {
        rownum: {
            initial: 30,
            additional: 30,
            current: 30
        }
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

                //////#region getter
                ////this.getFilterInfoContainer = function () {
                ////    return $scope.filterInfoContainer;
                ////}

                ////this.getOriginalCollection = function () {
                ////    return $scope.original;
                ////};

                ////this.getShowingCollection = function () {
                ////    return $scope.showing;
                ////};
                //////#endregion

                ////#region execute filter
                //this.executeFilter = function (element, predicate) {
                //    //if selected all, don't execute filter. Display all
                //    if (element.value == 'Select All') {
                //        //Synchronize with 'All'
                //        _.each($scope.original, function (item) {
                //            item.visible = element.selected;
                //        })
                //    }
                //    else {
                //        //initialize
                //        _.each($scope.original, function (item) {
                //            item.visible = true;
                //        });

                //        //#region synchronize visible of table row with on/off item.
                //        _.each($scope.original, function (item) {
                //            var filterElement = _.find($scope.filterInfoContainer[predicate], function (n) {
                //                return n.value == item[predicate].name
                //            });
                //            if (!filterElement) {
                //                item.visible = false;
                //            }
                //            else {
                //                item.visible = filterElement.selected;
                //            }
                //        });
                //        //#endregion
                //    }
                //    //set collection in order to display
                //    $scope.showing = _.filter($scope.original, function (n) { return n.visible })
                //};
                ////#endregion

                ////#region sort
                //this.executeSort = function (isDesc, predicate) {
                //    $scope.showing = _.sortBy($scope.showing, function (n) {
                //        return n[predicate].name;
                //    });

                //    if (isDesc) {
                //        $scope.showing = $scope.showing.reverse();
                //    }
                //};
                ////#endregion

                ////#region text search
                //this.executeTextSearch = function (text, predicate) {
                //    //this.executeInitialize();
                //    //set collection in order to display
                //    $scope.showing = _.filter($scope.showing, function (n) {
                //        return n[predicate].name.toLowerCase().indexOf(text.toLowerCase()) != -1;
                //    })
                //};
                ////#endregion

                ////#region initialize
                //this.executeInitialize = function () {
                //    //set collection in order to display
                //    $scope.showing = $scope.original;
                //};
                ////#endregion
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

mdt.directive('mildTableTh', ['mdtConfig', '$rootScope', function (mdtConfig, $rootScope) {
    return {
        restrict: 'EA',
        require: '^mildTable',
        scope: {
            predicate: '@',
            title: '@',
            colwidth: '@',
            color: '@',
            enable: '='
        },
        templateUrl: '/custom/html/TableColumnFilter.html',
        compile: function (element, attr) {
            //#region column size
            initializeColumn(element);
            function initializeColumn(element) {
                //element[0].style.width = attr.colwidth + '%';
                element[0].style.width = attr.colwidth + 'px';
                // element[0].style.backgroundColor = attr.color;
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
                    distinctRows.unshift('Select All');
                    //convert for checkbox item list.
                    return _.map(distinctRows, function (n) {
                        let item = {
                            value: n, //
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
                            return row.visible && item.value == row[scope.predicate]
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

//td element
mdt.directive('mildTableTd', ['mdtConfig', '$rootScope', function (mdtConfig, $rootScope) {
    return {
        restrict: 'EA',
        require: '^mildTable',
        scope: {
            colwidth: '@',
        },
        compile: function (element, attr) {
            //#region column size
            initializeColumn(element);
            function initializeColumn(element) {
                element[0].style.width = attr.colwidth + 'px';
            }
            //#endregion
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
                //$scope.display = [].concat($scope.original);
                $scope.display = _.first([].concat($scope.original), mdtConfig.scroll.rownum.initial);

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

            mdtConfig.scroll.rownum.additional = mdtConfig.scroll.rownum.initial;
            mdtConfig.scroll.rownum.current = mdtConfig.scroll.rownum.initial;
            $scope.display = _.first(mdtConfig.list.display, mdtConfig.scroll.rownum.initial);
        });

        $scope.$on('scrollMildTable', function () {
            if ($scope.display) {
                let skip = mdtConfig.scroll.rownum.current;
                let take = mdtConfig.scroll.rownum.additional;

                mdtConfig.scroll.rownum.current += mdtConfig.scroll.rownum.additional;
                let additional = mdtConfig.list.original.slice(skip, skip + take);

                $scope.display = $scope.display.concat(additional);

                $scope.$apply('display');
            }
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
            template: '<input class="form-control" placeholder="input page size" type="number"></input>' +
                      '<nav ng-if="numPages && pages.length >= 2"><ul class="pagination">' +
                      '<li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a href="javascript: void(0);" ng-click="selectPage(page)">{{page}}</a></li>' +
                      '</ul></nav>',
            link: function (scope, element, attr, ctrl) {
                //scope.initializeFilter = function () {
                //    mdtConfig.list.display = [].concat(mdtConfig.list.original);
                //    $rootScope.$broadcast('updateMildTable');
                //}
            }
        };
    }]);

mdt.directive("mildTableTextFilter", ['$rootScope', 'mdtConfig',
    function ($rootScope, mdtConfig) {
        return {
            restrict: 'A',
            template: '<div class="input-group">' +
                    '<input type="text" class="form-control" ng-model="word" ng-change="textFilter(word)" placeholder="Search" id="inputGroup" ng-model-options="{ debounce: 500 }" />' +
                    '<button class="input-group-addon" ng-click="textFilter(word)"><i class="fa fa-search"></i></button>' +
                    '</div>',
            link: function (scope, element, attr, ctrl) {
                scope.word = '';
                scope.textFilter = function (word) {
                    mdtConfig.filter.text = word;
                    $rootScope.$broadcast('updateMildTable');
                }
            }
        };
    }]);

mdt.directive("mildTableInitialize", ['$rootScope', 'mdtConfig',
    function ($rootScope, mdtConfig) {
        return {
            restrict: 'A',
            template: '<button ng-click="initializeFilter()" class="btn "><span class="glyphicon glyphicon-refresh" /></button>',
            link: function (scope, element, attr, ctrl) {
                scope.initializeFilter = function () {
                    mdtConfig.list.display = [].concat(mdtConfig.list.original);
                    mdtConfig.filter.text = '';
                    mdtConfig.sort.order = [];
                    mdtConfig.scroll.rownum_additional = mdtConfig.scroll.rownum_initial;
                    _.each(mdtConfig.filter.map, function (n) {
                        _.each(n.map, function (m) {
                            m.selected = true;
                        })
                    })
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
            display: '=',
            mdtheight: '@'
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
                tbody.style.height = attr.mdtheight;//'85vh';
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
        filterText();
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
                return n[s.predicate];
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
                item.visible &= _.findWhere(f.map, { value: item[f.predicate] }).selected
            });
        })
    }

    let filterText = function () {
        let l = mdtConfig.list.display;

        _.each(l, function (item) {
            text_result_visible = false;
            _.each(mdtConfig.filter.map, function (f) {
                text_result_visible |= (item[f.predicate].toLowerCase().indexOf(mdtConfig.filter.text.toLowerCase()) != -1);
            });
            item.visible &= text_result_visible;
        })
    }
}]);

//infinity scroll
mdt.directive('mildTableScroll', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        controller: 'mildTableController',
        compile: function (element, attr) {
            return function (scope, element, attr, ctrl) {
                let raw = element[0];

                element.bind("scroll", function () {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                        $rootScope.$broadcast('scrollMildTable');
                    }
                });
            }
        }
    };
}]);
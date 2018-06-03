//main.directive('filRow', function () {
//    return {
//        restrict: 'EA',
//        //require: '^table',
//        scope: {
//            original: '=',
//            showing: '='
//        },
//        controller: ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
//            $scope.filterInfoContainer = {};

//            //#region getter
//            this.getFilterInfoContainer = function () {
//                return $scope.filterInfoContainer;
//            }

//            this.getOriginalCollection = function () {
//                return $scope.original;
//            };

//            this.getShowingCollection = function () {
//                return $scope.showing;
//            };
//            //#endregion

//            //#region execute filter
//            this.executeFilter = function (element, predicate) {
//                //if selected all, don't execute filter. Display all
//                if (element.value == 'Select All') {
//                    //Synchronize with 'All'
//                    _.each($scope.original, function (item) {
//                        item.visible = element.selected;
//                    })
//                }
//                else {
//                    //initialize
//                    _.each($scope.original, function (item) {
//                        item.visible = true;
//                    });

//                    //#region synchronize visible of table row with on/off item.
//                    _.each($scope.original, function (item) {
//                        var filterElement = _.find($scope.filterInfoContainer[predicate], function (n) {
//                            return n.value == item[predicate].name
//                        });
//                        if (!filterElement) {
//                            item.visible = false;
//                        }
//                        else {
//                            item.visible = filterElement.selected;
//                        }
//                    });
//                    //#endregion
//                }
//                //set collection in order to display
//                $scope.showing = _.filter($scope.original, function (n) { return n.visible })
//            };
//            //#endregion

//            ////#region execute filter
//            //this.executeFilter = function (element, predicate) {
//            //    //if selected all, don't execute filter. Display all
//            //    if (element.value == 'All') {
//            //        //Synchronize with 'All'
//            //        _.each($scope.original, function (item) {
//            //            item.visible = element.selected;
//            //        })

//            //        _.each($scope.filterInfoContainer, function (filterInfo, key) {
//            //            _.each(filterInfo, function (n) {
//            //                n.selected = element.selected;
//            //            });
//            //        });
//            //    }
//            //    else {
//            //        //initialize
//            //        _.each($scope.original, function (item) {
//            //            item.visible = true;
//            //        });

//            //        _.each($scope.filterInfoContainer, function (filterInfo, key) {
//            //            _.each(filterInfo, function (n) {
//            //                n.selected = element.selected;
//            //            });
//            //        });

//            //        //_.find($scope.filterInfoContainer[predicate], { value: 'All' }).selected = true;
//            //        //_.each($scope.filterInfoContainer[predicate], function (filterInfo) {
//            //        //    _.find(filterInfo, { value: 'All' }).selected = true;
//            //        //});

//            //        //filter original list
//            //        _.each($scope.filterInfoContainer, function (filterInfo, key) {
//            //            var filterList = _.where(filterInfo, { selected: false })
//            //            _.each($scope.original, function (item) {
//            //                if (item.visible && _.filter(filterList, function (n) { return n.value == item[key].name }).length > 0) {
//            //                    item.visible = false;
//            //                }
//            //            })
//            //        });

//            //        //create filterInfoContainer from filtered original list; !!!
//            //        //_.each($scope.filterInfoContainer, function (filterInfo, key) {
//            //        //    let converted = _.sortBy(_.uniq(_.flatten(_.pluck(scope.collection, key))));
//            //        //    //_.each($scope.original, function (item) {
//            //        //    //    if (item.visible && _.filter(filterList, function (n) { return n.value == item[key].name }).length > 0) {
//            //        //    //        item.visible = false;
//            //        //    //    }
//            //        //    //})
//            //        //});
//            //        //$rootScope.$broadcast('updateFilterInfo', $scope.filterInfoContainer)
//            //        //_.each($scope.filterInfoContainer, function (filterInfo, key) {
//            //        //    var filterInfoList = _.filter(filterInfo, function (n) { return n == element });
//            //        //    if (filterInfoList.length == 0) {
//            //        //        var filterList = _.each(filterInfo, function (n) {
//            //        //            n.selected = true;
//            //        //        });
//            //        //    }
//            //        //    else {
//            //        //        _.filter(filterInfo, function (n) { return n.value == 'All' })[0].selected = true;
//            //        //    }
//            //        //});
//            //    }
//            //    //set collection in order to display
//            //    $scope.showing = _.filter($scope.original, function (n) { return n.visible })
//            //};
//            ////#endregion

//            //#region sort
//            this.executeSort = function (isDesc, predicate) {
//                $scope.showing = _.sortBy($scope.showing, function (n) {
//                    return n[predicate].name;
//                });

//                if (isDesc) {
//                    $scope.showing = $scope.showing.reverse();
//                }
//            };
//            //#endregion

//            //#region text search
//            this.executeTextSearch = function (text, predicate) {
//                //this.executeInitialize();
//                //set collection in order to display
//                $scope.showing = _.filter($scope.showing, function (n) {
//                    return n[predicate].name.toLowerCase().indexOf(text.toLowerCase()) != -1;
//                })
//            };
//            //#endregion

//            //#region initialize
//            this.executeInitialize = function () {
//                //set collection in order to display
//                $scope.showing = $scope.original;
//            };
//            //#endregion

//            //#region initialize Fixex Header Position
//            $timeout(function () {
//                //initializeFixedHeader();
//            }, 5000);

//            function initializeFixedHeader(element) {
//                //let html = $('html')[0];
//                //html.style.overflow = 'hidden';
//                //html.style.height = '100%';
//                //let body = $('body')[0];
//                //body.style.overflow = 'hidden';
//                //body.style.height = '100%';
//                let tbody = $('tbody')[0];
//                tbody.style.display = 'block';
//                tbody.style.overflowY = 'scroll';
//                tbody.style.height = '85vh';
//                let thead = $('thead')[0];
//                thead.style.display = 'block';
//                thead.style.paddingRight = '17px';
//            }
//            //#endregion
//        }],
//        link: function (scope, element, attr, ctrl) {
//            scope.$parent.isFiltering = false;
//        }
//    };
//});

//main.directive('filCol', function () {
//    return {
//        restrict: 'EA',
//        require: '^filRow',
//        scope: {
//            predicate: '@',
//            title: '@',
//            colwidth: '@',
//            disable: '='
//        },
//        templateUrl: '/custom/html/TableColumnFilter.html',
//        link: function (scope, element, attr, tableFilterCtrl) {
//            initialize();

//            //#region initialize
//            function initialize() {
//                initializeColumn(element);

//                //set title.
//                scope.dropdownLabel = scope.title;

//                //in case of using title only without filter
//                if (scope.disable)
//                {
//                    return;
//                }

//                //initialize collection
//                //get collection from table
//                scope.original = tableFilterCtrl.getOriginalCollection();
//                scope.showing = tableFilterCtrl.getShowingCollection();

//                //create on/off check items
//                scope.items = createItems();

//                //set this column state to parent filter container .
//                updateParentFilterContainer();
//            }
//            //#endregion

//            //#region crate check on/off items for filter
//            function createItems() {
//                //extract predicate and get uniq and sort.
//                let distinctRows = createDistinctRows(scope.original);
//                return createItemsMap(distinctRows)
//            }

//            function createItems_showing(rows) {
//                //extract predicate and get uniq and sort.
//                let distinctRows = createDistinctRows(rows);
//                return createItemsMap(distinctRows)
//            }

//            function createItems_checked() {
//                //extract predicate and get uniq and sort.
//                let distinctRows = createDistinctRows(scope.original);
//                return createItemsMap(distinctRows)
//            }

//            function createDistinctRows(rows) {
//                return _.sortBy(_.uniq(_.flatten(_.pluck(rows, scope.predicate))));
//            }

//            function createItemsMap(distinctRows) {
//                //Add 'All' to list head.
//                distinctRows.unshift({
//                    name: 'Select All',
//                    selected: true
//                });
//                //convert for checkbox item list.
//                return _.map(distinctRows, function (n) {
//                    let item = {
//                        value: n.name, //
//                        selected: true
//                    }
//                    return item;
//                });
//            }
//            //#endregion

//            //#region update check on/off state on filter container
//            function updateParentFilterContainer() {
//                tableFilterCtrl.getFilterInfoContainer()[scope.predicate] = scope.items;
//            }
//            //#endregion

//            //#region Synchronize 'Select All' and the other item check on/off
//            function synchronizeAllSelection() {
//                //filter off item except 'Select All'.
//                let unCheckedElements = _.where(_.rest(scope.items), { selected: false });
//                //Set on/off to 'Select All'
//                _.first(scope.items).selected = (unCheckedElements.length == 0);
//            }
//            //#endregion

//            //#region column size
//            function initializeColumn(element) {
//                element[0].style.width = scope.colwidth + '%';
//                element[0].style.backgroundColor = 'gray';

//                //search index of th, and use its index in order to set td width.
//                var index = $('th').index(element[0]) + 1;
//                _.each($('tbody > tr > td:nth-child(' + index + ')'), function (n) {
//                    n.style.width = scope.colwidth + '%';
//                });

//            }
//            //#endregion

//            //#region item click event
//            scope.filterChanged = function (element) {
//                if (element.value != 'Select All') {
//                    synchronizeAllSelection(element);
//                }
//                else {
//                    //Synchronize all items with 'Select All' on/off
//                    _.each(_.rest(scope.items),function(item){
//                        item.selected = element.selected;
//                    });
//                }
//                updateParentFilterContainer();
//                tableFilterCtrl.executeFilter(element, scope.predicate);
//            };
//            //#endregion

//            //#region button event
//            //Sort
//            scope.sort = function (isDesc) {
//                tableFilterCtrl.executeSort(isDesc, scope.predicate);
//            };

//            //Clear
//            scope.clear = function () {
//                //Recover State
//                tableFilterCtrl.executeInitialize();
//                //Check All
//                let all = _.first(scope.items);
//                all.selected = true;
//                scope.filterChanged(all);
//            };

//            //Text Search
//            scope.textSearch = function (text) {
//                tableFilterCtrl.executeTextSearch(text, scope.predicate);
//            };

//            //Show filter items only showed itemson table.
//            scope.showListingItem = function () {
//                let list = tableFilterCtrl.getShowingCollection();
//                scope.items = createItems_showing(list);
//                updateParentFilterContainer();
//            };

//            //Show filter items only checked items on table.
//            scope.showCheckedItem = function () {
//                updateParentFilterContainer();
//             };
//            //#endregion

//            //#region synchronize item check on/off with rows when clicked dropdown
//            scope.synchronizeCheckItems = function () {
//                createItems();

//                let rows = tableFilterCtrl.getShowingCollection();

//                _.each(_.rest(scope.items), function (item) {
//                    let visibleRow = _.filter(rows, function (row) {
//                        return row.visible && item.value == row[scope.predicate].name
//                    });

//                    item.selected = (visibleRow.length > 0);
//                });

//                synchronizeAllSelection();
//            }
//            //#endregion

//            scope.$on('updateFilterInfo', function (event, filterInfoContainer) {
//                tableFilterCtrl.getFilterInfoContainer()[scope.predicate] = filterInfoContainer[scope.predicate]
//            });
//        },
//    };
//});
main.directive('filRow', function () {
    return {
        restrict: 'EA',
        //require: '^table',
        scope: {
            original: '=',
            showing: '='
        },
        controller: ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
            $scope.filterInfoContainer = {};
            $timeout(function () {
                initializeFixedHeader();
            }, 5000);
            
            //#region getter
            this.getFilterInfoContainer = function () {
                return $scope.filterInfoContainer;
            }

            this.getOriginalCollection = function () {
                return $scope.original;
            };

            this.getShowingCollection = function () {
                return $scope.showing;
            };
            //#endregion

            //#region execute filter
            this.executeFilter = function (element, predicate) {
                //if selected all, don't execute filter. Display all
                if (element.value == 'Select All') {
                    //Synchronize with 'All'
                    _.each($scope.original, function (item) {
                        item.visible = element.selected;
                    })

                    _.each($scope.filterInfoContainer, function (filterInfo, key) {
                        _.each(filterInfo, function (n) {
                            n.selected = element.selected;
                        });
                    });
                }
                else {
                    //initialize
                    _.each($scope.original, function (item) {
                        item.visible = true;
                    });

                    //_.each($scope.filterInfoContainer, function (filterInfo, key) {
                    //    if (predicate == key)
                    //    {
                    //        _.each(filterInfo, function (n) {
                    //            if (filterInfo.value == element.value)
                    //            {
                    //                n.selected = element.selected;
                    //            }
                    //        });
                    //    }
                    //});

                    //_.find($scope.filterInfoContainer[predicate], { value: 'All' }).selected = true;
                    //_.each($scope.filterInfoContainer[predicate], function (filterInfo) {
                    //    _.find(filterInfo, { value: 'All' }).selected = true;
                    //});

                    //filter original list 
                    //_.each($scope.filterInfoContainer, function (filterInfo, key) {
                    //    var filterList = _.where(filterInfo, { selected: false })
                    //    _.each($scope.original, function (item) {
                    //        if (item.visible && _.filter(filterList, function (n) { return n.value == item[key].name }).length > 0) {
                    //            item.visible = false;
                    //        }
                    //    })
                    //});
                    _.each($scope.original, function (item) {
                        var filterElement = _.filter($scope.filterInfoContainer[predicate], function (n) {
                            return n.value == item[predicate].name
                        });
                        item.visible = filterElement[0].selected;
                    });

                    //Synchronize Select All

                    //create filterInfoContainer from filtered original list; !!!
                    //_.each($scope.filterInfoContainer, function (filterInfo, key) {
                    //    let converted = _.sortBy(_.uniq(_.flatten(_.pluck(scope.collection, key))));
                    //    //_.each($scope.original, function (item) {
                    //    //    if (item.visible && _.filter(filterList, function (n) { return n.value == item[key].name }).length > 0) {
                    //    //        item.visible = false;
                    //    //    }
                    //    //})
                    //});
                    //$rootScope.$broadcast('updateFilterInfo', $scope.filterInfoContainer)
                    //_.each($scope.filterInfoContainer, function (filterInfo, key) {
                    //    var filterInfoList = _.filter(filterInfo, function (n) { return n == element });
                    //    if (filterInfoList.length == 0) {
                    //        var filterList = _.each(filterInfo, function (n) {
                    //            n.selected = true;
                    //        });
                    //    }
                    //    else {
                    //        _.filter(filterInfo, function (n) { return n.value == 'All' })[0].selected = true;
                    //    }
                    //});
                }
                //set collection in order to display
                $scope.showing = _.filter($scope.original, function (n) { return n.visible })
            };
            //#endregio
            ////#region execute filter
            //this.executeFilter = function (element, predicate) {
            //    //if selected all, don't execute filter. Display all
            //    if (element.value == 'All') {
            //        //Synchronize with 'All'
            //        _.each($scope.original, function (item) {
            //            item.visible = element.selected;
            //        })

            //        _.each($scope.filterInfoContainer, function (filterInfo, key) {
            //            _.each(filterInfo, function (n) {
            //                n.selected = element.selected;
            //            });
            //        });
            //    }
            //    else {
            //        //initialize
            //        _.each($scope.original, function (item) {
            //            item.visible = true;
            //        });

            //        _.each($scope.filterInfoContainer, function (filterInfo, key) {
            //            _.each(filterInfo, function (n) {
            //                n.selected = element.selected;
            //            });
            //        });

            //        //_.find($scope.filterInfoContainer[predicate], { value: 'All' }).selected = true;
            //        //_.each($scope.filterInfoContainer[predicate], function (filterInfo) {
            //        //    _.find(filterInfo, { value: 'All' }).selected = true;
            //        //});

            //        //filter original list 
            //        _.each($scope.filterInfoContainer, function (filterInfo, key) {
            //            var filterList = _.where(filterInfo, { selected: false })
            //            _.each($scope.original, function (item) {
            //                if (item.visible && _.filter(filterList, function (n) { return n.value == item[key].name }).length > 0) {
            //                    item.visible = false;
            //                }
            //            })
            //        });

            //        //create filterInfoContainer from filtered original list; !!!
            //        //_.each($scope.filterInfoContainer, function (filterInfo, key) {
            //        //    let converted = _.sortBy(_.uniq(_.flatten(_.pluck(scope.collection, key))));
            //        //    //_.each($scope.original, function (item) {
            //        //    //    if (item.visible && _.filter(filterList, function (n) { return n.value == item[key].name }).length > 0) {
            //        //    //        item.visible = false;
            //        //    //    }
            //        //    //})
            //        //});
            //        //$rootScope.$broadcast('updateFilterInfo', $scope.filterInfoContainer)
            //        //_.each($scope.filterInfoContainer, function (filterInfo, key) {
            //        //    var filterInfoList = _.filter(filterInfo, function (n) { return n == element });
            //        //    if (filterInfoList.length == 0) {
            //        //        var filterList = _.each(filterInfo, function (n) {
            //        //            n.selected = true;
            //        //        });
            //        //    }
            //        //    else {
            //        //        _.filter(filterInfo, function (n) { return n.value == 'All' })[0].selected = true;
            //        //    }
            //        //});
            //    }
            //    //set collection in order to display
            //    $scope.showing = _.filter($scope.original, function (n) { return n.visible })
            //};
            ////#endregion

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
            this.executeTextSearch = function (text,predicate) {
                //set collection in order to display
                $scope.showing = _.filter($scope.showing, function (n) {
                    return n[predicate].name.toLowerCase().indexOf(text) != -1;
                })
            };
            //#endregion

            //#region initialize
            this.executeInitialize = function () {
                //set collection in order to display
                $scope.showing = $scope.original;
            };
            //#endregion

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
        }],
        link: function (scope, element, attr, ctrl) {
            scope.filterInfoContainer = {};
            scope.$parent.isFiltering = false;
        }
    };
});

main.directive('filCol', function () {
    return {
        restrict: 'EA',
        require: '^filRow',
        scope: {
            predicate: '@',
            title: '@',
            onlyshowing: '=',
            onlychecked: '=',
            colwidth: '@',
            disable: '@' 
        },
        templateUrl: '/custom/html/TableColumnFilter.html',
        link: function (scope, element, attr, tableFilterCtrl) {
            initialize();

            function initialize() {
                initializeLayout(element);
                //add title.
                scope.dropdownLabel = scope.title;

                //in case of using title only without filter
                if (scope.disable)
                {
                    return;
                }

                //initialize collection
                scope.original = tableFilterCtrl.getOriginalCollection();
                scope.showing = tableFilterCtrl.getShowingCollection();
                scope.distinctItems = createDistinctItems();

                //set this column state to parent filter container .
                updateParentFilterContainer();
            }

            function createDistinctItems() {
                //extract predicate and get uniq and sort.
                let converted = _.sortBy(_.uniq(_.flatten(_.pluck(scope.original, scope.predicate))));
                //Add 'All' to list head.
                converted.unshift({
                    name: 'Select All',
                    selected: true
                });
                //convert for checkbox item list.
                return _.map(converted, function (n) {
                    let item = {
                        value: n.name,
                        selected: true
                    }
                    return item;
                });
            }

            function updateParentFilterContainer() {
                tableFilterCtrl.getFilterInfoContainer()[scope.predicate] = scope.distinctItems;
            }

            function synchronizeAllSelection() {
                    var filterElements = _.filter(scope.distinctItems, function (n) {
                        return n.value != 'Select All' && n.selected == false;
                    });

                    _.find(scope.distinctItems, function (n) {
                        return n.value == 'Select All' 
                    }).selected = (filterElements.length == 0);
            }
            function initializeLayout(element) {
                initializeColumn(element);
            }
            function initializeColumn(element) {
                element[0].style.width = scope.colwidth + 'px';
                element[0].style.backgroundColor = 'gray';

                //search index of th, and use its index in order to set td width.
                var index = $('th').index(element[0]) +1;
                _.each($('tbody > tr > td:nth-child(' +index + ')'), function (n) {
                    n.style.width = scope.colwidth + 'px';
                });

            }

            scope.filterChanged = function (element) {
                synchronizeAllSelection(element);
                updateParentFilterContainer();
                tableFilterCtrl.executeFilter(element, scope.predicate);
            };

            scope.sort = function (isDesc) {
                tableFilterCtrl.executeSort(isDesc, scope.predicate);
            };

            scope.clear = function () {
                tableFilterCtrl.executeInitialize();
            };

            scope.textSearch = function (text) {
                tableFilterCtrl.executeTextSearch(text, scope.predicate);
            };

            scope.showListingItem = function () {
                updateParentFilterContainer();
            };

            scope.showCheckedItem = function () {
                updateParentFilterContainer();
             };

            scope.$on('updateFilterInfo', function (event, filterInfoContainer) {
                tableFilterCtrl.getFilterInfoContainer()[scope.predicate] = filterInfoContainer[scope.predicate]
            });
        },
    };
});

main.value('THROTTLE_MILLISECONDS', null);

main.directive('infiniteScroll', [
  '$rootScope', '$window', '$interval', '$filter','THROTTLE_MILLISECONDS', function ($rootScope, $window, $interval, $filter, THROTTLE_MILLISECONDS) {

      return {
          scope: {
              original: '=',
              showing: '=',
              rownum: '=',
              infiniteScroll: '&',
              infiniteScrollContainer: '=',
              infiniteScrollDistance: '=',
              infiniteScrollDisabled: '=',
              infiniteScrollUseDocumentBottom: '=',
              infiniteScrollListenForEvent: '@'
          },
          link: function (scope, elem, attrs) {

              //append
              scope.infiniteScrollContainer = elem[0];
              scope.totalRows = scope.rownum;
              scope.infiniteScroll = function()
              {
                  scope.totalRows += scope.rownum;
                  scope.showing = $filter('limitTo')(scope.original, scope.totalRows, 0)
              }
              //append

              var changeContainer, checkWhenEnabled, container, handleInfiniteScrollContainer, handleInfiniteScrollDisabled, handleInfiniteScrollDistance, handleInfiniteScrollUseDocumentBottom, handler, height, immediateCheck, offsetTop, pageYOffset, scrollDistance, scrollEnabled, throttle, unregisterEventListener, useDocumentBottom, windowElement;
              windowElement = angular.element($window);
              scrollDistance = null;
              scrollEnabled = null;
              checkWhenEnabled = null;
              container = null;
              immediateCheck = true;
              useDocumentBottom = false;
              unregisterEventListener = null;
              height = function (elem) {
                  elem = elem[0] || elem;
                  if (isNaN(elem.offsetHeight)) {
                      return elem.document.documentElement.clientHeight;
                  } else {
                      return elem.offsetHeight;
                  }
              };
              offsetTop = function (elem) {
                  if (!elem[0].getBoundingClientRect || elem.css('none')) {
                      return;
                  }
                  return elem[0].getBoundingClientRect().top + pageYOffset(elem);
              };
              pageYOffset = function (elem) {
                  elem = elem[0] || elem;
                  if (isNaN(window.pageYOffset)) {
                      return elem.document.documentElement.scrollTop;
                  } else {
                      return elem.ownerDocument.defaultView.pageYOffset;
                  }
              };
              handler = function () {
                  var containerBottom, containerTopOffset, elementBottom, remaining, shouldScroll;
                  if (container === windowElement) {
                      containerBottom = height(container) + pageYOffset(container[0].document.documentElement);
                      elementBottom = offsetTop(elem) + height(elem);
                  } else {
                      containerBottom = height(container);
                      containerTopOffset = 0;
                      if (offsetTop(container) !== void 0) {
                          containerTopOffset = offsetTop(container);
                      }
                      elementBottom = offsetTop(elem) - containerTopOffset + height(elem);
                  }
                  if (useDocumentBottom) {
                      elementBottom = height((elem[0].ownerDocument || elem[0].document).documentElement);
                  }
                  remaining = elementBottom - containerBottom;
                  shouldScroll = remaining <= height(container) * scrollDistance + 1;
                  if (shouldScroll) {
                      checkWhenEnabled = true;
                      if (scrollEnabled) {
                          if (scope.$$phase || $rootScope.$$phase) {
                              return scope.infiniteScroll();
                          } else {
                              return scope.$apply(scope.infiniteScroll);
                          }
                      }
                  } else {
                      return checkWhenEnabled = false;
                  }
              };
              throttle = function (func, wait) {
                  var later, previous, timeout;
                  timeout = null;
                  previous = 0;
                  later = function () {
                      var context;
                      previous = new Date().getTime();
                      $interval.cancel(timeout);
                      timeout = null;
                      func.call();
                      return context = null;
                  };
                  return function () {
                      var now, remaining;
                      now = new Date().getTime();
                      remaining = wait - (now - previous);
                      if (remaining <= 0) {
                          clearTimeout(timeout);
                          $interval.cancel(timeout);
                          timeout = null;
                          previous = now;
                          return func.call();
                      } else {
                          if (!timeout) {
                              return timeout = $interval(later, remaining, 1);
                          }
                      }
                  };
              };
              if (THROTTLE_MILLISECONDS != null) {
                  handler = throttle(handler, THROTTLE_MILLISECONDS);
              }
              scope.$on('$destroy', function () {
                  container.unbind('scroll', handler);
                  if (unregisterEventListener != null) {
                      unregisterEventListener();
                      return unregisterEventListener = null;
                  }
              });
              handleInfiniteScrollDistance = function (v) {
                  return scrollDistance = parseFloat(v) || 0;
              };
              scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
              handleInfiniteScrollDistance(scope.infiniteScrollDistance);
              handleInfiniteScrollDisabled = function (v) {
                  scrollEnabled = !v;
                  if (scrollEnabled && checkWhenEnabled) {
                      checkWhenEnabled = false;
                      return handler();
                  }
              };
              scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
              handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
              handleInfiniteScrollUseDocumentBottom = function (v) {
                  return useDocumentBottom = v;
              };
              scope.$watch('infiniteScrollUseDocumentBottom', handleInfiniteScrollUseDocumentBottom);
              handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);
              changeContainer = function (newContainer) {
                  if (container != null) {
                      container.unbind('scroll', handler);
                  }
                  container = newContainer;
                  if (newContainer != null) {
                      return container.bind('scroll', handler);
                  }
              };
              changeContainer(windowElement);
              if (scope.infiniteScrollListenForEvent) {
                  unregisterEventListener = $rootScope.$on(scope.infiniteScrollListenForEvent, handler);
              }
              handleInfiniteScrollContainer = function (newContainer) {
                  if ((newContainer == null) || newContainer.length === 0) {
                      return;
                  }
                  if (newContainer instanceof HTMLElement) {
                      newContainer = angular.element(newContainer);
                  } else if (typeof newContainer.append === 'function') {
                      newContainer = angular.element(newContainer[newContainer.length - 1]);
                  } else if (typeof newContainer === 'string') {
                      newContainer = angular.element(document.querySelector(newContainer));
                  }
                  if (newContainer != null) {
                      return changeContainer(newContainer);
                  } else {
                      throw new Exception("invalid infinite-scroll-container attribute.");
                  }
              };
              scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
              handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
              if (attrs.infiniteScrollParent != null) {
                  changeContainer(angular.element(elem.parent()));
              }
              if (attrs.infiniteScrollImmediateCheck != null) {
                  immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
              }
              return $interval((function () {
                  if (immediateCheck) {
                      return handler();
                  }
              }), 0, 1);
          }
      };
  }
]);
/*
 * The controller for test application
 */
mainApp.controller("TestController", ['$scope', '$http', function($scope, $http) {

	$scope.dataUrl = 'data/testCases.json';
    
    $scope.filterOptions = {
        filterText: '',
        useExternalFilter: false
    }; 

    $scope.activateFilter = function() {
        $scope.gridOptions.filterOptions.filterText = '';
        var testSuite = $scope.filterTestSuite || null;
        if (testSuite) {
            $scope.filterOptions.filterText += 'TestSuite:' + testSuite + ';';
        }

        var testCase = $scope.filterTestCase || null;
        if (testCase) {
             $scope.filterOptions.filterText += 'TestCase:' + testCase + ';';
        }
    };

    $scope.totalServerItems = 0;

    $scope.pagingOptions = {
        pageSizes: [10, 50, 100],
        pageSize: 10,
        currentPage: 1
    };  

    $scope.setPagingData = function(data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.testCases = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.getPagedDataAsync = function (pageSize, page) {
        setTimeout(function () {
            var data;
            var testSuite = $scope.filterTestSuite || null;
            var testCase = $scope.filterTestCase || null;
            var needFilter = testSuite || testCase;

            if (needFilter) {
                $http.get($scope.dataUrl).success(function (largeLoad) {        
                    data = largeLoad.filter(function(item) {
                        var filterMatched = false;
                        
                        if (testSuite) {
                            filterMatched = item.TestSuite.indexOf(testSuite) != -1;
                        }

                        if (testCase) {
                            filterMatched = item.TestCase.indexOf(testCase) != -1;
                        }

                        return filterMatched;
                    });

                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get($scope.dataUrl).success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);
    
    $scope.gridOptions = {
        data: 'testCases',
        enablePaging: true,
        enableCellSelection: false,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,        
        columnDefs: [{ field: 'ID', width: 60, pinned: true },
                    { field: 'TestSuite', width: 200 },
                    { field: 'TestCase', width: 280 },
                    { field: 'TestArea', width: 120 },
                    { field: 'TestResult', width: 120 },
                    { field: 'Time', width: 80 },
                    { field: 'Message' }]
    };

}]);

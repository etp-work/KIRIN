/*
 * The controller for test application
 */
mainApp.controller("TestController", ['$scope', '$timeout', 'testService',
    function($scope, $timeout, testService) {

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

        $scope.getPagedDataAsync = function(pageSize, page) {
            $timeout(function() {
                var dataFilter = {
                    filterTestSuite: $scope.filterTestSuite,
                    filterTestCase: $scope.filterTestCase
                };
                testService.queryTestCases(dataFilter).then(function(data) {
                    $scope.setPagingData(data, page, pageSize);
                });
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function(newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, true);

        $scope.$watch('filterOptions', function(newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, true);

        $scope.gridOptions = {
            data: 'testCases',
            enablePaging: true,
            showFooter: true,
            showSelectionCheckbox: true,
            enableColumnResize: true,
            enableCellEdit: true,
            showColumnMenu: true,
            showFilter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            columnDefs: [{
                field: 'ID',
                width: 40,
                pinned: true
            }, {
                field: 'TestSuite',
                width: 160
            }, {
                field: 'TestCase',
                width: 200
            }, {
                field: 'TestArea',
                width: 100
            }, {
                field: 'TestResult',
                width: 100
            }, {
                field: 'Time',
                width: 60
            }, {
                field: 'Message'
            }]
        };

    }
]);
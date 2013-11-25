/*
 * The controller for test application
 */
mainApp.controller("TestController", ['$scope', function($scope) {
	
	$scope.gridOptions = {
        data: 'testCases',
        enablePinning: false,
        showGroupPanel: false,
        enableCellSelection: false,
        enableCellEdit: false,
        columnDefs: [{ field: "ID", width: 60, pinned: true },
                    { field: "TestCase", width: 280 },
                    { field: "TestSuite", width: 200 },
					{ field: "TestArea", width: 120 },
					{ field: "TestResult", width: 120 },
					{ field: "Time", width: 80 },
                    { field: "Message", width: 400 }]
    };

    $scope.testCases = [{ ID: "1", TestCase: "testGetAllChannels", TestSuite: "Channel_US3_Tests", TestArea: "Channels", TestResult: "OK", Time: 0.5, Message: "OK" },
    				{ ID: "2", TestCase: "testGetAllChannelsForSpecificDevice", TestSuite: "Channel_US3_Tests", TestArea: "Channels", TestResult: "OK", Time: 0.2, Message: "OK" },
                    { ID: "3", TestCase: "testGetPlayableChannels", TestSuite: "Channel_US4_Tests", TestArea: "Channels", TestResult: "OK", Time: 0.4, Message: "OK" }];
}]);

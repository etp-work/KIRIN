/*
 * The service module for test application
 */
mainApp.service('testService', ['$resource', '$q', 'preMgr',
	function($resource, $q, preMgr) {
		var dataUrl = '/public/test/data.ajax';
		var runTestUrl = "/public/test/startTest.ajax?async=ture";

		//var testCaseResource = $resource('data/testCases.json');
		var testCaseResource = $resource(preMgr.get('testServer') + dataUrl);
		var runTestResource = $resource(preMgr.get('testServer') + runTestUrl);

		function getTestSuiteName(testSuiteId){
			var ids = testSuiteId.split('.');
            return ids[ids.length - 1];
		}

		function getTestResults(results){
			var testResults = [];
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				var testResult = {
					ID: result.caseId,
					TestSuite: getTestSuiteName(result.testSuiteId),
					TestCase: result.testCaseName,
					TestArea: result.area,
					TestResult: result.result,
					Time: result.time,
					Message: result.message
				};
				testResults.push(testResult);
			};
			return testResults;
		}

		this.runTestCases = function (testCases){
			var deferred = $q.defer();
			var cases = '';
			for (var i = 0; i < testCases.length; i++) {
				cases += '|' + testCases[i].ID;
			}
			if(cases.length > 0){
				cases = cases.substring(1);
			}
			runTestResource.query({cases: cases});
			return deferred.promise;
		};

		this.queryTestCases = function (dataFilter) {
			var deferred = $q.defer();
			var testSuite = dataFilter.filterTestSuite || null;
			var testCase = dataFilter.filterTestCase || null;
			var needFilter = testSuite || testCase;
			testCaseResource.query(function(result) {
				var data = result[0].results;

				if (needFilter) {
					var filteredData = data.filter(function(item) {
						var filterMatched = false;

						if (testSuite) {
							filterMatched = item.TestSuite.indexOf(testSuite) != -1;
						}

						if (testCase) {
							filterMatched = item.TestCase.indexOf(testCase) != -1;
						}

						return filterMatched;
					});
					deferred.resolve(getTestResults(filteredData));
				}

				deferred.resolve(getTestResults(data));
			});

			return deferred.promise;
		};
	}
]);
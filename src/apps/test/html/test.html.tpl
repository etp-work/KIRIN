<form class="navbar-form" role="search">
    <div class="form-group">
        <input type="text" class="form-control" placeholder="TestSuite Filter" ng-model="filterTestSuite">
    </div>
    <div class="form-group">
        <input type="text" class="form-control" placeholder="TestCase Filter" ng-model="filterTestCase">
    </div>
    <button class="btn btn-default" ng-click="activateFilter()"><span class="glyphicon glyphicon-search"></span></button>
</form>
<H1 />
<div class="gridStyle" ng-grid="gridOptions"></div>
	
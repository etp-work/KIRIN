<form class="navbar-form" role="search">
    <div class="form-group col-sm-3">
        <input type="text" class="form-control" placeholder="Test Suite Filter" ng-model="filterTestSuite">
    </div>
    <div class="form-group col-sm-3">
        <input type="text" class="form-control" placeholder="Test Case Filter" ng-model="filterTestCase">
    </div>
    <button class="btn btn-default" ng-click="activateFilter()"><span class="glyphicon glyphicon-search"></span></button>
</form>
<H1 />
<div class="gridStyle" ng-grid="gridOptions"></div>
	
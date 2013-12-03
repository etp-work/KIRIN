<div id="clean" class="container">
    <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-3">
            <ul class="nav nav-pills nav-stacked" ki-divselector>
                <li><a href="#/widget">Widget Cache</a></li>
                <li><a href="#/tomcat">Tomcat Wars</a></li>
            </ul>
        </div>
        <div id="widget" class="col-lg-9 col-md-9 col-sm-9">
            <div class="list-group listblock">
                <a href="#" class="list-group-item" ng-repeat="cache in caches"><span class="glyphicon" ki-itemchecker="cache"></span>&nbsp;&nbsp;<span ng-bind="cache.name"></span></a>
            </div>
        </div>
        <div id="tomcat" class="col-lg-9 col-md-9 col-sm-9" style="display:none">
            <div class="list-group listblock">
                <a href="#" class="list-group-item" ng-repeat="war in wars"><span class="glyphicon" ki-itemchecker="war"></span>&nbsp;&nbsp;<span ng-bind="war.name"></span></a>
            </div>
        </div>
    </div>
</div>
<div class="setting">
    <form class="form-horizontal" role="form">
        <div class="form-group">
            <label class="col-sm-2 control-label">Workspace</label>
            <div class="input-group col-sm-10">
                <input type="text" ng-model="mcsPath" class="form-control" placeholder="Path of portal-team repository...">
                <span class="input-group-addon" ki-tooltips data-placement="right" data-container="body" title="Set full path of the repository here."><i class="fa fa-folder"></i></span>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">Tomcat</label>
            <div class="input-group col-sm-10">
                <input type="text" ng-model="tomcatPath" class="form-control" placeholder="Path of tomcat folder...">
                <span class="input-group-addon" ki-tooltips data-placement="right" data-container="body" title="Set full path of the tomcat here."><i class="fa fa-folder-o"></i></span>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">TestServer</label>
            <div class="input-group col-sm-10">
                <input type="text" ng-model="testServer" class="form-control" placeholder="URL of test server...">
                <span class="input-group-addon" ki-tooltips data-placement="right" data-container="body" title="Set url of the test server here."><i class="fa fa-cloud"></i></span>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <input type="button" class="btn btn-default" ng-click="save()" ki-dirtycheck='mcsPath, tomcatPath, testServer' value="Save"/>
            </div>
        </div>
    </form>
</div>
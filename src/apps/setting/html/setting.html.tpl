<div class="setting">
    <form class="form-horizontal" role="form">
        <div class="form-group">
            <label class="col-sm-2 control-label">Workspace</label>
            <div class="input-group col-sm-10">
                <input type="text" ng-model="mcsPath" class="form-control" placeholder="Path of portal-team repository...">
                <span class="input-group-addon" bts-tooltips data-placement="right" data-container="body" title="Set full path of the repository here."><i class="fa fa-folder"></i></span>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">Tomcat</label>
            <div class="input-group col-sm-10">
                <input type="text" ng-model="tomcatPath" class="form-control" placeholder="Path of tomcat folder...">
                <span class="input-group-addon" bts-tooltips data-placement="right" data-container="body" title="Set full path of the tomcat here."><i class="fa fa-folder-o"></i></span>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" class="btn btn-default" ng-click="save()">Save</button>
            </div>
        </div>
    </form>
</div>
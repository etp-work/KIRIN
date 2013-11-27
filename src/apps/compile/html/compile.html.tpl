<ul class="nav nav-list nav-pills nav-stacked module-tree">
  <li ng-repeat="row in tree_rows | filter:{visible:true} track by row.branch.uid" ng-animate="'module-tree-animate'" ng-class="'level-' + {{ row.level }} + (row.branch.selected ? ' active':'')" class="module-tree-row">
    <a ng-click="user_clicks_branch(row.branch)">
      <i ng-class="row.tree_icon" ng-click="row.branch.expanded = !row.branch.expanded;$event.stopPropagation()" class="indented tree-icon fa fa-lg"> </i>
      <i ng-class="row.tree_check" class="indented tree-icon fa"> </i>
      <span class="indented tree-label">{{ row.label }}</span>
    </a>
  </li>
</ul>
mainApp.directive('kiModuleTree', function ($timeout) {
  return {
    restrict: 'E',
    templateUrl: '../html/module_tree_template.html',
    scope: {
      treeData: '=',
      onSelect: '&',
      initialSelection: '='
    },
    link: function (scope, element, attrs) {
      var expand_level, for_each_branch, on_treeData_change, select_branch;
      var selected_branch, branch_check_toggle, branch_item_check_toggle;
      var BRANCH_CHECKED_STATUS = 1;
      var BRANCH_PART_CHECKED_STATUS = 0;
      var BRANCH_UNCHECKED_STATUS = -1;
      
      if (!attrs.iconExpand) {
        attrs.iconExpand = 'icon-caret-right';
      }
      if (!attrs.iconCollapse) {
        attrs.iconCollapse = 'icon-caret-down';
      }
      if (!attrs.iconUnCheck) {
        attrs.iconUnCheck = 'icon-unchecked';
      }
      if (!attrs.iconPartCheck) {
        attrs.iconPartCheck = 'icon-check-minus';
      }
      if (!attrs.iconCheck) {
        attrs.iconCheck = 'icon-check';
      }
      if (!attrs.expandLevel) {
        attrs.expandLevel = '3';
      }
      expand_level = parseInt(attrs.expandLevel, 10);
      scope.header = attrs.header;
      if (!scope.treeData) {
        console.log('no treeData defined for the tree!');
        return;
      }
      if (!scope.treeData || scope.treeData.length === 0) {
        /*if (treeData.label !== null) {
          scope.treeData = [treeData];
        } */
        console.log('treeData should be an array of root branches');
        return;
      }
      for_each_branch = function (f) {
        var do_f, root_branch, _i, _len, _ref, _results;
        do_f = function (branch, level) {
          var child, _i, _len, _ref, _results;
          f(branch, level);
          if (branch.children && branch.children.length > 0) {
            _ref = branch.children;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              child = _ref[_i];
              _results.push(do_f(child, level + 1));
            }
            return _results;
          }
        };
        _ref = scope.treeData;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          root_branch = _ref[_i];
          _results.push(do_f(root_branch, 1));
        }
        return _results;
      };
      for_each_branch(function (b, level) {
        b.level = level;
        b.expanded = b.level < expand_level;
        return b.expanded;
      });
      get_parent_branch_by_parent_id = function (parentId) {
        for_each_branch(function(b, l) { // argument; branch, level
          if (b.id === parentId) {
            var children_branch = b.children;
            for (i = 0; i < children_branch.length; i++) {
              if (children_branch[0].check_status === children_branch[i].check_status) {
                branch_item_check_toggle(b, b.children[0].check_status);
              } else {
                branch_item_check_toggle(b, BRANCH_PART_CHECKED_STATUS);
                break;
              }
            }
            get_parent_branch_by_parent_id(b.parentId);
          }
        });
      };
      branch_check_toggle = function (branch, status) {
        var i, check;
        if (!branch) {
          return;
        }
        check = branch_item_check_toggle(branch, status); // toggle current node

        get_parent_branch_by_parent_id(branch.parentId); // toggle parent node
        
        var children = branch.children;  // toggle all sub node
        if (children && children.length !== 0) {
          for (i = 0; i < children.length; i++) {
            branch_check_toggle(children[i], check);
          }
        }
      };
      branch_item_check_toggle = function (branch, status) {
        var check, checkClass;
        if (status !== undefined) {
          check = status;
        } else {
          check = branch.check_status;
          if (!check || check === BRANCH_UNCHECKED_STATUS) {
            check = BRANCH_CHECKED_STATUS;
          } else {
            check = BRANCH_UNCHECKED_STATUS;
          }
        }
        branch.check_status = check;
        return check;
      };
      selected_branch = null;
      select_branch = function (branch) {
        if (branch !== selected_branch) {
          if (selected_branch) {
            selected_branch.selected = false;
          }
          branch.selected = true;

          selected_branch = branch;
          if (branch.onSelect) {
            $timeout(function () {
              branch.onSelect(branch);
            });
          } else {
            if (scope.onSelect) {
              $timeout(function () {
                scope.onSelect({
                  branch: branch
                });
              });
            }
          }
        }
      };
      scope.user_clicks_branch = function (branch) {
        branch_check_toggle(branch);

        if (branch !== selected_branch) {
          return select_branch(branch);
        }
      };
      scope.tree_rows = [];
      on_treeData_change = function () {
        var add_branch_to_list, root_branch, _i, _len, _ref, _results;
        scope.tree_rows = [];
        for_each_branch(function (branch) {
          if (branch.children) {
            if (branch.children.length > 0) {
              branch.children = branch.children.map(function (e) {
                var result;
                if (typeof e === 'string') {
                  result = {
                    label: e,
                    children: []
                  };
                } else {
                  result = e;
                }
                return result;
              });
            }
          } else {
            branch.children = [];
          }
        });
        for_each_branch(function (b, level) {
          if (!b.uid) {
            b.uid = Math.random().toString();
          }
        });
        add_branch_to_list = function (level, branch, visible) {
          var child, child_visible, tree_icon, status, _i, _len, _ref, _results;
          if (!branch.expanded) {
            branch.expanded = false;
          }
          if (branch.children && branch.children.length !== 0) {
            if (branch.expanded) {
              tree_icon = attrs.iconCollapse;
            } else {
              tree_icon = attrs.iconExpand;
            }
          }

          status = branch.check_status;
          switch(branch.check_status) {
            case 1:
              branch.tree_check = attrs.iconCheck;
              break;
            case 0:
              branch.tree_check = attrs.iconPartCheck;
              break;
            default:
              branch.check_status = BRANCH_UNCHECKED_STATUS;
              branch.tree_check = attrs.iconUnCheck;
              break;
          }

          scope.tree_rows.push({
            level: level,
            branch: branch,
            label: branch.label,
            tree_icon: tree_icon,
            visible: visible,
            tree_check: branch.tree_check,
            check_status: branch.check_status
          });
          if (branch.children) {
            _ref = branch.children;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              child = _ref[_i];
              child_visible = visible && branch.expanded;
              _results.push(add_branch_to_list(level + 1, child, child_visible));
            }
            return _results;
          }
        };
        _ref = scope.treeData;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          root_branch = _ref[_i];
          _results.push(add_branch_to_list(1, root_branch, true));
        }
        return _results;
      };
      if (attrs.initialSelection) {
        for_each_branch(function (b) {
          if (b.label === attrs.initialSelection) {
            return select_branch(b);
          }
        });
      }
      return scope.$watch('treeData', on_treeData_change, true);
    }
  };
});

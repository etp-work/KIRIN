/*
 * The controller for compile application
 */
mainApp.controller("CompileController", ['$scope', function ($scope, $timeout) {
  var get_checked_item, for_each_branch, on_treeData_change;
  var branch_check_toggle, branch_item_check_toggle, get_parent_branch_by_parent_id;

  var BRANCH_CHECKED_STATUS = 1;
  var BRANCH_PART_CHECKED_STATUS = 0;
  var BRANCH_UNCHECKED_STATUS = -1;

  var iconExpand = 'fa-caret-right';
  var iconCollapse = 'fa-caret-down';
  var iconUnCheck = 'fa-square-o';
  var iconPartCheck = 'fa-minus-square-o';
  var iconCheck = 'fa-check-square-o';
  var expandLevel = 3;
  var selected_branch;

  get_checked_item = function (branch) {
    var i, children, list = [];
    var curCheckedStatus = branch.check_status;
    if (curCheckedStatus !== undefined && curCheckedStatus === 1) {
      list.push({"name": branch.label});
    } else if (curCheckedStatus === undefined || curCheckedStatus === 0) {
      if (branch.children && branch.children.length !== 0) {
        children = branch.children;
      } else if (branch && branch.length !== 0) {
        children = branch;
      }
      if (children && children.length) {
        for (i = 0; i < children.length; i++) {
          list = list.concat(get_checked_item(children[i]));
        }
      }
    }
    return list;
  };
  $scope.get_checked_item_list = function () {
    var selectList = [];
    selectList = get_checked_item($scope.example_treedata);
    $scope.select_output = selectList;
  };

  
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
    _ref = $scope.treeData;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      root_branch = _ref[_i];
      _results.push(do_f(root_branch, 1));
    }
    return _results;
  };
  get_parent_branch_by_parent_id = function (parentId) {
    var i;
    for_each_branch(function (b, l) { // argument; branch, level
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
  branch_item_check_toggle = function (branch, status) {
    var check;
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
  on_treeData_change = function () {
    var add_branch_to_list, root_branch, _i, _len, _ref, _results;
    $scope.tree_rows = [];
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
          tree_icon = iconCollapse;
        } else {
          tree_icon = iconExpand;
        }
      }

      status = branch.check_status;
      switch (branch.check_status) {
      case 1:
        branch.tree_check = iconCheck;
        break;
      case 0:
        branch.tree_check = iconPartCheck;
        break;
      default:
        branch.check_status = BRANCH_UNCHECKED_STATUS;
        branch.tree_check = iconUnCheck;
        break;
      }

      $scope.tree_rows.push({
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
    _ref = $scope.treeData;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      root_branch = _ref[_i];
      _results.push(add_branch_to_list(1, root_branch, true));
    }
    return _results;
  };
  $scope.user_clicks_branch = function (branch) {
    branch_check_toggle(branch);

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
        if ($scope.onSelect) {
          $timeout(function () {
            $scope.onSelect({
              branch: branch
            });
          });
        }
      }
    }
  };
  $scope.treeData = [
    {
      id: "1",
      parentId: "0",
      label: 'Animal',
      children: [
        {
          id: "101",
          parentId: "1",
          label: 'Dog',
          data: {
            description: "man's best friend"
          }
        }, {
          id: "102",
          parentId: "1",
          label: 'Cat',
          data: {
            description: "Felis catus"
          }
        }, {
          id: "103",
          parentId: "1",
          label: 'Hippopotamus',
          data: {
            description: "hungry, hungry"
          }
        }, {
          id: "104",
          parentId: "1",
          label: 'Chicken',
          children: [
            {
              id: "10401",
              parentId: "104",
              label: 'White Leghorn'
            }, {
              id: "10402",
              parentId: "104",
              label: 'Rhode Island Red'
            }, {
              id: "10403",
              parentId: "104",
              label: 'Jersey Giant'
            }]
        }
      ]
    }, {
      id: "2",
      parentId: "0",
      label: 'Vegetable',
      children: [
        {
          id: "201",
          parentId: "2",
          label: 'Oranges'
        }, {
          id: "202",
          parentId: "2",
          label: 'Apples',
          children: [
            {
              id: "20201",
              parentId: "202",
              label: 'Granny Smith'
            }, {
              id: "20202",
              parentId: "202",
              label: 'Red Delicous'
            }, {
              id: "20203",
              parentId: "202",
              label: 'Fuji'
            }]
        }
      ]
    }, {
      id: "3",
      parentId: "0",
      label: 'Mineral',
      children: [
        {
          id: "301",
          parentId: "3",
          label: 'Rock',
          children: [
            {
              id: "30101",
              parentId: "301",
              label: 'Igneous'
            }, {
              id: "30102",
              parentId: "301",
              label: 'Sedimentary'
            }, {
              id: "30103",
              parentId: "301",
              label: 'Metamorphic'
            }]
        }, {
          id: "302",
          parentId: "3",
          label: 'Metal',
          children: [
            {
              id: "30201",
              parentId: "302",
              label: 'Aluminum'
            }, {
              id: "30202",
              parentId: "302",
              label: 'Steel'
            }, {
              id: "30203",
              parentId: "302",
              label: 'Copper'
            }]
        }, {
          id: "303",
          parentId: "3",
          label: 'Plastic',
          children: [
            {
              id: "30301",
              parentId: "303",
              label: 'polyethylene',
              children: [
                {
                  id: "3030101",
                  parentId: "30301",
                  label: 'polypropylene'
                }, {
                  id: "3030102",
                  parentId: "30301",
                  label: 'polystyrene'
                }, {
                  id: "3030103",
                  parentId: "30301",
                  label: ' polyvinyl chloride'
                }]
            }, {
              id: "30302",
              parentId: "303",
              label: 'Thermosetting Polymer',
              children: [
                {
                  id: "3030201",
                  parentId: "30302",
                  label: 'polyester'
                }, {
                  id: "3030202",
                  parentId: "30302",
                  label: 'polyurethane'
                }, {
                  id: "30302103",
                  parentId: "30302",
                  label: 'vulcanized rubber'
                }, {
                  id: "3030202",
                  parentId: "30302",
                  label: 'bakelite'
                }, {
                  id: "3030203",
                  parentId: "30302",
                  label: 'urea-formaldehyde'
                }]
            }
          ]
        }
      ]
    }
  ];

  if (!$scope.treeData) {
    console.log('no treeData defined for the tree!');
    return;
  }
  if (!$scope.treeData || $scope.treeData.length === 0) {
    /*if (treeData.label !== null) {
      $scope.treeData = [treeData];
    } */
    console.log('treeData should be an array of root branches');
    return;
  }
  for_each_branch(function (b, level) {
    b.level = level;
    b.expanded = b.level < expandLevel;
  });

  $scope.$watch('treeData', on_treeData_change, true);
}]);
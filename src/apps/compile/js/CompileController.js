/*
 * The controller for compile application
 */
mainApp.controller("CompileController", ['$scope',
    function($scope) {
      var apple_selected, load_metadata, get_checked_item;
      get_checked_item = function(branch) {
        var children, list = [];
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
            for (var i = 0; i < children.length; i++) {
              list = list.concat(get_checked_item(children[i]));
            }
          }
        }
        
        return list;
      };
      $scope.example_treedata = function() {
        return [
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
      };
      $scope.get_checked_item_list = function() {
        var selectList = [];
        selectList = get_checked_item($scope.example_treedata);
        $scope.select_output = selectList;
      };
    }
]);
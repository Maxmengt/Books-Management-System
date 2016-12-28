'use strict';

// 为adminApp模块（后台管理）定义控制器
adminApp.controller('adminCtrl', ['$scope', '$http', function($scope, $http) {

}]);

// 后台管理模块左侧导航栏控制器
adminApp.controller('navCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        /**
         * 需求：默认为显示导航第一个功能，点击导航切换右侧页面，且高亮当前导航项
         */

        // 设定功能名称
        var navGroups = [{
            navName: '添加类别', // 显示的名称
            urlName: 'addType' // 对应URL的名称
        }, {
            navName: '管理全部类别',
            urlName: 'seeAllType'
        }, {
            navName: '添加书籍',
            urlName: 'addBook'
        }, {
            navName: '管理全部书籍',
            urlName: 'seeAllBook'
        }, {
            navName: '查看入库记录',
            urlName: 'seeAllInStock'
        }, {
            navName: '查看出售记录',
            urlName: 'seeAllSold'
        }];
        $scope.navGroups = navGroups;
    }
]);

// 添加类别
adminApp.controller('addBookType', ['$scope', '$http',
    function($scope, $http) {
        // 检验通过
        $scope.addType = function(valid, event) {
            $scope.formData = {
                typeName: $scope.typeName
            };
            if( valid ) {
                // 发送数据到后台
                $http({
                    method: 'POST',
                    url: '/addType',
                    headers: {
                        // 表单的报头格式
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param($scope.formData) // 发送user数据到后台，这里用到了jQ
                }).then(function successCallback(response) {
                    if (response.status === 200) {
                        $scope.typeName = "";
                        alert(response.data.success);
                    }
                }, function errorCallback(response) {
                    alert("添加书籍类别失败");
                });
            }
        }
    }
]);

// 查看全部类别
adminApp.controller('seeAllType', ['$scope', '$http',
    function($scope, $http) {
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [10],
            pageSize: 10,
            currentPage: 1
        };

        // 设置页面数据
        $scope.setPagingData = function(data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.bookTypes = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        // 异步获取页面数据
        $scope.getPagedDataAsync = function(pageSize, page, searchText) {
            setTimeout(function() {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('/seeAllType')
                        .success(function(largeLoad) {
                            data = largeLoad.filter(function(item) {
                                return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                            });
                            $scope.setPagingData(data, page, pageSize);
                        });
                } else {
                    $http({
                        method: 'GET',
                        url: '/seeAllType'
                    }).then(function successCallback(response) {
                        if (response.status === 200) {
                            $scope.setPagingData(response.data, page, pageSize);
                        }
                    }, function errorCallback(response) {
                        alert("获取书籍类别数据失败");
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        // 监听页面设置
        $scope.$watch('pagingOptions', function(newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridOptions = {
            data: 'bookTypes',
            rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                '<div ng-cell></div>' +
                '</div></div>',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true, // 双击修改，单击选中
            enablePinning: true, // 列固定
            columnDefs: [{
                field: 'Type_id',
                displayName: 'id',
                width: '10%',
                pinnable: false,
                sortable: true,
                enableCellEdit: false
            }, {
                field: 'Type_name',
                displayName: '类别名',
                enableCellEdit: true,
                pinnable: false,
                sortable: false,
                width: '30%'
            }, {
                field: 'Type_id',
                displayName: '修改',
                enableCellEdit: false,
                sortable: false,
                pinnable: false,
                width: '30%',
                cellTemplate: '<div><a class="btn btn-xs btn-success feng-btn-modify" ng-click="updateType(row)"  data="{{row.getProperty(col.field)}}">确认修改</a></div>'
            }, {
                field: 'Type_id',
                displayName: '删除',
                enableCellEdit: false,
                sortable: false,
                pinnable: false,
                width: '30%',
                cellTemplate: '<div><a class="btn btn-xs btn-danger feng-btn-delete" ng-click="deleteType(row)" data="{{row.getProperty(col.field)}}">删除</a></div>'
                    // ng-click时间触发的时候传入row
            }],
            enablePaging: true,
            showFooter: true,
            showGroupPanel: false,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
        };

        $scope.updateType = function(row) {
            // 包装数据传递到后台
            var obj = {
                id: row.entity.Type_id,
                typeName: row.entity.Type_name
            };
            //  console.log($.param(obj))
            $http.put('/seeAllType/' + obj.id, obj).success(function(data, status) {
                if (status === 200) {
                    alert(data.success);
                }
            });
        };

        $scope.deleteType = function(row) {
            $http.delete('/seeAllType/' + row.entity.Type_id).success(function(data, status) {
                if (status === 200) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                    alert(data.success);
                }
            });
        };
    }
]);

// 添加书籍
adminApp.controller('addBook', ['$scope', '$http',
    function($scope, $http) {
        // 对类别进行加载
        $http.get('/seeAllType')
            .success(function(largeLoad) {
                $scope.types = largeLoad;
            });

        // 提交的时候
        $scope.addBook = function(valid, event) {
            $scope.formData = {
                bookName: $scope.bookName,
                writer: $scope.writer,
                typeId: $scope.typeId, // 类别
                price: $scope.price,
                pubCompany: $scope.pubCompany,
                pubDate: $scope.pubDate,
                currentNum: $scope.currentNum,
            };

            // 检验通过
            if (valid) {
                // 发送数据到后台
                $http({
                    method: 'POST',
                    url: '/addBook',
                    headers: {
                        // 表单的报头格式
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param($scope.formData) // 发送user数据到后台，这里用到了jQ
                }).then(function successCallback(response) {
                    if (response.status === 200) {
                        // 添加成功，清空输入项
                        for (var p in $scope.formData) {
                            $scope[p] = '';
                        }
                        alert(response.data.success);
                    }
                }, function errorCallback(response) {
                    alert("添加书籍类别失败");
                });
            }
        }
    }
]);

// 查看全部书籍
adminApp.controller('seeAllBook', ['$scope', '$http',
    function($scope, $http) {
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [10],
            pageSize: 10,
            currentPage: 1
        };

        // 设置页面数据
        $scope.setPagingData = function(data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.books = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        // 异步获取页面数据
        $scope.getPagedDataAsync = function(pageSize, page, searchText) {
            setTimeout(function() {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    // 获取模拟的书籍json文件
                    $http.get('/seeAllBook')
                        .success(function(largeLoad) {
                            data = largeLoad.filter(function(item) {
                                return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                            });
                            $scope.setPagingData(data, page, pageSize);
                        });
                } else {
                    $http({
                        method: 'GET',
                        url: '/seeAllBook'
                    }).then(function successCallback(response) {
                        console.log(response);
                        if (response.status === 200) {
                            $scope.setPagingData(response.data, page, pageSize);
                        }
                    }, function errorCallback(response) {
                        alert("获取书籍数据失败");
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        // 监听页面设置
        $scope.$watch('pagingOptions', function(newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridOptions = {
            data: 'books',
            rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                '<div ng-cell></div>' +
                '</div></div>',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true, // 双击修改，单击选中
            enablePinning: true, // 列固定
            enableColumnResize: true, // 可以更改列宽度
            columnDefs: [{
                field: 'Book_id',
                displayName: 'id',
                width: '5%',
                pinnable: false,
                sortable: true,
                enableCellEdit: false
            }, {
                field: 'Book_name',
                displayName: '书名',
                pinnable: false,
                sortable: false,
                enableCellEdit: true
            }, {
                field: 'Writer',
                displayName: '作者',
                pinnable: false,
                sortable: false,
                enableCellEdit: true,
                width: '15%'
            }, {
                field: 'Type_name',
                displayName: '类别',
                pinnable: false,
                sortable: false,
                enableCellEdit: false,
                width: '5%'
            }, {
                field: 'Type_id',
                displayName: '类别id',
                visible: false // 隐藏列，方便后面修改数据
            }, {
                field: 'Price',
                displayName: '价格',
                pinnable: false,
                sortable: false,
                enableCellEdit: true,
                width: '6%'
            }, {
                field: 'Pub_company',
                displayName: '出版社',
                pinnable: false,
                sortable: false,
                enableCellEdit: true,
                width: '16%'
            }, {
                field: 'Pub_date',
                displayName: '出版日期',
                pinnable: false,
                sortable: false,
                enableCellEdit: true,
                cellFilter: 'date:\'yyyy-MM-dd\'', // 过滤器，格式化日期
                width: '10%'
            }, {
                field: 'Current_num',
                displayName: '现有',
                pinnable: false,
                sortable: false,
                enableCellEdit: true,
                width: '5%'
            }, {
                field: 'Book_id',
                displayName: '修改',
                enableCellEdit: false,
                sortable: false,
                pinnable: false,
                width: '6%',
                //  width: 120,
                cellTemplate: '<div><a class="btn btn-xs btn-success feng-btn-modify" ng-click="updateBook(row)"  data="{{row.getProperty(col.field)}}">修改</a></div>'
            }, {
                field: 'Book_id',
                displayName: '删除',
                enableCellEdit: false,
                sortable: false,
                pinnable: false,
                //  width: 120,
                width: '6%',
                cellTemplate: '<div><a class="btn btn-xs btn-danger feng-btn-delete" ng-click="deleteBook(row)" data="{{row.getProperty(col.field)}}">删除</a></div>'
                    // ng-click时间触发的时候传入row
            }],
            enablePaging: true,
            showFooter: true,
            showGroupPanel: true, // 顶部的分组选项，可以拖拽列
            //  jqueryUITheme: true, // 更换主题，需要jq-ui-theme文件
            //  selectedItems: $scope.mySelections,
            //  multiSelect: false, // 多选
            totalServerItems: 'totalServerItems',
            //  enableCellSelection: true, 
            pagingOptions: $scope.pagingOptions,
        };

        $scope.updateBook = function(row) {
            // 包装数据传递到后台
            var obj = {
                id: row.entity.Book_id,
                bookName: row.entity.Book_name,
                writer: row.entity.Writer,
                typeId: row.entity.Type_id, // 类别id
                typeName: row.entity.Type_name, // 类别名
                price: row.entity.Price,
                pubCompany: row.entity.Pub_company,
                pubDate: new Date(row.entity.Pub_date).toLocaleDateString(),
                currentNum: row.entity.Current_num,
            };
            //  console.log(obj);
            $http.put('/seeAllBook/' + obj.id, obj).success(function(data, status) {
                if (status === 200) {
                    alert(data.success);
                }
            });
        };

        $scope.deleteBook = function(row) {
            $http.delete('/seeAllBook/' + row.entity.Book_id).success(function(data, status) {
                if (status === 200) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                    alert(data.success);
                }
            });
        };
    }
]);

// 查看入库记录
adminApp.controller('seeAllInStock', ['$scope', '$http',
    function($scope, $http) {
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [10],
            pageSize: 10,
            currentPage: 1
        };

        // 设置页面数据
        $scope.setPagingData = function(data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.instocks = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        // 异步获取页面数据
        $scope.getPagedDataAsync = function(pageSize, page, searchText) {
            setTimeout(function() {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('/seeAllInStock')
                        .success(function(largeLoad) {
                            data = largeLoad.filter(function(item) {
                                return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                            });
                            $scope.setPagingData(data, page, pageSize);
                        });
                } else {
                    $http({
                        method: 'GET',
                        url: '/seeAllInStock'
                    }).then(function successCallback(response) {
                        if (response.status === 200) {
                            $scope.setPagingData(response.data, page, pageSize);
                        }
                    }, function errorCallback(response) {
                        alert("获取书籍入库记录数据失败");
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        // 监听页面设置
        $scope.$watch('pagingOptions', function(newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridOptions = {
            data: 'instocks',
            rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                '<div ng-cell></div>' +
                '</div></div>',
            multiSelect: false,
            enableCellSelection: false,
            enableRowSelection: true,
            enableCellEdit: false,
            enablePinning: true,
            columnDefs: [{
                field: 'Instock_id',
                displayName: 'id',
                width: '10%',
                pinnable: false,
                sortable: true,
                enableCellEdit: false
            }, {
                field: 'Book_name',
                displayName: '书名',
                enableCellEdit: false,
                pinnable: false,
                sortable: false,
                width: '35%'
            }, {
                field: 'Admin_name',
                displayName: '管理员',
                enableCellEdit: false,
                pinnable: false,
                sortable: true,
                width: '15%'
            }, {
                field: 'Instock_num',
                displayName: '数量',
                enableCellEdit: false,
                pinnable: false,
                sortable: false,
                width: '10%'
            }, {
                field: 'Instock_date',
                displayName: '入库日期',
                cellFilter: 'date:\'yyyy-MM-dd\'',
                enableCellEdit: false,
                pinnable: false,
                sortable: true,
                width: '30%'
            }],
            enablePaging: true,
            showFooter: true,
            showGroupPanel: false,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
        };
    }
]);

// 查看出售记录
adminApp.controller('seeAllSold', ['$scope', '$http',
    function($scope, $http) {
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [10],
            pageSize: 10,
            currentPage: 1
        };

        // 设置页面数据
        $scope.setPagingData = function(data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.solds = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        // 异步获取页面数据
        $scope.getPagedDataAsync = function(pageSize, page, searchText) {
            setTimeout(function() {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('/seeAllSold')
                        .success(function(largeLoad) {
                            data = largeLoad.filter(function(item) {
                                return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                            });
                            $scope.setPagingData(data, page, pageSize);
                        });
                } else {
                    $http({
                        method: 'GET',
                        url: '/seeAllSold'
                    }).then(function successCallback(response) {
                        if (response.status === 200) {
                            $scope.setPagingData(response.data, page, pageSize);
                        }
                    }, function errorCallback(response) {
                        alert("获取书籍出售记录数据失败");
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        // 监听页面设置
        $scope.$watch('pagingOptions', function(newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridOptions = {
            data: 'solds',
            rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                '<div ng-cell></div>' +
                '</div></div>',
            multiSelect: false,
            enableCellSelection: false,
            enableRowSelection: true,
            enableCellEdit: false,
            enablePinning: true,
            columnDefs: [{
                field: 'Sold_id',
                displayName: 'id',
                width: '10%',
                pinnable: false,
                sortable: true,
                enableCellEdit: false
            }, {
                field: 'Book_name',
                displayName: '书名',
                enableCellEdit: false,
                pinnable: false,
                sortable: false,
                width: '35%'
            }, {
                field: 'Admin_name',
                displayName: '管理员',
                enableCellEdit: false,
                pinnable: false,
                sortable: true,
                width: '15%'
            }, {
                field: 'Sold_num',
                displayName: '数量',
                enableCellEdit: false,
                pinnable: false,
                sortable: false,
                width: '10%'
            }, {
                field: 'Sold_date',
                displayName: '出售日期',
                cellFilter: 'date:\'yyyy-MM-dd\'',
                enableCellEdit: false,
                pinnable: false,
                sortable: true,
                width: '30%'
            }],
            enablePaging: true,
            showFooter: true,
            showGroupPanel: false,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
        };
    }
]);
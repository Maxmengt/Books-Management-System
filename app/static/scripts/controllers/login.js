'use strict';

var booksManagementSystemApp = angular.module('booksManagementSystemApp');
booksManagementSystemApp.controller('LoginCtrl', ['$scope', '$http',
    function($scope, $http) {
        /*
            参数分别为检验
            表单
            事件
         */
        $scope.submitForm = function(valid, event) {
            if (valid) {
                var form = event.target
                form.action = '/loginData';
                form.method = 'POST';
                form.submit();
            }
        };
    }
]);

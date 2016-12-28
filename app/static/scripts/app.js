'use strict';

//登陆模块，index
var booksManagementSystemApp = angular.module('booksManagementSystemApp', ['ui.router']);

booksManagementSystemApp.config(function($stateProvider, $urlRouterProvider) { //设置路由
    $urlRouterProvider.otherwise('/index'); //设置其他路径跳转到index
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': { //设置默认模板,这里是相对HTML页面设置的路径
                    templateUrl: '/tpl/login.html',
                    controller: 'LoginCtrl'
                },
                'footer@index': { //footer部分
                    templateUrl: '/tpl/footer.html'
                }
            }
        })
        ;
});
'use strict';

// 管理系统模块，admin。声明依赖
var adminApp = angular.module('adminApp', ['ngAnimate', 'ui.router', 'ngGrid']);

/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次
 */
adminApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

adminApp.config(function($stateProvider, $urlRouterProvider) { // 设置路由
    $stateProvider
        .state('admin', {
            url: '/admin',
            views: {
                // 顶层部分
                '': {
                    templateUrl: '/tpl/indexAdmin.html',
                    //  controller: 'adminCtrl'
                },
                // 左侧导航部分
                'navSideBar@admin': { // footer部分
                    templateUrl: '/tpl/navSideBar.html',
                    controller: 'navCtrl'
                }
            }
        })
        // 添加类别
        .state('admin.addType', {
            url: '/addType',
            templateUrl: '/tpl/addBookType.html',
            controller: 'addBookType'
        })
        // 查看全部类别
        .state('admin.seeAllType', {
            url: '/seeAllType',
            templateUrl: '/tpl/seeAllType.html',
            controller: 'seeAllType'
        })
        // 添加书籍
        .state('admin.addBook', {
            url: '/addBook',
            templateUrl: '/tpl/addBook.html',
            controller: 'addBook'
        })
        // 查看全部书籍
        .state('admin.seeAllBook', {
            url: '/seeAllBook',
            templateUrl: '/tpl/seeAllBook.html',
            controller: 'seeAllBook'
        })
        // 查看入库记录
        .state('admin.seeAllInStock', {
            url: '/seeAllInStock',
            templateUrl: '/tpl/seeAllInStock.html',
            controller: 'seeAllInStock'
        })
        // 查看出售记录
        .state('admin.seeAllSold', {
            url: '/seeAllSold',
            templateUrl: '/tpl/seeAllSold.html',
            controller: 'seeAllSold'
        })
        ;

    $urlRouterProvider.otherwise('/admin/addType'); // 设置其他路径跳转到index
});

// var User = require("../model/UserModel");
var connection = require('../db/connection');
var queryWithArgs = connection.queryWithArgs;
var query = connection.query;
var md5 = require('md5');

/*
             输入       输出
selectAll    无         [User]     
 */

/**
 * 查找全部用户
 * @param  {Function} callback 回调函数，执行如callback(rows);也可以看callback([User]);
 */
var selectAll = function(callback) {
    var sql = "SELECT * FROM t_admin";
    try {
        //执行插入语句，成功返回success
        query(sql, function(err, rows) {
            console.log("UserDaoSelectAllSuccess:" + rows);
            if (err) {
                console.error("UserDaoSelectAllError:" + err);
            }
            callback(rows);
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("UserDaoSelectAllCatchError:" + er);
        callback(er);
    }
};

exports.selectAll = selectAll;

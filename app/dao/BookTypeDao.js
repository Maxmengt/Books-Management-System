var connection = require('../db/connection');
var queryWithArgs = connection.queryWithArgs;
var query = connection.query;

/*
             输入       	输出
insert       BookType       信息
delete       BookType.id    信息
modify       BookType       信息
selectAll    无         	[BookType]     
 */

var insert = function(bookType, callback) {
    console.log("bookType:" + bookType);
    var sql = "insert into t_type set ?";
    var obj = {
        Type_name: bookType.typeName
    };
    console.log(obj);
    try {
        // 执行插入语句，成功返回success
        queryWithArgs(sql, obj, function(err, rows) {
            console.log("BookTypeDaoInsertSuccess:" + rows);
            if (err) {
                console.error("BookTypeDaoInsertError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("BookTypeDaoInsertCatchError:" + er);
        callback(er);
    }
};

exports.insert = insert;

var deleteOne = function(id, callback) {
    var sql = "DELETE FROM t_type WHERE Type_id = ?";
    try {
        queryWithArgs(sql, id, function(err, rows) {
            console.log("BookTypeDaoDeleteSuccess:" + rows);
            if (err) {
                console.error("BookTypeDaoDeleteError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("BookTypeDaoDeleteCatchError:" + er);
        callback(er);
    }
};

exports.deleteOne = deleteOne;

var modify = function(bookType, callback) {
    var sql = "UPDATE t_type SET Type_name = '" + bookType.typeName + "' WHERE Type_id =" + bookType.id;
    console.log(sql);
    try {
        // 执行插入语句，成功返回success
        query(sql, function(err, rows) {
            console.log("BookTypeDaoModifySuccess:" + rows);
            if (err) {
                console.error("BookTypeDaoModifyError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("BookTypeDaoModifyCatchError:" + er);
        callback(er);
    }
};

exports.modify = modify;

var selectAll = function(callback) {
    var sql = "SELECT * FROM t_type";
    try {
        // 执行插入语句，成功返回success
        query(sql, function(err, rows) {
            console.log("BookTypeDaoSelectAllSuccess:" + rows);
            if (err) {
                console.error("BookTypeDaoSelectAllError:" + err);
            }
            callback(rows);
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("BookTypeDaoSelectAllCatchError:" + er);
        callback(er);
    }
};

exports.selectAll = selectAll;

var connection = require('../db/connection');
var queryWithArgs = connection.queryWithArgs;
var query = connection.query;

/*
             输入           输出
insert       Instock        信息
selectAll    无             [InStock]     
 */

var insert = function(instock, callback) {
    console.log("instock:" + instock);
    var sql = "insert into t_instock set ?";
    var obj = {
        Book_id:        instock.bookId,
        Admin_id:       instock.adminId,
        Instock_num:    instock.instockNum,
        Instock_date:   new Date(),
    };
    console.log(obj);
    try {
        // 执行插入语句，成功返回success
        queryWithArgs(sql, obj, function(err, rows) {
            console.log("InStockInsertSuccess:" + rows);
            if (err) {
                console.error("InStockInsertError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("InStockInsertCatchError:" + er);
        callback(er);
    }
};

exports.insert = insert;

var selectAll = function(callback) {
    var sql = "SELECT Instock_id,Book_name,Admin_name,Instock_num,Instock_date FROM t_instock,t_book,t_admin WHERE t_instock.Book_id = t_book.Book_id AND t_instock.Admin_id = t_admin.Admin_id ORDER BY Instock_id ASC";
    try {
        // 执行插入语句，成功返回success
        query(sql, function(err, rows) {
            console.log("InStockSelectAllSuccess:" + rows);
            if (err) {
                console.error("InStockSelectAllError:" + err);
            }
            callback(rows);
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("InStockSelectAllCatchError:" + er);
        callback(er);
    }
};

exports.selectAll = selectAll;


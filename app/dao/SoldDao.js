var connection = require('../db/connection');
var queryWithArgs = connection.queryWithArgs;
var query = connection.query;

/*
             输入           输出
insert       Sold        信息
selectAll    无             [Sold]     
 */

var insert = function(sold, callback) {
    console.log("sold:" + sold);
    var sql = "insert into t_sold set ?";
    var obj = {
        Book_id:        sold.bookId,
        Admin_id:       sold.adminId,
        Sold_num:       sold.soldNum,
        Sold_date:      new Date(),
    };
    console.log(obj);
    try {
        // 执行插入语句，成功返回success
        queryWithArgs(sql, obj, function(err, rows) {
            console.log("SoldInsertSuccess:" + rows);
            if (err) {
                console.error("SoldInsertError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("SoldInsertCatchError:" + er);
        callback(er);
    }
};

exports.insert = insert;

var selectAll = function(callback) {
    var sql = "SELECT Sold_id,Book_name,Admin_name,Sold_num,Sold_date FROM t_sold,t_book,t_admin WHERE t_sold.Book_id = t_book.Book_id AND t_sold.Admin_id = t_admin.Admin_id ORDER BY Sold_id ASC";
    try {
        // 执行插入语句，成功返回success
        query(sql, function(err, rows) {
            console.log("SoldSelectAllSuccess:" + rows);
            if (err) {
                console.error("SoldSelectAllError:" + err);
            }
            callback(rows);
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("SoldSelectAllCatchError:" + er);
        callback(er);
    }
};

exports.selectAll = selectAll;
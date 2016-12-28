var connection = require('../db/connection');
var queryWithArgs = connection.queryWithArgs;
var query = connection.query;

/*
             输入           输出
insert       Book           信息
delete       Book.id        信息
modify       Book           信息
selectAll    无             [Book]     
 */

var insert = function(book, callback) {
    console.log("book:" + book);
    var sql = "insert into t_book set ?";
    var obj = {
        Book_name:      book.bookName,
        Type_id:        book.typeId,
        Writer:         book.writer,
        Price:          book.price,
        Pub_company:    book.pubCompany || '',
        Pub_date:       book.pubDate    || new Date(),
        Current_num:    book.currentNum || 0,
    };
    console.log(obj);
    try {
        // 执行插入语句，成功返回success
        queryWithArgs(sql, obj, function(err, rows) {
            console.log("BookDaoInsertSuccess:" + rows);
            if (err) {
                console.error("BookDaoInsertError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("BookDaoInsertCatchError:" + er);
        callback(er);
    }
};

exports.insert = insert;

var deleteOne = function(id, callback) {
    var sql = "DELETE FROM t_book WHERE Book_id = ?";
    try {
        queryWithArgs(sql, id, function(err, rows) {
            console.log("BookDaoDeleteSuccess:" + rows);
            if (err) {
                console.error("BookDaoDeleteError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("BookDaoDeleteCatchError:" + er);
        callback(er);
    }
};

exports.deleteOne = deleteOne;

// 入库与出售
var modify = function(book, callback) {
    var sql = "UPDATE t_book SET ? WHERE Book_id = " + book.id;
    console.log("sql:"+sql);

    var obj = {
        Book_id:        book.id,
        Book_name:      book.bookName,
        Type_id:        book.typeId,
        Writer:         book.writer,
        Price:          book.price,
        Pub_company:    book.pubCompany || '',
        Pub_date:       book.pubDate    || new Date(),
        Current_num:    book.currentNum || 0,
    };

    console.log(obj);
    console.log(sql);

    try {
        // 执行插入语句，成功返回success
        queryWithArgs(sql, obj, function(err, rows) {
            console.log("BookDaoModifySuccess:" + rows);
            if (err) {
                console.error("BookDaoModifyError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("BookDaoModifyCatchError:" + er);
        callback(er);
    }
};

exports.modify = modify;

var selectAll = function(callback) {
    var sql = "SELECT * FROM t_book,t_type WHERE t_book.Type_id = t_type.Type_id ORDER BY t_book.Book_id ASC";
    try {
        // 执行插入语句，成功返回success
        query(sql, function(err, rows) {
            console.log("BookDaoSelectAllSuccess:" + rows);
            if (err) {
                console.error("BookDaoSelectAllError:" + err);
            }
            callback(rows);
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("BookDaoSelectAllCatchError:" + er);
        callback(er);
    }
};

exports.selectAll = selectAll;


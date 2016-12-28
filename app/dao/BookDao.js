var InStockDao = require('./InStockDao.js'),
    SoldDao = require('./SoldDao.js'),
    connection = require('../db/connection'),
    queryWithArgs = connection.queryWithArgs,
    query = connection.query;

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
    var sql = "UPDATE t_book SET ? WHERE Book_id = " + book.id,
        oldNum = { num: 0 },
        obj;
    selectOne(book.id, oldNum);
    if( oldNum.num < book.currentNum ) {
        obj = {
            bookId:     book.id,
            adminId:    book.adminId || [1, 2, 3][parseInt(Math.random() * 10) % 3],
            instockNum: book.currentNum - oldNum.num,
        };
        // 调用DAO层接口
        InStockDao.insert(obj, function() {
            console.warn("添加入库记录成功");
        });
    }
    else if( oldNum.num > book.currentNum ) {
        obj = {
            bookId:     book.id,
            adminId:    book.adminId || [1, 2, 3][parseInt(Math.random() * 10) % 2],
            soldNum:    oldNum.num - book.currentNum,
        };
        // 调用DAO层接口
        SoldDao.insert(obj, function() {
            console.warn("添加出售记录成功");
        });
    }
    console.log("sql:"+sql);

    obj = {
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
    var sql = "SELECT * FROM t_book,t_type WHERE t_book.Type_id = t_type.Type_id ORDER BY Book_id ASC";
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

var selectOne = function(id, temp){
    var sql = "SELECT Current_num FROM t_book WHERE Book_id = ?";
    try {
        queryWithArgs(sql, id, function(err, rows) {
            console.log("BookDaoSelectOneSuccess:" + rows);
            if (err) {
                console.error("BookDaoSelectOneError:" + err);
            }
            temp.num = parseInt(rows[0].Current_num);
        });
    } catch (er) {
        // 错误则输出异常并输出错误
        console.error("BookDaoSelectOneCatchError:" + er);
        // callback(er);
    }
};

exports.selectOne = selectOne;
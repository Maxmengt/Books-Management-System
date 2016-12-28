var BookTypeDao = require('../dao/BookTypeDao.js'),
    BookDao = require('../dao/BookDao.js'),
    md5 = require('md5');


exports.addType = function(req, res) {
    // 封装obj
    var obj = {
        typeName: req.body.typeName
    };
    console.log("需要添加到数据库的类别名为：" + req.body.typeName);

    // 调用DAO层接口
    BookTypeDao.insert(obj, function() {
        console.warn("添加书籍类别成功");
        // 返回给客户端200成功插入反馈
        res.status(200).json({
            success: '添加书籍类别成功'
        });
    });
};

// 查看全部类别
exports.seeAllType = function(req, res) {
    BookTypeDao.selectAll(function(rows) {
        res.status(200).json(rows);
    });
};

// 修改类别
exports.updateType = function(req, res) {
    var obj = req.body;
    BookTypeDao.modify(obj, function() {
        res.status(200).json({
            success: '修改书籍类别成功'
        });
        console.log("修改书籍类别成功");
    });
};

// 删除类别
exports.deleteType = function(req, res) {
    // 接受url传递的删除类别的id值
    var id = req.params.id;
    BookTypeDao.deleteOne(id, function() {
        res.status(200).json({
            success: '删除书籍类别成功'
        });;
        console.log("删除书籍类别成功");
    });
};

// 添加书籍
exports.addBook = function(req, res) {
    // 封装obj
    var obj = {
        bookName:   req.body.bookName,
        writer:     req.body.writer,
        typeId:     req.body.typeId,    //连接类别的外键
        price:      req.body.price,
        pubCompany: req.body.pubCompany,
        pubDate:    req.body.pubDate,
        currentNum: req.body.currentNum,
    };
    // 调用DAO层接口
    BookDao.insert(obj, function() {
        console.warn("添加书籍类别成功");
        // 返回给客户端200成功插入反馈
        res.status(200).json({
            success: '添加书籍类别成功'
        });
    });
};

// 查看全部书籍
exports.seeAllBook = function(req, res) {
    BookDao.selectAll(function(rows) {
        res.status(200).json(rows);
    });
};

// 修改书籍
exports.updateBook = function(req, res) {
    var obj = req.body;
    console.log(obj);
    BookDao.modify(obj, function() {
        res.status(200).json({
            success: '修改书籍类别成功'
        });
        console.log("修改书籍类别成功");
    });
};

// 删除书籍
exports.deleteBook = function(req, res) {
    //接受url传递的删除类别的id值
    var id = req.params.id;
    BookDao.deleteOne(id, function() {
        res.status(200).json({
            success: '删除书籍类别成功'
        });;
        console.log("删除书籍成功");
    });
};

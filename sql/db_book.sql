/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : db_book

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2016-12-27 17:32:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin` (
  `Admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `Admin_name` varchar(11) NOT NULL,
  `Admin_password` varchar(32) NOT NULL,
  PRIMARY KEY (`Admin_id`),
  UNIQUE KEY `Admin_id_UNIQUE` (`Admin_id`),
  UNIQUE KEY `Admin_name` (`Admin_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
INSERT INTO `t_admin` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3');
INSERT INTO `t_admin` VALUES ('2', 'zby', '2b8533dd29b5bf247bedc93f2cba92e6');
INSERT INTO `t_admin` VALUES ('3', 'qsh', 'ea77d3542d48d60826ebfdbe3feb792b');

-- ----------------------------
-- Table structure for t_book
-- ----------------------------
DROP TABLE IF EXISTS `t_book`;
CREATE TABLE `t_book` (
  `Book_id` int(11) NOT NULL AUTO_INCREMENT,
  `Book_name` varchar(100) NOT NULL,
  `Class_id` int(11) NOT NULL,
  `Writer` varchar(100) NOT NULL,
  `Price` decimal(5,2) NOT NULL,
  `Pub_company` varchar(20) DEFAULT NULL,
  `Pub_date` date DEFAULT NULL,
  `Current_num` int(11) NOT NULL,
  PRIMARY KEY (`Book_id`),
  KEY `Class_id` (`Class_id`),
  CONSTRAINT `t_book_ibfk_1` FOREIGN KEY (`Class_id`) REFERENCES `t_class` (`Class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_book
-- ----------------------------
INSERT INTO `t_book` VALUES ('1', '算法导论', '1', 'Thomas H.Cormen', '85.00', '机械工业出版社', '2006-09-01', '160');
INSERT INTO `t_book` VALUES ('2', 'C程序设计语言', '1', 'Brian W. Kernighan', '30.00', '机械工业出版社', '2004-04-01', '67');
INSERT INTO `t_book` VALUES ('3', '数据库系统概念', '1', '王珊', '39.60', '高等教育出版社', '2014-09-01', '126');
INSERT INTO `t_book` VALUES ('4', '经济学原理', '2', '曼昆', '88.00', '机械工业出版社', '2003-08-01', '53');
INSERT INTO `t_book` VALUES ('5', '国富论', '2', '亚当·斯密', '69.00', '华夏出版社', '2005-01-01', '133');
INSERT INTO `t_book` VALUES ('6', '囚徒健身', '3', '保罗·威德 ', '79.00', '北京科学技术出版社', '2013-10-01', '45');
INSERT INTO `t_book` VALUES ('7', '汪曾祺谈吃', '3', '汪曾祺', '19.80', '北方文艺出版社', '2006-01-01', '42');
INSERT INTO `t_book` VALUES ('8', '人类简史', '4', '尤瓦尔·赫拉利 ', '68.00', '中信出版社', '2014-11-01', '68');
INSERT INTO `t_book` VALUES ('9', '巨人的陨落', '4', '肯·福莱特', '129.80', '江苏凤凰文艺出版社', '2016-05-01', '260');
INSERT INTO `t_book` VALUES ('10', '白夜行', '5', '东野圭吾 ', '29.80', '南海出版公司', '2008-09-01', '16');
INSERT INTO `t_book` VALUES ('11', '嫌疑人X的献身', '5', '东野圭吾 ', '28.00', '南海出版公司', '2008-08-01', '36');
INSERT INTO `t_book` VALUES ('12', '解忧杂货店', '6', '东野圭吾', '39.50', '南海出版公司', '2014-05-01', '20');
INSERT INTO `t_book` VALUES ('13', '挪威的森林', '6', '村上春树', '18.80', '上海译文出版社', '2001-02-01', '98');

-- ----------------------------
-- Table structure for t_class
-- ----------------------------
DROP TABLE IF EXISTS `t_class`;
CREATE TABLE `t_class` (
  `Class_id` int(11) NOT NULL,
  `Class_name` varchar(100) NOT NULL,
  PRIMARY KEY (`Class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_class
-- ----------------------------
INSERT INTO `t_class` VALUES ('1', '科技');
INSERT INTO `t_class` VALUES ('2', '经管');
INSERT INTO `t_class` VALUES ('3', '生活');
INSERT INTO `t_class` VALUES ('4', '文化');
INSERT INTO `t_class` VALUES ('5', '流行');
INSERT INTO `t_class` VALUES ('6', '文学');

-- ----------------------------
-- Table structure for t_instock
-- ----------------------------
DROP TABLE IF EXISTS `t_instock`;
CREATE TABLE `t_instock` (
  `Instock_id` int(11) NOT NULL,
  `Book_id` int(11) NOT NULL,
  `Admin_id` int(11) NOT NULL,
  `Instock_num` int(11) NOT NULL,
  `Instock_date` date NOT NULL,
  PRIMARY KEY (`Instock_id`),
  KEY `Book_id` (`Book_id`),
  KEY `Admin_id` (`Admin_id`),
  CONSTRAINT `t_instock_ibfk_1` FOREIGN KEY (`Book_id`) REFERENCES `t_book` (`Book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_instock_ibfk_2` FOREIGN KEY (`Admin_id`) REFERENCES `t_admin` (`Admin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_instock
-- ----------------------------
INSERT INTO `t_instock` VALUES ('1', '1', '1', '20', '2016-12-20');
INSERT INTO `t_instock` VALUES ('2', '2', '2', '30', '2016-12-21');
INSERT INTO `t_instock` VALUES ('3', '6', '3', '40', '2016-12-22');
INSERT INTO `t_instock` VALUES ('4', '5', '2', '30', '2016-12-23');

-- ----------------------------
-- Table structure for t_sold
-- ----------------------------
DROP TABLE IF EXISTS `t_sold`;
CREATE TABLE `t_sold` (
  `Sold_id` int(11) NOT NULL,
  `Book_id` int(11) NOT NULL,
  `Admin_id` int(11) NOT NULL,
  `Sold_date` date NOT NULL,
  PRIMARY KEY (`Sold_id`),
  KEY `Book_id` (`Book_id`),
  KEY `Admin_id` (`Admin_id`),
  CONSTRAINT `t_sold_ibfk_1` FOREIGN KEY (`Book_id`) REFERENCES `t_book` (`Book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_sold_ibfk_2` FOREIGN KEY (`Admin_id`) REFERENCES `t_admin` (`Admin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_sold
-- ----------------------------
INSERT INTO `t_sold` VALUES ('1', '1', '1', '2016-12-21');
INSERT INTO `t_sold` VALUES ('2', '2', '2', '2016-12-22');
INSERT INTO `t_sold` VALUES ('3', '5', '3', '2016-12-24');
INSERT INTO `t_sold` VALUES ('4', '3', '2', '2016-12-25');

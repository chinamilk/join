DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id` char(12) NOT NULL DEFAULT '0' COMMENT '学号',
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `sex` enum('male','female') DEFAULT NULL COMMENT '性别',
  `campus` enum('Songshan Lake','Guancheng') DEFAULT NULL COMMENT '校区',
  `institute` varchar(50) DEFAULT NULL COMMENT '学院',
  `major` varchar(50) DEFAULT NULL COMMENT '专业',
  `phoneNumber` char(14) DEFAULT NULL COMMENT '手机',
  `email` varchar(100) DEFAULT NULL COMMENT '电子邮箱',
  `shortPhoneNumber` varchar(8) DEFAULT NULL COMMENT '短号',
  `QQNumber` varchar(80) DEFAULT NULL COMMENT 'QQ',
  `WeChatNumber` varchar(80) DEFAULT NULL COMMENT '微信',
  `isStaff` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否报名干事',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`,`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
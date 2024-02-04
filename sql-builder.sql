CREATE TABLE `company` (
  `id` char(36) NOT NULL,
  `name` varchar(10) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '联系电话',
  `mail` varchar(20) DEFAULT NULL COMMENT '联系邮箱',
  `license` varchar(512) DEFAULT NULL COMMENT '营业执照',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


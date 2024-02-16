-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.34 - MySQL Community Server - GPL
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 ups_db 的数据库结构
CREATE DATABASE IF NOT EXISTS `ups_db` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ups_db`;

-- 导出  表 ups_db.annex_history 结构
CREATE TABLE IF NOT EXISTS `annex_history` (
  `id` char(32) NOT NULL,
  `type` varchar(20) NOT NULL,
  `base64code` blob NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `type_limit` CHECK ((`type` in (_utf8mb4'resume',_utf8mb4'practive-document')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 数据导出被取消选择。

-- 导出  表 ups_db.announcement 结构
CREATE TABLE IF NOT EXISTS `announcement` (
  `id` char(32) NOT NULL,
  `title` varchar(50) NOT NULL DEFAULT '',
  `descript` text NOT NULL,
  `created` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 数据导出被取消选择。

-- 导出  表 ups_db.company 结构
CREATE TABLE IF NOT EXISTS `company` (
  `id` char(36) NOT NULL,
  `name` varchar(10) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '联系电话',
  `mail` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '联系邮箱',
  `license` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '营业执照',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 数据导出被取消选择。

-- 导出  表 ups_db.job 结构
CREATE TABLE IF NOT EXISTS `job` (
  `id` char(32) NOT NULL,
  `company_id` char(32) NOT NULL,
  `name` varchar(50) NOT NULL,
  `salary` varchar(50) NOT NULL,
  `descript` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 数据导出被取消选择。

-- 导出  表 ups_db.job_audit 结构
CREATE TABLE IF NOT EXISTS `job_audit` (
  `id` char(32) NOT NULL,
  `student_id` char(32) NOT NULL,
  `company_id` char(32) NOT NULL,
  `job_id` char(32) NOT NULL,
  `progress` varchar(10) DEFAULT NULL,
  `feedback` text COMMENT '企业反馈',
  `resume` blob COMMENT '投送简历',
  `created` year NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 数据导出被取消选择。

-- 导出  表 ups_db.notification 结构
CREATE TABLE IF NOT EXISTS `notification` (
  `id` char(32) NOT NULL,
  `title` varchar(50) NOT NULL DEFAULT '',
  `simple_descript` varchar(128) NOT NULL DEFAULT '',
  `descript` text,
  `created` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 数据导出被取消选择。

-- 导出  表 ups_db.student 结构
CREATE TABLE IF NOT EXISTS `student` (
  `id` char(32) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `number` varchar(50) NOT NULL,
  `grade` year NOT NULL DEFAULT '2020',
  `phone` varchar(20) DEFAULT NULL,
  `mail` varchar(40) DEFAULT NULL,
  `is_practice` bit(1) DEFAULT (0) COMMENT '是否处于实习中',
  `practice_cmp` tinyblob COMMENT '历史实习公司',
  `has_vitae` bit(1) NOT NULL DEFAULT (0) COMMENT '是否存在个人简历',
  `has_proof` bit(1) NOT NULL DEFAULT (0) COMMENT '是否存在实习凭证',
  `score` float NOT NULL DEFAULT (-(1)) COMMENT '实习分数',
  `proof` blob NOT NULL COMMENT '实习凭证',
  `vitae` blob NOT NULL COMMENT '个人简历',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 数据导出被取消选择。

-- 导出  表 ups_db.student_practice_experience 结构
CREATE TABLE IF NOT EXISTS `student_practice_experience` (
  `id` char(32) NOT NULL,
  `compony_id` char(32) NOT NULL,
  `start` date NOT NULL,
  `end` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 数据导出被取消选择。

-- 导出  表 ups_db.teacher 结构
CREATE TABLE IF NOT EXISTS `teacher` (
  `id` char(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(50) NOT NULL,
  `number` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `mail` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 数据导出被取消选择。

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

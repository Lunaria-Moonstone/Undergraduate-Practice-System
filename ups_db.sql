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
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `type` varchar(20) NOT NULL,
  `base64code` mediumblob NOT NULL,
  `created` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  CONSTRAINT `type_limit` CHECK ((`type` in (_utf8mb3'resume',_utf8mb3'practice-document')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.annex_history 的数据：~0 rows (大约)
DELETE FROM `annex_history`;

-- 导出  表 ups_db.announcement 结构
CREATE TABLE IF NOT EXISTS `announcement` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `title` varchar(50) NOT NULL DEFAULT '',
  `descript` text NOT NULL,
  `created` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.announcement 的数据：~0 rows (大约)
DELETE FROM `announcement`;
INSERT INTO `announcement` (`id`, `title`, `descript`, `created`) VALUES
	('XxQhUysEbig975xS10FAe', '管理员界面完成', '很好', '2024-02-23 15:38:00');

-- 导出  表 ups_db.company 结构
CREATE TABLE IF NOT EXISTS `company` (
  `id` char(36) NOT NULL,
  `name` varchar(10) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '联系电话',
  `mail` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '联系邮箱',
  `license` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '营业执照',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  ups_db.company 的数据：~0 rows (大约)
DELETE FROM `company`;
INSERT INTO `company` (`id`, `name`, `phone`, `mail`, `license`) VALUES
	('udertBUM0i_PkHM34eMpu', '国家安全局', '1342908972', 'gaj@gmail.com', 'R0lGODlhqASoAfcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/VAP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAACoBKgBAAitAPcJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3cOPKnUu3rt27ePPq3cu3r9+/gAMLHky4sOHDiBMrXsy4sePHkCNLnky5suXLmDNIa97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169izOGvfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCaoNeCCDDbo4IMQRijhhBRWaOGFGGao4YYcdujhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w0LdZo44045qjjjjz26OOPQAYp5JBEFmnkkUgmqeSSTDbp5JNQRinllFRWaeWVWClmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145iep55589unnn4AGKuighBZq6KGIJqrooow26uijkEYq6aSUVmrppZgjZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6quwxirrrLQg1mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LLMNusg7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rke6Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/HAAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQUV2wc8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLBq37PLLMMcs88w012zzzTjnrPPOPPfs889ABxkt9NBEF2300UgnrfTSTDft9NNQRy311FRXGW311VhnrfXWXHft9ddghy322GSXbfbZaKcYrfbabLft9ttwxy333HTXbffdeOet9958Fvft99+ABy744IQXbvjhiCeu+OKMN+4X+OOQRy755JRXbvnlmGeu+eacd+7556AWhy766KSXbvrpqKeu+uqst+7667DHLhb77LTXbvvtuOeu++689+7778AHL/zwFMQXb/zxyCev/PLMN+/889BHL/30FNRXb/312Gev/fbcd+/99+CHL/74FOSXb/756Kev/vrst+/++/DHL//8FPTXb//9+Oev//789+///wAMoAAHFUjAAhrwgAhMoAIXyMAGOvCBEIygBBQnSMEKWvCCGMygBjfIwQ568IMgDBWhCEdIwhKa8IQoTKEKV8jCFrrwhTATjKEMZ0jDGtrwhjjMoQ53yMMe+hXwh0AMohCHSMQiGvGISEyiEpfIxCYTOvGJUIyiFKdIxSpa8YpYzKIWtxLIxS568YtgDKMYx0jGMprxjGgTTKMa18jGNrrxjXCMoxznSMc62hLxjnjMox73yMc++vGPgAykIAcSSchCGvKQiEykIhfJyEY68pGQEoykJCdJyUpa8pKYzKQmN8nJThJ68pOgDKUoR0nKUprylKhMpSoSV8nKVrrylbCMpSxnScta2vKWELjMpS53ycte+vKXwAymMIcSScxiGvOYyEymMpfJzGY685nQEIymNKdJzWpa85rYzKY2t8kRzW5685vgDKc4x0nOcprznOgJTKc618lOQQYEADs=');

-- 导出  表 ups_db.job 结构
CREATE TABLE IF NOT EXISTS `job` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `company_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(50) NOT NULL,
  `salary` varchar(50) NOT NULL,
  `descript` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.job 的数据：~0 rows (大约)
DELETE FROM `job`;

-- 导出  表 ups_db.job_audit 结构
CREATE TABLE IF NOT EXISTS `job_audit` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `student_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `company_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `job_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `progress` varchar(10) DEFAULT NULL,
  `feedback` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci COMMENT '企业反馈',
  `resume` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '投送简历',
  `created` year NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.job_audit 的数据：~0 rows (大约)
DELETE FROM `job_audit`;
INSERT INTO `job_audit` (`id`, `student_id`, `company_id`, `job_id`, `progress`, `feedback`, `resume`, `created`) VALUES
	('YRfCy7AZ80xixLhOt1jxz', 'y4z7CZcMRgWwk_vCevWkL', 'udertBUM0i_PkHM34eMpu', 'MoIujuuUGiTmcVxcl6CSp', '接受', '此人太好', 'GtkVucGzZXuGGa5_6rTHt', '2024');

-- 导出  表 ups_db.notification 结构
CREATE TABLE IF NOT EXISTS `notification` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `role_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `role` bit(1) NOT NULL,
  `title` varchar(50) NOT NULL DEFAULT '',
  `simple_descript` varchar(128) NOT NULL DEFAULT '',
  `descript` text,
  `created` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.notification 的数据：~0 rows (大约)
DELETE FROM `notification`;

-- 导出  表 ups_db.student 结构
CREATE TABLE IF NOT EXISTS `student` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `number` varchar(50) NOT NULL,
  `grade` year NOT NULL DEFAULT '2020',
  `phone` varchar(20) DEFAULT NULL,
  `mail` varchar(40) DEFAULT NULL,
  `performence` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `is_practice` bit(1) DEFAULT (0) COMMENT '是否处于实习中',
  `practice_cmp` tinyblob COMMENT '历史实习公司',
  `has_vitae` bit(1) NOT NULL DEFAULT (0) COMMENT '是否存在个人简历',
  `has_proof` bit(1) NOT NULL DEFAULT (0) COMMENT '是否存在实习凭证',
  `score` float NOT NULL DEFAULT (-(1)) COMMENT '实习分数',
  `proof` blob NOT NULL COMMENT '实习凭证',
  `vitae` blob NOT NULL COMMENT '个人简历',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.student 的数据：~1 rows (大约)
DELETE FROM `student`;
INSERT INTO `student` (`id`, `name`, `number`, `grade`, `phone`, `mail`, `performence`, `is_practice`, `practice_cmp`, `has_vitae`, `has_proof`, `score`, `proof`, `vitae`) VALUES
	('10e87ada-85fe-4310-8b3f-314843978ecd', '叔本华', '20044231', '2020', '', '', NULL, b'0', NULL, b'0', b'0', -1, _binary 0x5b5d, _binary 0x5b5d);

-- 导出  表 ups_db.student_practice_experience 结构
CREATE TABLE IF NOT EXISTS `student_practice_experience` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `company_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `student_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `start` date NOT NULL,
  `end` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.student_practice_experience 的数据：~0 rows (大约)
DELETE FROM `student_practice_experience`;
INSERT INTO `student_practice_experience` (`id`, `company_id`, `student_id`, `start`, `end`) VALUES
	('_HGcjWG4cii8SdhY5YlBN', '2opBib5ejC2rrgET0VBG3', 'y4z7CZcMRgWwk_vCevWkL', '2024-02-26', '2024-02-27');

-- 导出  表 ups_db.student_teacher_map 结构
CREATE TABLE IF NOT EXISTS `student_teacher_map` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `student_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.student_teacher_map 的数据：~0 rows (大约)
DELETE FROM `student_teacher_map`;
INSERT INTO `student_teacher_map` (`id`, `student_id`, `teacher_id`) VALUES
	('gZfiUs34i9VBEzTURhWQr', 'y4z7CZcMRgWwk_vCevWkL', 'PyH0xBmZz9rXcToF4YShl');

-- 导出  表 ups_db.teacher 结构
CREATE TABLE IF NOT EXISTS `teacher` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(50) NOT NULL,
  `number` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `mail` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.teacher 的数据：~1 rows (大约)
DELETE FROM `teacher`;
INSERT INTO `teacher` (`id`, `name`, `number`, `phone`, `mail`) VALUES
	('7f191f2a-2a84-433c-916a-38390ff80244', '鲁志勇', '22903912', '1332089783', 'lulu@gmail.com');

-- 导出  表 ups_db.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(16) NOT NULL,
  `role` bit(2) NOT NULL COMMENT '角色（0-管理员 1-学生 2-教师 3-企业）',
  `foreign_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '角色表连结id',
  CONSTRAINT `role_limit` CHECK ((`role` in (0,1,2,3)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 正在导出表  ups_db.user 的数据：~8 rows (大约)
DELETE FROM `user`;
INSERT INTO `user` (`id`, `name`, `password`, `role`, `foreign_id`) VALUES
	('admin', 'admin', '123456', b'00', 'admin'),
	('student', 'student', '123456', b'01', 'y4z7CZcMRgWwk_vCevWkL'),
	('1dOmjktbCA27y2pwV0RA9', 'teacher', '123456', b'10', 'PyH0xBmZz9rXcToF4YShl'),
	('gGTEJcZlxPrHsNaS56u7H', 'company', '123456', b'11', 'udertBUM0i_PkHM34eMpu'),
	('rhIJiRlxHHKPW79sQ0kW8', '435235143', '123456', b'01', '9jux_0ZIK6T9l-Da6mzdi'),
	('9TErNgsLSK-UJylvkXD4C', '214353245', '123456', b'01', 'ev7Jojb7hKTCA14mRUUD5'),
	('j3WBFUQXws3_ujUvmN2xZ', '5425424523', '123456', b'01', 'JfFngF0jBlj1sItlj175a'),
	('TLIzygXDGjlRarF4uFaSk', '3214342431', '123456', b'01', 'ZlGkiFbF-6SeNtRJhqP2e');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

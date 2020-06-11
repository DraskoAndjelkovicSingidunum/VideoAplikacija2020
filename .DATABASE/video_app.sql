-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.19 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for video_app
CREATE DATABASE IF NOT EXISTS `video_app` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `video_app`;

-- Dumping structure for table video_app.administrator
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `is_active` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table video_app.administrator: ~6 rows (approximately)
DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`, `is_active`) VALUES
	(1, 'drasko', 'E8DBF1A87C52DFBE4022FB3298043E5847CB91CE751FAD5546F15CA89EE577FCCD1EC60E33962FB0870A2BC2B9040653BEACDAB33976C4A08E3E630B7D0F3E63', 1),
	(2, 'luka', '9A42AB9D2CB70522A8F3135E12C2CF6D3F51A87FC945CFFA38FCC2FC328EEFBEF0DD15B406AEE89F8E02CE30E717970869B57A091CBE012049401BCA214E779E', 1),
	(3, 'smilja', '8A7EE07E02A734F3F7D4E55740167593CE8B7C818ACA33C4D862929E0ACC7346420781EE1C5DCF8BB62DB1321FAC70BE3D634849C6404ACC3842DBE1F2FED6FD', 1),
	(4, 'pperic', '1B4671D4078E608F81F1E05BBAFE0D403C6BF116BA28FC28B28620F7C50327298FCEBB275C8C2AD7E34D41DEF427DA7B265E40D9489C84E9796A6437577A86CB', 0),
	(8, 'draskoandjelkovic', 'E320A2A7D871A401FD622DC25D0FABDB2FF21FD7B57E95AF6D33663E1B322EFA2400C27E2FE7854903AFE6ED6828DCFA49478DE9717B5B1E246B9E6901BE7871', 0),
	(9, 'peraPeric', 'D41DDBE88FD000DC73441E94C5FED5BDE07A80F1E3C53D6F36D3D5BF9D9F1A0A5BB2ADFC526B254ADF79DD597E02420DDD2035ADD95011B093EC8C507E671404', 0);
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

-- Dumping structure for table video_app.category
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `parent__category_id` int unsigned DEFAULT NULL,
  `video_id` int unsigned NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`) /*!80000 INVISIBLE */,
  UNIQUE KEY `uq_category_video_id` (`video_id`),
  KEY `fk_category_parent__category_id` (`parent__category_id`),
  CONSTRAINT `fk_category_parent__category_id` FOREIGN KEY (`parent__category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_category_video_id` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table video_app.category: ~7 rows (approximately)
DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`, `parent__category_id`, `video_id`) VALUES
	(16, 'Sport', NULL, 1),
	(17, 'Cars', NULL, 2),
	(18, 'Nature', NULL, 3),
	(19, 'Cities', NULL, 4),
	(45, 'test1', NULL, 73),
	(46, '0', NULL, 74),
	(47, 'test3', NULL, 75);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table video_app.tag
CREATE TABLE IF NOT EXISTS `tag` (
  `tag_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'tag_name',
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table video_app.tag: ~6 rows (approximately)
DELETE FROM `tag`;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` (`tag_id`, `name`) VALUES
	(1, 'basketball'),
	(4, 'beach'),
	(2, 'car'),
	(5, 'city'),
	(3, 'mountain'),
	(8, 'waterfall');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;

-- Dumping structure for table video_app.tag_video
CREATE TABLE IF NOT EXISTS `tag_video` (
  `tag_video_id` int unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int unsigned NOT NULL DEFAULT '0',
  `tag_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`tag_video_id`),
  UNIQUE KEY `uq_tag_video_video_id_tag_id` (`video_id`,`tag_id`),
  KEY `fk_tag_video_tag_id` (`tag_id`),
  CONSTRAINT `fk_tag_video_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_tag_video_video_id` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table video_app.tag_video: ~4 rows (approximately)
DELETE FROM `tag_video`;
/*!40000 ALTER TABLE `tag_video` DISABLE KEYS */;
INSERT INTO `tag_video` (`tag_video_id`, `video_id`, `tag_id`) VALUES
	(1, 1, 1),
	(3, 2, 2),
	(5, 3, 3),
	(6, 4, 5);
/*!40000 ALTER TABLE `tag_video` ENABLE KEYS */;

-- Dumping structure for table video_app.video
CREATE TABLE IF NOT EXISTS `video` (
  `video_id` int unsigned NOT NULL AUTO_INCREMENT,
  `video_path` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `title` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `description` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`video_id`),
  UNIQUE KEY `uq_video_video_path` (`video_path`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table video_app.video: ~7 rows (approximately)
DELETE FROM `video`;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` (`video_id`, `video_path`, `title`, `description`) VALUES
	(1, 'storage/video1.mp4', 'Awesome basketball', 'Someone shooting to the basket while raining'),
	(2, 'storage/video2.mp4', 'Beautiful Mercedes', 'Mercedes on track '),
	(3, 'storage/video3.mp4', 'Cloudy mountains', 'Video recorded on the top of the mountain'),
	(4, 'storage/video4.mp4', 'Rain in NY', 'New York City rain.'),
	(73, 'test1', 'test1', 'test1'),
	(74, '0', '0', '0'),
	(75, 'test3', 'test3', 'test3');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

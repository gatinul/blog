-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: Koa
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog_tag_md`
--

DROP TABLE IF EXISTS `blog_tag_md`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_tag_md` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `tag_name` char(20) NOT NULL,
  `md` char(20) NOT NULL,
  `remark` char(60) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_tag_md`
--

LOCK TABLES `blog_tag_md` WRITE;
/*!40000 ALTER TABLE `blog_tag_md` DISABLE KEYS */;
INSERT INTO `blog_tag_md` VALUES (11,'rebecca','woseen.md','更新时间2017-10-21 17:09:08','2017-10-21 08:38:59'),(13,'rebecca','产品配置.md',NULL,'2017-10-21 10:22:05'),(14,'javascript','Page.md','更新时间2017-10-21 17:14:18','2017-10-21 17:03:49'),(15,'css','blockquote的几种样式',NULL,'2017-10-22 17:49:51'),(16,'node.js','node版本管理',NULL,'2017-10-22 17:49:59'),(28,'gulp','gulp-foal：使gulp支持传参',NULL,'2017-10-22 17:50:03'),(29,'react','父子组件之间的通信',NULL,'2017-10-22 17:50:21'),(30,'vue','使css只在当前组件生效',NULL,'2017-10-22 17:52:03'),(36,'rebecca','hello',NULL,'2017-10-24 13:44:12'),(37,'test','hexo-github.md',NULL,'2017-10-24 21:07:45');
/*!40000 ALTER TABLE `blog_tag_md` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-30 21:36:20

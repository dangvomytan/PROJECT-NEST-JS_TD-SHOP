-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: project_nest_js
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_cartitem`
--

DROP TABLE IF EXISTS `tbl_cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cartitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_Id` int NOT NULL,
  `product_Id` int NOT NULL,
  `version_Id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_16b8cf4adf5fbac703135833339` (`user_Id`),
  KEY `FK_e13afeb770c4db13efabea8d86f` (`product_Id`),
  KEY `FK_4dd1629b9c284ec420b8fa39aa8` (`version_Id`),
  CONSTRAINT `FK_16b8cf4adf5fbac703135833339` FOREIGN KEY (`user_Id`) REFERENCES `tbl_user` (`id`),
  CONSTRAINT `FK_4dd1629b9c284ec420b8fa39aa8` FOREIGN KEY (`version_Id`) REFERENCES `tbl_version` (`id`),
  CONSTRAINT `FK_e13afeb770c4db13efabea8d86f` FOREIGN KEY (`product_Id`) REFERENCES `tbl_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cartitem`
--

LOCK TABLES `tbl_cartitem` WRITE;
/*!40000 ALTER TABLE `tbl_cartitem` DISABLE KEYS */;
INSERT INTO `tbl_cartitem` VALUES (1,26,'2023-09-06 21:59:43.855482','2023-09-06 22:13:08.672211',2,1,1),(2,1,'2023-09-06 22:12:38.688001','2023-09-06 22:13:08.673123',2,1,3),(3,1,'2023-09-06 22:12:45.830915','2023-09-06 22:13:08.673773',2,1,2),(35,1,'2023-09-10 01:53:41.679531','2023-09-10 01:53:41.679531',4,1,5);
/*!40000 ALTER TABLE `tbl_cartitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_Name` varchar(255) NOT NULL,
  `is_Delete` int NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_category`
--

LOCK TABLES `tbl_category` WRITE;
/*!40000 ALTER TABLE `tbl_category` DISABLE KEYS */;
INSERT INTO `tbl_category` VALUES (1,'Smart Phone',0,'desc','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000'),(2,'Tablet',0,'desc','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000'),(3,'Laptop',0,'desc','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000'),(4,'PC',0,'desc','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000'),(5,'Sound',0,'desc','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000'),(6,'Clock',0,'desc','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000'),(7,'Accessory',0,'desc','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000');
/*!40000 ALTER TABLE `tbl_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_order`
--

DROP TABLE IF EXISTS `tbl_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `phone` int NOT NULL,
  `method` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_Id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e2904d4db87d8115f9828783d09` (`user_Id`),
  CONSTRAINT `FK_e2904d4db87d8115f9828783d09` FOREIGN KEY (`user_Id`) REFERENCES `tbl_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_order`
--

LOCK TABLES `tbl_order` WRITE;
/*!40000 ALTER TABLE `tbl_order` DISABLE KEYS */;
INSERT INTO `tbl_order` VALUES (14,'asds',32423,'',0,'2023-09-05 21:40:11.411908','2023-09-05 21:40:11.411908',1),(17,'',0,'',0,'2023-09-05 21:52:38.089361','2023-09-05 21:52:38.089361',1),(18,'',0,'',0,'2023-09-05 21:52:54.245419','2023-09-05 21:52:54.245419',1),(19,'sdf',376717801,'card',0,'2023-09-05 21:53:04.125577','2023-09-05 21:53:04.125577',1),(20,'sdf',376717801,'card',0,'2023-09-05 21:54:07.435790','2023-09-05 21:54:07.435790',1),(21,'sdf',376717801,'card',0,'2023-09-05 22:05:34.873888','2023-09-05 22:05:34.873888',1),(22,'sdf',376717801,'card',0,'2023-09-05 22:19:03.580382','2023-09-05 22:19:03.580382',1),(23,'sdf',376717801,'card',0,'2023-09-05 22:20:22.751522','2023-09-05 22:20:22.751522',1),(24,'sdf',376717801,'card',0,'2023-09-05 22:20:23.526477','2023-09-05 22:20:23.526477',1),(25,'sdf',376717801,'card',0,'2023-09-05 22:30:06.730359','2023-09-05 22:30:06.730359',1),(26,'sdf',376717801,'card',0,'2023-09-05 22:31:31.903469','2023-09-05 22:31:31.903469',1),(27,'sdf',376717801,'card',0,'2023-09-05 22:31:47.485308','2023-09-05 22:31:47.485308',1),(28,'sdf',376717801,'card',0,'2023-09-05 22:32:30.273144','2023-09-05 22:32:30.273144',1),(29,'sdf',376717801,'card',0,'2023-09-05 23:06:02.060072','2023-09-05 23:06:02.060072',1),(30,'sdf',376717801,'card',0,'2023-09-05 23:07:02.686079','2023-09-05 23:07:02.686079',1),(31,'sdf',376717801,'card',0,'2023-09-05 23:08:41.478243','2023-09-05 23:08:41.478243',1),(32,'sdf',376717801,'card',0,'2023-09-05 23:08:51.463964','2023-09-05 23:08:51.463964',1),(33,'sdf',376717801,'card',0,'2023-09-05 23:14:14.483024','2023-09-05 23:14:14.483024',1),(34,'sdf',376717801,'card',0,'2023-09-05 23:15:26.502180','2023-09-05 23:15:26.502180',1),(35,'sdf',376717801,'card',0,'2023-09-05 23:15:43.478252','2023-09-05 23:15:43.478252',1),(36,'sdf',376717801,'card',0,'2023-09-05 23:23:28.075878','2023-09-05 23:23:28.075878',1),(37,'da nang',376717801,'card',0,'2023-09-05 23:24:06.050542','2023-09-05 23:24:06.050542',1),(38,'da nang',376717801,'card',0,'2023-09-05 23:27:01.651985','2023-09-05 23:27:01.651985',1),(39,'hahah',0,'card',0,'2023-09-05 23:33:45.183435','2023-09-05 23:33:45.183435',1),(40,'',0,'',0,'2023-09-06 00:27:29.115818','2023-09-06 00:27:29.115818',1),(41,'AS',376717801,'card',0,'2023-09-06 22:33:16.707491','2023-09-06 22:33:16.707491',1),(42,'AAA',376717801,'card',0,'2023-09-06 22:35:06.412061','2023-09-06 22:35:06.412061',1),(43,'AAA',376717801,'card',0,'2023-09-06 22:35:11.036846','2023-09-06 22:35:11.036846',1),(44,'AAA',376717801,'card',0,'2023-09-06 22:36:14.848467','2023-09-06 22:36:14.848467',1),(45,'hahah',376717801,'card',0,'2023-09-06 22:36:51.457272','2023-09-06 22:36:51.457272',1),(46,'',0,'',0,'2023-09-06 22:41:32.378226','2023-09-06 22:41:32.378226',1),(47,'',0,'',0,'2023-09-06 22:42:09.490678','2023-09-06 22:42:09.490678',1),(48,'',0,'',0,'2023-09-06 22:42:20.670446','2023-09-06 22:42:20.670446',1),(49,'',0,'',0,'2023-09-06 22:43:17.230701','2023-09-06 22:43:17.230701',1),(50,'',0,'',0,'2023-09-06 22:45:29.090440','2023-09-06 22:45:29.090440',1),(51,'',0,'',0,'2023-09-06 22:47:13.507492','2023-09-06 22:47:13.507492',1),(52,'aaaa',11111,'card',0,'2023-09-06 22:49:45.045941','2023-09-06 22:49:45.045941',1),(53,'',0,'',0,'2023-09-07 09:03:41.592873','2023-09-07 09:03:41.592873',4),(54,'hahah',376717800,'card',0,'2023-09-07 18:16:43.112714','2023-09-07 18:16:43.112714',4),(55,'',0,'',0,'2023-09-09 02:02:58.116946','2023-09-09 02:02:58.116946',4),(56,'hahah',376717801,'card',0,'2023-09-09 14:01:29.684513','2023-09-09 14:01:29.684513',4),(57,'',0,'',0,'2023-09-09 16:17:57.992655','2023-09-09 16:17:57.992655',4);
/*!40000 ALTER TABLE `tbl_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_orderitem`
--

DROP TABLE IF EXISTS `tbl_orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_orderitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price_Pay` int NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `order_Id` int NOT NULL,
  `product_Id` int NOT NULL,
  `version_Id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f1eecf0ffa414db9a70d82916ce` (`order_Id`),
  CONSTRAINT `FK_f1eecf0ffa414db9a70d82916ce` FOREIGN KEY (`order_Id`) REFERENCES `tbl_order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_orderitem`
--

LOCK TABLES `tbl_orderitem` WRITE;
/*!40000 ALTER TABLE `tbl_orderitem` DISABLE KEYS */;
INSERT INTO `tbl_orderitem` VALUES (1,1,100,'2023-09-06 22:36:14.877088','2023-09-06 22:36:14.877088',44,1,1),(2,24,2880,'2023-09-06 22:36:51.466203','2023-09-06 22:36:51.466203',45,1,3),(3,10,1200,'2023-09-06 22:41:32.392396','2023-09-06 22:41:32.392396',46,1,3),(4,5,500,'2023-09-06 22:41:32.399472','2023-09-06 22:41:32.399472',46,1,1),(5,5,550,'2023-09-06 22:41:32.400847','2023-09-06 22:41:32.400847',46,1,2),(6,10,1200,'2023-09-06 22:42:09.499803','2023-09-06 22:42:09.499803',47,1,3),(7,10,1200,'2023-09-06 22:42:20.681233','2023-09-06 22:42:20.681233',48,1,3),(8,16,1920,'2023-09-06 22:49:45.057309','2023-09-06 22:49:45.057309',52,1,3),(9,8,800,'2023-09-06 22:49:45.065141','2023-09-06 22:49:45.065141',52,1,1),(10,6,660,'2023-09-06 22:49:45.065904','2023-09-06 22:49:45.065904',52,1,2),(11,5,500,'2023-09-07 09:03:41.606437','2023-09-07 09:03:41.606437',53,1,1),(12,5,550,'2023-09-07 09:03:41.612578','2023-09-07 09:03:41.612578',53,1,2),(13,4,440,'2023-09-07 18:16:43.131090','2023-09-07 18:16:43.131090',54,1,2),(14,1,120,'2023-09-07 18:16:43.135874','2023-09-07 18:16:43.135874',54,1,3),(15,2,200,'2023-09-09 02:02:58.145939','2023-09-09 02:02:58.145939',55,1,1),(16,4,400,'2023-09-09 14:01:29.697317','2023-09-09 14:01:29.697317',56,1,1),(17,1,100,'2023-09-09 16:17:58.022744','2023-09-09 16:17:58.022744',57,1,1);
/*!40000 ALTER TABLE `tbl_orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_Name` varchar(255) NOT NULL,
  `is_Delete` int NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `category_Id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6401fc0724b4552648de4686dcb` (`category_Id`),
  CONSTRAINT `FK_6401fc0724b4552648de4686dcb` FOREIGN KEY (`category_Id`) REFERENCES `tbl_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product`
--

LOCK TABLES `tbl_product` WRITE;
/*!40000 ALTER TABLE `tbl_product` DISABLE KEYS */;
INSERT INTO `tbl_product` VALUES (1,'iPhone',0,'d','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(2,'Samsung Galaxy',0,'d','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(3,'Xiaomi Redmi',0,'d','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(4,'OPPO',0,'d','2023-08-08 00:00:00.000000','2023-09-08 18:39:02.246058',4);
/*!40000 ALTER TABLE `tbl_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_Name` varchar(255) NOT NULL,
  `last_Name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_Delete` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'tan','dang','tandang@gmail.com','123456',1,'2023-08-05 00:00:00.000000','2023-09-10 17:29:19.622135'),(2,'tung','phan','tung@gmail.com','123456',0,'2023-09-03 01:25:43.000000','2023-09-03 01:25:43.000000'),(3,'tan','dang','tan2@gmail.com','$2b$10$XRdukncLx/upbVqcJtr43e2k.GgM9uvOov0OAJBOlPaBCN8JWxBlW',0,'2023-09-06 10:21:16.352451','2023-09-06 10:21:16.352451'),(4,'tan','dang','tan3@gmail.com','$2b$10$xQu.WICHt8Mfsi54btx8c.i0kXlsCTRbwRltEBSxxKwazjEvp1kq.',0,'2023-09-06 10:26:55.764127','2023-09-06 10:26:55.764127'),(5,'tan','dang','tan4@gmail.com','$2b$10$bwO.ovPNd/dv1TdxFGSlTeDNzKaTI7y1EH33jhdzQSlgj23AYUACa',0,'2023-09-06 10:32:11.020737','2023-09-06 10:32:11.020737'),(6,'hieu','nguyen','hieunguyeng@gmail.com','$2b$10$ckz1XKQg.gmVGy7Km6vXIO8Vk9J1XJMxTGW/k5Re/xNJytjZo6AzS',0,'2023-09-06 14:59:59.369949','2023-09-06 14:59:59.369949'),(7,'tan','dang','tan5@gmail.com','$2b$10$IepeqtowAghg0K/uuO1Q1e90yNS97o/aH81ij/ZOdAAw4gwFytElO',0,'2023-09-06 15:47:03.534063','2023-09-06 15:47:03.534063'),(8,'tan44','dang','tandang44@gmail.com','$2b$10$Tc6FLzgwg3ZAP8xnomoLTe8dYrn7GTCs/yrMlliWY.o5eMxo8I5JK',0,'2023-09-06 16:37:48.686799','2023-09-06 16:37:48.686799');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_version`
--

DROP TABLE IF EXISTS `tbl_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_version` (
  `id` int NOT NULL AUTO_INCREMENT,
  `version_Name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `inventory` int NOT NULL,
  `image` text NOT NULL,
  `specification` text NOT NULL,
  `is_Delete` int NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `product_Id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f8088416d9a4afd4741ff4d3ef0` (`product_Id`),
  CONSTRAINT `FK_f8088416d9a4afd4741ff4d3ef0` FOREIGN KEY (`product_Id`) REFERENCES `tbl_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_version`
--

LOCK TABLES `tbl_version` WRITE;
/*!40000 ALTER TABLE `tbl_version` DISABLE KEYS */;
INSERT INTO `tbl_version` VALUES (1,'14 ',100,5,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png','hah',0,'ff','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(2,'14  Pro ',110,5,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png','asd',0,'ff','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(3,'14 Pro Max',120,5,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png','sad',0,'ff','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(4,'ROG 2',444,4,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png','asda',0,'ff','2023-08-08 00:00:00.000000','2023-09-08 09:47:11.728741',2),(5,'13',100,8,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png','123',0,'ff','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(6,'13 pro',120,8,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png','324',0,'fff','2023-08-08 00:00:00.000000','2023-09-08 17:05:48.695080',4),(7,'13 pro max',150,8,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png','435',0,'ff','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(8,'hhaha',123,3,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png','dfsd',0,'ff','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(9,'fgd',34,4,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png','sad',0,'asd','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1),(10,'3333',33,3,'333','33',0,'333','2023-08-08 00:00:00.000000','2023-08-08 00:00:00.000000',1);
/*!40000 ALTER TABLE `tbl_version` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-11 23:33:29

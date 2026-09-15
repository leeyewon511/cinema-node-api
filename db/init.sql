-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `cinema`
--

DROP TABLE IF EXISTS `cinema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinema` (
  `cinema_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`cinema_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema`
--

LOCK TABLES `cinema` WRITE;
/*!40000 ALTER TABLE `cinema` DISABLE KEYS */;
INSERT INTO `cinema` VALUES (2,'CGV 강남','서울시 강남구 테헤란로 123','02-1234-5678'),(3,'CGV 서면','부산시 부산진구 서면로 456','051-1234-5678'),(4,'롯데시네마 해운대','부산시 해운대구 센텀중앙로 79','051-9876-5432'),(5,'롯데시네마 해운대','부산시 해운대구 센텀중앙로 79','051-9876-5432'),(6,'메가박스 동래','부산시 동래구 온천천로 123','051-1111-2222'),(7,'강남','서울시 강남구 테헤란로 123','02-1234-5678');
/*!40000 ALTER TABLE `cinema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member` int NOT NULL AUTO_INCREMENT,
  `login_id` varchar(45) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `member_status` varchar(45) DEFAULT NULL,
  `role` varchar(20) NOT NULL DEFAULT '회원',
  PRIMARY KEY (`member`),
  UNIQUE KEY `login_id_UNIQUE` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'testuser','test1234','테스트유저','010-0000-0000','정상','회원'),(2,'testuser1','$2b$10$PJHe2iYX9mWC0xVbQToosu.aLcJTOdxiEdwVLtjiACiKywcn/mZT.','테스트','010-1234-5678','정상','회원'),(3,'testuser2','$2b$10$63U17B0c8jWilJ9dAGlKWe/TpDbSK.PuMVhcCEIJtyg0GB9PUJfLO','수정된이름','010-9999-9999','정상','회원');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movie_id` int NOT NULL AUTO_INCREMENT,
  `post` varchar(255) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `prolog` text,
  `release_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `movie_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (3,'https://example.com/poster.jpg','인셉션','SF','타인의 꿈에 들어가 생각을 훔치는 특수 보안요원 이야기','2026-09-01','2026-10-31','상영중'),(4,'poster_url.jpg','인터스텔라','SF','우주를 배경으로 한 이야기','2026-01-01','2026-03-01','상영예정');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `amount` int DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `payment_status` varchar(45) DEFAULT NULL,
  `reservation_id` int NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payment_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_payment_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,36000,'2026-09-03 11:05:38','취소완료',8),(2,36000,'2026-09-03 11:15:15','결제완료',9);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text,
  `author` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'테스트제목','테스트 내용','작성자1','2026-07-31 10:40:28');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `reservation` int NOT NULL AUTO_INCREMENT,
  `reservation_date` datetime DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `member_id` int NOT NULL,
  `schedule_id` int NOT NULL,
  PRIMARY KEY (`reservation`),
  KEY `fk_reservation_member_idx` (`member_id`),
  KEY `fk_reservation_schedule1_idx` (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (8,'2026-09-03 11:05:38',36000,'취소',1,4),(9,'2026-09-03 11:15:15',36000,'예매확정',1,4);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_item`
--

DROP TABLE IF EXISTS `reservation_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_item` (
  `reservation_item` int NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  `reservation_id` int NOT NULL,
  `schedule_seat_id` int NOT NULL,
  PRIMARY KEY (`reservation_item`),
  KEY `fk_reservation_item_reservation1_idx` (`reservation_id`),
  KEY `fk_reservation_item_schedule_seat1_idx` (`schedule_seat_id`),
  CONSTRAINT `fk_reservation_item_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation`),
  CONSTRAINT `fk_reservation_item_schedule_seat1` FOREIGN KEY (`schedule_seat_id`) REFERENCES `schedule_seat` (`schedule_seat`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_item`
--

LOCK TABLES `reservation_item` WRITE;
/*!40000 ALTER TABLE `reservation_item` DISABLE KEYS */;
INSERT INTO `reservation_item` VALUES (19,12000,8,1),(20,12000,8,2),(21,12000,8,3),(22,12000,9,1),(23,12000,9,2),(24,12000,9,3);
/*!40000 ALTER TABLE `reservation_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule` int NOT NULL AUTO_INCREMENT,
  `show_date` date DEFAULT NULL,
  `show_time` time DEFAULT NULL,
  `schedule_status` varchar(45) DEFAULT NULL,
  `screen_id` int NOT NULL,
  `movie_id` int NOT NULL,
  PRIMARY KEY (`schedule`),
  KEY `fk_schedule_ screen1_idx` (`screen_id`),
  KEY `fk_schedule_movie1_idx` (`movie_id`),
  CONSTRAINT `fk_schedule_ screen1` FOREIGN KEY (`screen_id`) REFERENCES `screen` (`screen`),
  CONSTRAINT `fk_schedule_movie1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (4,'2026-09-05','19:30:00','예정',3,3);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_seat`
--

DROP TABLE IF EXISTS `schedule_seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_seat` (
  `schedule_seat` int NOT NULL AUTO_INCREMENT,
  `seat_status` varchar(45) DEFAULT NULL,
  `seat_id` int NOT NULL,
  `schedule_id` int NOT NULL,
  PRIMARY KEY (`schedule_seat`),
  KEY `fk_schedule_seat_seat1_idx` (`seat_id`),
  KEY `fk_schedule_seat_schedule1_idx` (`schedule_id`),
  CONSTRAINT `fk_schedule_seat_schedule1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule`),
  CONSTRAINT `fk_schedule_seat_seat1` FOREIGN KEY (`seat_id`) REFERENCES `seat` (`seat`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_seat`
--

LOCK TABLES `schedule_seat` WRITE;
/*!40000 ALTER TABLE `schedule_seat` DISABLE KEYS */;
INSERT INTO `schedule_seat` VALUES (1,'예약됨',1,4),(2,'예약됨',2,4),(3,'예약됨',3,4),(4,'예약가능',4,4),(5,'예약가능',5,4),(6,'예약가능',6,4),(7,'예약가능',7,4),(8,'예약가능',8,4),(9,'예약가능',9,4),(10,'예약가능',10,4),(11,'예약가능',11,4),(12,'예약가능',12,4),(13,'예약가능',13,4),(14,'예약가능',14,4),(15,'예약가능',15,4);
/*!40000 ALTER TABLE `schedule_seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screen`
--

DROP TABLE IF EXISTS `screen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screen` (
  `screen` int NOT NULL AUTO_INCREMENT,
  `screen_no` varchar(45) DEFAULT NULL,
  `cinema_id` int NOT NULL,
  `seat_capacity` int DEFAULT NULL,
  PRIMARY KEY (`screen`),
  KEY `fk_ screen_cinema1_idx` (`cinema_id`),
  CONSTRAINT `fk_ screen_cinema1` FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`cinema_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screen`
--

LOCK TABLES `screen` WRITE;
/*!40000 ALTER TABLE `screen` DISABLE KEYS */;
INSERT INTO `screen` VALUES (3,'1',2,100),(4,'2',2,80),(5,'3',2,120);
/*!40000 ALTER TABLE `screen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `seat` int NOT NULL AUTO_INCREMENT,
  `seat_row` varchar(5) DEFAULT NULL,
  `seat_number` int DEFAULT NULL,
  `screen_id` int NOT NULL,
  PRIMARY KEY (`seat`),
  KEY `fk_seat_ screen1_idx` (`screen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,'A',1,1),(2,'A',2,1),(3,'A',3,1),(4,'A',4,1),(5,'A',5,1),(6,'A',6,1),(7,'A',7,1),(8,'A',8,1),(9,'A',9,1),(10,'A',10,1),(11,'B',1,1),(12,'B',2,1),(13,'B',3,1),(14,'B',4,1),(15,'B',5,1);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-14 15:56:10

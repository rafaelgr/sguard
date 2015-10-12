/*
SQLyog Community v12.14 (32 bit)
MySQL - 5.6.26-log : Database - sguard
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sguard` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `sguard`;

/*Table structure for table `administradores` */

DROP TABLE IF EXISTS `administradores`;

CREATE TABLE `administradores` (
  `administradorId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(765) DEFAULT NULL,
  `login` varchar(765) DEFAULT NULL,
  `password` varchar(765) DEFAULT NULL,
  `email` varchar(765) DEFAULT NULL,
  PRIMARY KEY (`administradorId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `administradores` */

insert  into `administradores`(`administradorId`,`nombre`,`login`,`password`,`email`) values 
(2,'MI segundo adm','ad2','ad2',NULL),
(4,'Administrador Principal','admin','admin','adm@gh.com'),
(5,'Juan Peleon','juan','juan','juan@gmail.com');

/*Table structure for table `descargas` */

DROP TABLE IF EXISTS `descargas`;

CREATE TABLE `descargas` (
  `descargaId` int(11) NOT NULL AUTO_INCREMENT,
  `nterminal` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `resultado` text,
  PRIMARY KEY (`descargaId`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

/*Data for the table `descargas` */

insert  into `descargas`(`descargaId`,`nterminal`,`fecha`,`hora`,`resultado`) values 
(34,'112339','2015-10-09','21:15:55','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(35,'112339','2015-10-12','19:34:50','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(36,'112339','2015-10-12','19:36:29','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(37,'112339','2015-10-12','19:37:33','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(38,'112339','2015-10-12','19:53:39','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(39,'112339','2015-10-12','19:56:24','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(40,'112339','2015-10-12','19:58:21','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(41,'112339','2015-10-12','20:08:35','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(42,'112339','2015-10-12','20:12:48','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(43,'112339','2015-10-12','20:13:46','CARGA SIMPLE TERMINAL [SIN PROCESO]'),
(44,'112339','2015-10-12','20:18:53','CARGA SIMPLE TERMINAL [SIN PROCESO]');

/*Table structure for table `descargas_lineas` */

DROP TABLE IF EXISTS `descargas_lineas`;

CREATE TABLE `descargas_lineas` (
  `descargaLineaId` int(11) NOT NULL AUTO_INCREMENT,
  `descargaId` int(11) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `tipoId` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`descargaLineaId`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8;

/*Data for the table `descargas_lineas` */

insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`) values 
(113,34,'0004049464','2015-10-09','21:15:39','VIGILANTE',7,'Pedro Martinez'),
(114,34,'0406213943','2015-10-09','21:15:41','RONDA',13,'Ronda 01-02'),
(115,34,'0406215258','2015-10-09','21:15:42','PUNTO',5,'Control 1'),
(116,34,'0406209033','2015-10-09','21:15:43','PUNTO',7,'Control 3'),
(117,34,'0406220547','2015-10-09','21:15:45','RONDA',14,'R-03-F'),
(118,34,'0406219258','2015-10-09','21:15:46','PUNTO',6,'Control 2'),
(119,34,'0403669508','2015-10-09','21:15:47','PUNTO',8,'Punto Flotante'),
(120,35,'0406215258','2015-10-12','19:34:30','PUNTO',5,'Control 1'),
(121,35,'0406219258','2015-10-12','19:34:32','PUNTO',6,'Control 2'),
(122,35,'0406209033','2015-10-12','19:34:33','PUNTO',7,'Control 3'),
(123,36,'0406213943','2015-10-12','19:36:22','RONDA',13,'Ronda 01-02'),
(124,36,'0406215258','2015-10-12','19:36:23','PUNTO',5,'Control 1'),
(125,36,'0406219258','2015-10-12','19:36:24','PUNTO',6,'Control 2'),
(126,37,'0004049464','2015-10-12','19:37:25','VIGILANTE',7,'Pedro Martinez'),
(127,37,'0406220547','2015-10-12','19:37:27','RONDA',14,'R-03-F'),
(128,37,'0406209033','2015-10-12','19:37:28','PUNTO',7,'Control 3'),
(129,37,'0403669508','2015-10-12','19:37:29','PUNTO',8,'Punto Flotante'),
(130,38,'0406220547','2015-10-12','19:52:26','RONDA',14,'R-03-F'),
(131,38,'0406209033','2015-10-12','19:52:27','PUNTO',7,'Control 3'),
(132,38,'0403669508','2015-10-12','19:52:28','PUNTO',8,'Punto Flotante'),
(133,38,'0406214305','2015-10-12','19:52:30',NULL,NULL,NULL),
(134,39,'0406220547','2015-10-12','19:56:00','RONDA',14,'R-03-F'),
(135,39,'0406209033','2015-10-12','19:56:01','PUNTO',7,'Control 3'),
(136,39,'0403669508','2015-10-12','19:56:02','PUNTO',8,'Punto Flotante'),
(137,39,'0406214305','2015-10-12','19:56:04',NULL,NULL,NULL),
(138,40,'0004049464','2015-10-12','19:58:13','VIGILANTE',7,'Pedro Martinez'),
(139,40,'0406220547','2015-10-12','19:58:15','RONDA',14,'R-03-F'),
(140,40,'0406214305','2015-10-12','19:58:16',NULL,NULL,NULL),
(141,40,'0406209033','2015-10-12','19:58:17','PUNTO',7,'Control 3'),
(142,40,'0403669508','2015-10-12','19:58:18','PUNTO',8,'Punto Flotante'),
(143,41,'0004049464','2015-10-12','20:08:10','VIGILANTE',7,'Pedro Martinez'),
(144,41,'0406213943','2015-10-12','20:08:11','RONDA',13,'Ronda 01-02'),
(145,41,'0406215258','2015-10-12','20:08:12','PUNTO',5,'Control 1'),
(146,41,'0406219258','2015-10-12','20:08:13','PUNTO',6,'Control 2'),
(147,41,'0406220547','2015-10-12','20:08:14','RONDA',14,'R-03-F'),
(148,41,'0406209033','2015-10-12','20:08:15','PUNTO',7,'Control 3'),
(149,41,'0403669508','2015-10-12','20:08:16','PUNTO',8,'Punto Flotante'),
(150,41,'0004044154','2015-10-12','20:08:22','VIGILANTE',6,'Fernando Colomo'),
(151,41,'0406220547','2015-10-12','20:08:23','RONDA',14,'R-03-F'),
(152,41,'0406209033','2015-10-12','20:08:24','PUNTO',7,'Control 3'),
(153,41,'0403669508','2015-10-12','20:08:25','PUNTO',8,'Punto Flotante'),
(154,41,'0406213943','2015-10-12','20:08:26','RONDA',13,'Ronda 01-02'),
(155,41,'0406215258','2015-10-12','20:08:27','PUNTO',5,'Control 1'),
(156,41,'0406219258','2015-10-12','20:08:28','PUNTO',6,'Control 2'),
(157,42,'0004044154','2015-10-12','20:12:42','VIGILANTE',6,'Fernando Colomo'),
(158,42,'0406215258','2015-10-12','20:12:44','PUNTO',5,'Control 1'),
(159,42,'0406219258','2015-10-12','20:12:45','PUNTO',6,'Control 2'),
(160,42,'0403669508','2015-10-12','20:12:46','PUNTO',8,'Punto Flotante'),
(161,42,'0406209033','2015-10-12','20:12:47','PUNTO',7,'Control 3'),
(162,43,'0004049464','2015-10-12','20:13:40','VIGILANTE',7,'Pedro Martinez'),
(163,43,'0406209033','2015-10-12','20:13:42','PUNTO',7,'Control 3'),
(164,43,'0403669508','2015-10-12','20:13:43','PUNTO',8,'Punto Flotante'),
(165,43,'0406219258','2015-10-12','20:13:44','PUNTO',6,'Control 2'),
(166,44,'0004049464','2015-10-12','20:18:42','VIGILANTE',7,'Pedro Martinez'),
(167,44,'0406220547','2015-10-12','20:18:44','RONDA',14,'R-03-F'),
(168,44,'0406209033','2015-10-12','20:18:47','PUNTO',7,'Control 3'),
(169,44,'0406214305','2015-10-12','20:18:48',NULL,NULL,NULL),
(170,44,'0403669508','2015-10-12','20:18:50','PUNTO',8,'Punto Flotante');

/*Table structure for table `edificios` */

DROP TABLE IF EXISTS `edificios`;

CREATE TABLE `edificios` (
  `edificioId` int(11) NOT NULL AUTO_INCREMENT,
  `grupoId` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`edificioId`),
  KEY `ref_grupo` (`grupoId`),
  CONSTRAINT `ref_grupo` FOREIGN KEY (`grupoId`) REFERENCES `grupos` (`grupoId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `edificios` */

insert  into `edificios`(`edificioId`,`grupoId`,`nombre`) values 
(6,5,'Edificio principal');

/*Table structure for table `grupos` */

DROP TABLE IF EXISTS `grupos`;

CREATE TABLE `grupos` (
  `grupoId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`grupoId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `grupos` */

insert  into `grupos`(`grupoId`,`nombre`) values 
(5,'GRUPO 1');

/*Table structure for table `puntos` */

DROP TABLE IF EXISTS `puntos`;

CREATE TABLE `puntos` (
  `puntoId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `edificioId` int(11) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `cota` varchar(255) DEFAULT NULL,
  `cubiculo` varchar(255) DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`puntoId`),
  UNIQUE KEY `idx_tag` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `puntos` */

insert  into `puntos`(`puntoId`,`nombre`,`edificioId`,`tag`,`cota`,`cubiculo`,`observaciones`) values 
(5,'Control 1',6,'0406215258','C1','CB1','Primer punto'),
(6,'Control 2',6,'0406219258','C1','CB2','Segundo punto'),
(7,'Control 3',6,'0406209033','C1','CB3','Tercer punto'),
(8,'Punto Flotante',6,'0403669508','CF','CBF','El punto que flota');

/*Table structure for table `rondas` */

DROP TABLE IF EXISTS `rondas`;

CREATE TABLE `rondas` (
  `rondaId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `tagf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rondaId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `rondas` */

insert  into `rondas`(`rondaId`,`nombre`,`tag`,`tagf`) values 
(13,'Ronda 01-02','0406213943',NULL),
(14,'R-03-F','0406220547',NULL);

/*Table structure for table `rondas_realizadas` */

DROP TABLE IF EXISTS `rondas_realizadas`;

CREATE TABLE `rondas_realizadas` (
  `rondaRealizadaId` int(11) NOT NULL AUTO_INCREMENT,
  `rondaId` int(11) DEFAULT NULL,
  `vigilanteId` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `resultado` text,
  PRIMARY KEY (`rondaRealizadaId`),
  KEY `ref_ronda2` (`rondaId`),
  KEY `ref_vigilante` (`vigilanteId`),
  CONSTRAINT `ref_ronda2` FOREIGN KEY (`rondaId`) REFERENCES `rondas` (`rondaId`),
  CONSTRAINT `ref_vigilante` FOREIGN KEY (`vigilanteId`) REFERENCES `vigilantes` (`vigilanteId`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;

/*Data for the table `rondas_realizadas` */

insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`vigilanteId`,`fecha`,`hora`,`resultado`) values 
(128,14,7,'2015-10-12','20:18:44','CORRECTO');

/*Table structure for table `rondas_realizadaspuntos` */

DROP TABLE IF EXISTS `rondas_realizadaspuntos`;

CREATE TABLE `rondas_realizadaspuntos` (
  `rondaRealizadaPuntoId` int(11) NOT NULL AUTO_INCREMENT,
  `rondaRealizadaId` int(11) DEFAULT NULL,
  `orden` int(1) DEFAULT NULL,
  `puntoId` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `tagleido` varchar(255) DEFAULT NULL,
  `ordenleido` int(11) DEFAULT NULL,
  `resultado` text,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rondaRealizadaPuntoId`),
  KEY `ref_rondaRealizada` (`rondaRealizadaId`),
  KEY `ref_punto2` (`puntoId`),
  CONSTRAINT `ref_punto2` FOREIGN KEY (`puntoId`) REFERENCES `puntos` (`puntoId`),
  CONSTRAINT `ref_rondaRealizada` FOREIGN KEY (`rondaRealizadaId`) REFERENCES `rondas_realizadas` (`rondaRealizadaId`)
) ENGINE=InnoDB AUTO_INCREMENT=293 DEFAULT CHARSET=utf8;

/*Data for the table `rondas_realizadaspuntos` */

insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`) values 
(290,128,1,7,'2015-10-12','20:18:47','0406209033',1,'CORRECTO','Control 3'),
(291,128,2,8,'2015-10-12','20:18:50','0403669508',3,'FUERA DE SECUENCIA','Punto Flotante'),
(292,128,NULL,NULL,'2015-10-12','20:18:48','0406214305',2,'TAG DESCONOCIDO',NULL);

/*Table structure for table `rondaspuntos` */

DROP TABLE IF EXISTS `rondaspuntos`;

CREATE TABLE `rondaspuntos` (
  `rondaPuntoId` int(11) NOT NULL AUTO_INCREMENT,
  `orden` int(11) DEFAULT NULL,
  `rondaId` int(11) DEFAULT NULL,
  `puntoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`rondaPuntoId`),
  KEY `ref_ronda` (`rondaId`),
  KEY `ref_punto` (`puntoId`),
  CONSTRAINT `ref_punto` FOREIGN KEY (`puntoId`) REFERENCES `puntos` (`puntoId`),
  CONSTRAINT `ref_ronda` FOREIGN KEY (`rondaId`) REFERENCES `rondas` (`rondaId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `rondaspuntos` */

insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values 
(21,1,13,5),
(22,2,13,6),
(23,1,14,7),
(24,2,14,8);

/*Table structure for table `vigilantes` */

DROP TABLE IF EXISTS `vigilantes`;

CREATE TABLE `vigilantes` (
  `vigilanteId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `tagf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vigilanteId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `vigilantes` */

insert  into `vigilantes`(`vigilanteId`,`nombre`,`tag`,`tagf`) values 
(6,'Fernando Colomo','0004044154',NULL),
(7,'Pedro Martinez','0004049464',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

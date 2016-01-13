/*
SQLyog Community v12.18 (64 bit)
MySQL - 5.6.16 : Database - sguard
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
USE `sguard`;

/*Table structure for table `administradores` */

DROP TABLE IF EXISTS `administradores`;

CREATE TABLE `administradores` (
  `administradorId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(765) DEFAULT NULL,
  `login` varchar(765) DEFAULT NULL,
  `password` varchar(765) DEFAULT NULL,
  `email` varchar(765) DEFAULT NULL,
  `nivel` int(11) DEFAULT '0',
  PRIMARY KEY (`administradorId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `administradores` */

insert  into `administradores`(`administradorId`,`nombre`,`login`,`password`,`email`,`nivel`) values (2,'Vigilante','vigilante','vigilante','vig@gmail.com',2);
insert  into `administradores`(`administradorId`,`nombre`,`login`,`password`,`email`,`nivel`) values (4,'Administrador Principal','admin','admin','adm@gh.com',0);
insert  into `administradores`(`administradorId`,`nombre`,`login`,`password`,`email`,`nivel`) values (5,'Jefe de equipo','jefe','jefe','juan@gmail.com',1);
insert  into `administradores`(`administradorId`,`nombre`,`login`,`password`,`email`,`nivel`) values (6,'adm2','adm2','adm2','adm2@gmail.com',0);

/*Table structure for table `descargas` */

DROP TABLE IF EXISTS `descargas`;

CREATE TABLE `descargas` (
  `descargaId` int(11) NOT NULL AUTO_INCREMENT,
  `nterminal` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `resultado` text,
  PRIMARY KEY (`descargaId`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8;

/*Data for the table `descargas` */

insert  into `descargas`(`descargaId`,`nterminal`,`fecha`,`hora`,`resultado`) values (136,'112339','2016-01-07','18:33:35','CARGA CN50');
insert  into `descargas`(`descargaId`,`nterminal`,`fecha`,`hora`,`resultado`) values (137,'112339','2016-01-11','16:29:14','CARGA CN50');
insert  into `descargas`(`descargaId`,`nterminal`,`fecha`,`hora`,`resultado`) values (138,'112339','2016-01-13','10:59:19','CARGA CN50');
insert  into `descargas`(`descargaId`,`nterminal`,`fecha`,`hora`,`resultado`) values (139,'112339','2016-01-13','11:06:39','CARGA CN50');
insert  into `descargas`(`descargaId`,`nterminal`,`fecha`,`hora`,`resultado`) values (140,'112339','2016-01-13','11:07:42','CARGA CN50');

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
  `incidenciaId` int(11) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`descargaLineaId`)
) ENGINE=InnoDB AUTO_INCREMENT=5147 DEFAULT CHARSET=utf8;

/*Data for the table `descargas_lineas` */

insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5088,136,'0004044154','2015-12-10','16:10:47','VIGILANTE',6,'Fernando Colomo',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5089,136,'0406213943','2015-12-10','16:11:26','RONDA',13,'Ronda 01-02',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5090,136,'0406215258','2015-12-10','16:11:32','PUNTO',5,'Control 1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5091,136,'0406219258','2015-12-10','16:11:38','PUNTO',6,'Control 2',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5092,136,'0406220547','2015-12-10','16:11:45','RONDA',14,'R-03-F',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5093,136,'0403669508','2015-12-10','16:11:51','PUNTO',8,'Punto Flotante',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5094,136,'0406219258','2015-12-10','16:12:23','PUNTO',6,'Control 2',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5095,136,'0406215258','2015-12-10','16:12:29','PUNTO',5,'Control 1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5096,136,'0004049464','2015-12-10','16:20:27','VIGILANTE',7,'Pedro Martinez',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5097,136,'0406220547','2015-12-10','16:20:30','RONDA',14,'R-03-F',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5098,136,'0406220547','2015-12-10','16:21:32','RONDA',14,'R-03-F',1,'este esta roto ');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5099,136,'0406209033','2015-12-10','16:25:19','PUNTO',7,'Control 3',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5100,136,'0406209033','2015-12-10','16:25:24','PUNTO',7,'Control 3',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5101,136,'0406215258','2015-12-10','16:25:28','PUNTO',5,'Control 1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5102,136,'0004049464','2015-12-10','16:28:39','VIGILANTE',7,'Pedro Martinez',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5103,136,'0406220547','2015-12-10','16:28:43','RONDA',14,'R-03-F',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5104,136,'0406215258','2015-12-10','16:29:46','PUNTO',5,'Control 1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5105,136,'0004044154','2015-12-10','16:33:30','VIGILANTE',6,'Fernando Colomo',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5106,136,'0406213943','2015-12-10','16:33:33','RONDA',13,'Ronda 01-02',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5107,137,'0004044154','2015-12-10','16:10:47','VIGILANTE',6,'Fernando Colomo',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5108,137,'0406213943','2015-12-10','16:11:26','RONDA',13,'Ronda 01-02',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5109,137,'0406215258','2015-12-10','16:11:32','PUNTO',5,'Control 1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5110,137,'0406219258','2015-12-10','16:11:38','PUNTO',6,'Control 2',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5111,137,'0406220547','2015-12-10','16:11:45','RONDA',14,'R-03-F',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5112,137,'0403669508','2015-12-10','16:11:51','PUNTO',8,'Punto Flotante',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5113,137,'0406219258','2015-12-10','16:12:23','PUNTO',6,'Control 2',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5114,137,'0406215258','2015-12-10','16:12:29','PUNTO',5,'Control 1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5115,137,'0004049464','2015-12-10','16:20:27','VIGILANTE',7,'Pedro Martinez',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5116,137,'0406220547','2015-12-10','16:20:30','RONDA',14,'R-03-F',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5117,137,'0406220547','2015-12-10','16:21:32','RONDA',14,'R-03-F',1,'este esta roto ');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5118,137,'0406209033','2015-12-10','16:25:19','PUNTO',7,'Control 3',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5119,137,'0406209033','2015-12-10','16:25:24','PUNTO',7,'Control 3',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5120,137,'0406215258','2015-12-10','16:25:28','PUNTO',5,'Control 1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5121,137,'0004049464','2015-12-10','16:28:39','VIGILANTE',7,'Pedro Martinez',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5122,137,'0406220547','2015-12-10','16:28:43','RONDA',14,'R-03-F',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5123,137,'0406215258','2015-12-10','16:29:46','PUNTO',5,'Control 1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5124,137,'0004044154','2015-12-10','16:33:30','VIGILANTE',6,'Fernando Colomo',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5125,137,'0406213943','2015-12-10','16:33:33','RONDA',13,'Ronda 01-02',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5126,138,'000000','2016-01-13','09:49:58','VIGILANTE',9,'Arturo',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5127,138,'000001','2016-01-13','09:50:02','RONDA',16,'R C1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5128,138,'111111','2016-01-13','09:50:08','PUNTO',9,'C1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5129,138,'222222','2016-01-13','09:50:13','PUNTO',10,'C2',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5130,138,'333333','2016-01-13','09:50:16','PUNTO',11,'C3',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5131,138,'444444','2016-01-13','09:50:20','PUNTO',12,'C4',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5132,138,'444445','2016-01-13','09:50:25','PUNTO',13,'FLOT',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5133,139,'000000','2016-01-13','09:49:58','VIGILANTE',9,'Arturo',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5134,139,'000001','2016-01-13','09:50:02','RONDA',16,'R C1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5135,139,'111111','2016-01-13','09:50:08','PUNTO',9,'C1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5136,139,'222222','2016-01-13','09:50:13','PUNTO',10,'C2',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5137,139,'333333','2016-01-13','09:50:16','PUNTO',11,'C3',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5138,139,'444444','2016-01-13','09:50:20','PUNTO',12,'C4',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5139,139,'444445','2016-01-13','09:50:25','PUNTO',13,'FLOT',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5140,140,'000000','2016-01-13','09:49:58','VIGILANTE',9,'Arturo',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5141,140,'000001','2016-01-13','09:50:02','RONDA',16,'R C1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5142,140,'111111','2016-01-13','09:50:08','PUNTO',9,'C1',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5143,140,'222222','2016-01-13','09:50:13','PUNTO',10,'C2',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5144,140,'333333','2016-01-13','09:50:16','PUNTO',11,'C3',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5145,140,'444444','2016-01-13','09:50:20','PUNTO',12,'C4',0,'');
insert  into `descargas_lineas`(`descargaLineaId`,`descargaId`,`tag`,`fecha`,`hora`,`tipo`,`tipoId`,`nombre`,`incidenciaId`,`observaciones`) values (5146,140,'444445','2016-01-13','09:50:25','PUNTO',13,'FLOT',0,'');

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

insert  into `edificios`(`edificioId`,`grupoId`,`nombre`) values (6,5,'Edificio principal');

/*Table structure for table `grupos` */

DROP TABLE IF EXISTS `grupos`;

CREATE TABLE `grupos` (
  `grupoId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`grupoId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `grupos` */

insert  into `grupos`(`grupoId`,`nombre`) values (5,'GRUPO 1');
insert  into `grupos`(`grupoId`,`nombre`) values (6,'GRUPO 2');

/*Table structure for table `incidencias` */

DROP TABLE IF EXISTS `incidencias`;

CREATE TABLE `incidencias` (
  `incidenciaId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`incidenciaId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `incidencias` */

insert  into `incidencias`(`incidenciaId`,`nombre`) values (1,'Primera incidencia');
insert  into `incidencias`(`incidenciaId`,`nombre`) values (2,'Segunda incidencia');
insert  into `incidencias`(`incidenciaId`,`nombre`) values (3,'Punto sin etiqueta');

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
  `csnmax` int(11) DEFAULT NULL COMMENT 'Max. tiempo (min) entre rondas',
  `csnmargen` int(11) DEFAULT NULL COMMENT 'Margen de tiempo antes de penalizar',
  `lastcontrol` datetime DEFAULT NULL COMMENT 'Última vez que ese punto fué controlado',
  PRIMARY KEY (`puntoId`),
  UNIQUE KEY `idx_tag` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `puntos` */

insert  into `puntos`(`puntoId`,`nombre`,`edificioId`,`tag`,`cota`,`cubiculo`,`observaciones`,`csnmax`,`csnmargen`,`lastcontrol`) values (5,'Control 1',6,'0406215258','C1','CB1','Primer punto',120,60,'2015-12-10 16:29:46');
insert  into `puntos`(`puntoId`,`nombre`,`edificioId`,`tag`,`cota`,`cubiculo`,`observaciones`,`csnmax`,`csnmargen`,`lastcontrol`) values (6,'Control 2',6,'0406219258','C1','CB2','Segundo punto',0,0,'2015-12-10 16:12:23');
insert  into `puntos`(`puntoId`,`nombre`,`edificioId`,`tag`,`cota`,`cubiculo`,`observaciones`,`csnmax`,`csnmargen`,`lastcontrol`) values (7,'Control 3',6,'0406209033','C1','CB3','Tercer punto',0,0,'2015-12-10 16:25:24');
insert  into `puntos`(`puntoId`,`nombre`,`edificioId`,`tag`,`cota`,`cubiculo`,`observaciones`,`csnmax`,`csnmargen`,`lastcontrol`) values (8,'Punto Flotante',6,'0403669508','CF','CBF','El punto que flota',0,0,'2015-12-10 16:11:51');

/*Table structure for table `rondas` */

DROP TABLE IF EXISTS `rondas`;

CREATE TABLE `rondas` (
  `rondaId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `tagf` varchar(255) DEFAULT NULL,
  `mintime` int(11) DEFAULT NULL COMMENT 'Minimo tiempo entre puntos de una ronda',
  `maxtime` int(11) DEFAULT NULL COMMENT 'Maximo tiempo entre puntos de una ronda',
  PRIMARY KEY (`rondaId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `rondas` */

insert  into `rondas`(`rondaId`,`nombre`,`tag`,`tagf`,`mintime`,`maxtime`) values (13,'Ronda 01-02','0406213943',NULL,30,120);
insert  into `rondas`(`rondaId`,`nombre`,`tag`,`tagf`,`mintime`,`maxtime`) values (14,'R-03-F','0406220547',NULL,4,10);
insert  into `rondas`(`rondaId`,`nombre`,`tag`,`tagf`,`mintime`,`maxtime`) values (15,'Prueba','45555',NULL,25,120);

/*Table structure for table `rondas_realizadas` */

DROP TABLE IF EXISTS `rondas_realizadas`;

CREATE TABLE `rondas_realizadas` (
  `rondaRealizadaId` int(11) NOT NULL AUTO_INCREMENT,
  `rondaId` int(11) DEFAULT NULL,
  `terminalId` int(11) DEFAULT NULL,
  `vigilanteId` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `resultado` text,
  `validada` tinyint(1) DEFAULT '0',
  `obsvalida` text,
  `incidenciaId` int(11) DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`rondaRealizadaId`),
  KEY `ref_ronda2` (`rondaId`),
  KEY `ref_vigilante` (`vigilanteId`),
  KEY `ref_terminal` (`terminalId`),
  KEY `ref_incidencia` (`incidenciaId`),
  CONSTRAINT `ref_incidencia` FOREIGN KEY (`incidenciaId`) REFERENCES `incidencias` (`incidenciaId`),
  CONSTRAINT `ref_ronda2` FOREIGN KEY (`rondaId`) REFERENCES `rondas` (`rondaId`),
  CONSTRAINT `ref_terminal` FOREIGN KEY (`terminalId`) REFERENCES `terminales` (`terminalId`),
  CONSTRAINT `ref_vigilante` FOREIGN KEY (`vigilanteId`) REFERENCES `vigilantes` (`vigilanteId`)
) ENGINE=InnoDB AUTO_INCREMENT=445 DEFAULT CHARSET=utf8;

/*Data for the table `rondas_realizadas` */

insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (433,13,1,6,'2015-12-10','16:11:26','CORRECTO',1,'VALIDACION AUTOMÁTICA',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (434,14,1,6,'2015-12-10','16:11:45','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (435,14,1,7,'2015-12-10','16:20:30','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (436,14,1,7,'2015-12-10','16:21:32','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (437,14,1,7,'2015-12-10','16:28:43','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (438,13,1,6,'2015-12-10','16:33:33','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (439,13,1,6,'2015-12-10','16:11:26','CORRECTO',1,'VALIDACION AUTOMÁTICA',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (440,14,1,6,'2015-12-10','16:11:45','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (441,14,1,7,'2015-12-10','16:20:30','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (442,14,1,7,'2015-12-10','16:21:32','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (443,14,1,7,'2015-12-10','16:28:43','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);
insert  into `rondas_realizadas`(`rondaRealizadaId`,`rondaId`,`terminalId`,`vigilanteId`,`fecha`,`hora`,`resultado`,`validada`,`obsvalida`,`incidenciaId`,`observaciones`) values (444,13,1,6,'2015-12-10','16:33:33','PUNTOS SIN CONTROLAR',0,'',NULL,NULL);

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
  `incidenciaId` int(11) DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`rondaRealizadaPuntoId`),
  KEY `ref_rondaRealizada` (`rondaRealizadaId`),
  KEY `ref_punto2` (`puntoId`),
  KEY `ref_inicidencia2` (`incidenciaId`),
  CONSTRAINT `ref_rondaRealizada` FOREIGN KEY (`rondaRealizadaId`) REFERENCES `rondas_realizadas` (`rondaRealizadaId`)
) ENGINE=InnoDB AUTO_INCREMENT=1373 DEFAULT CHARSET=utf8;

/*Data for the table `rondas_realizadaspuntos` */

insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1331,433,1,5,'2015-12-10','16:11:32','0406215258',1,'CORRECTO','Control 1',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1332,433,2,6,'2015-12-10','16:11:38','0406219258',2,'CORRECTO / TIEMPOS MAX O MIN ENTRE PUNTOS NO CUMPLIDOS','Control 2',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1333,434,4,5,'2015-12-10','16:12:29','0406215258',3,'FUERA DE SECUENCIA / TIEMPOS MAX O MIN ENTRE PUNTOS NO CUMPLIDOS','Control 1',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1334,434,3,6,'2015-12-10','16:12:23','0406219258',2,'FUERA DE SECUENCIA / TIEMPOS MAX O MIN ENTRE PUNTOS NO CUMPLIDOS','Control 2',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1335,434,1,7,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1336,434,2,8,'2015-12-10','16:11:51','0403669508',1,'FUERA DE SECUENCIA','Punto Flotante',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1337,435,4,5,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1338,435,3,6,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1339,435,1,7,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1340,435,2,8,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1341,436,4,5,'2015-12-10','16:25:28','0406215258',3,'FUERA DE SECUENCIA','Control 1',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1342,436,3,6,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1343,436,1,7,'2015-12-10','16:25:19','0406209033',1,'CORRECTO','Control 3',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1344,436,2,8,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1345,436,NULL,7,'2015-12-10','16:25:24','0406209033',2,'PUNTO REPETIDO','Control 3',0,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1346,437,4,5,'2015-12-10','16:29:46','0406215258',1,'FUERA DE SECUENCIA','Control 1',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1347,437,3,6,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1348,437,1,7,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1349,437,2,8,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1350,438,1,5,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1351,438,2,6,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1352,439,1,5,'2015-12-10','16:11:32','0406215258',1,'CORRECTO','Control 1',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1353,439,2,6,'2015-12-10','16:11:38','0406219258',2,'CORRECTO / TIEMPOS MAX O MIN ENTRE PUNTOS NO CUMPLIDOS','Control 2',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1354,440,4,5,'2015-12-10','16:12:29','0406215258',3,'FUERA DE SECUENCIA / TIEMPOS MAX O MIN ENTRE PUNTOS NO CUMPLIDOS','Control 1',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1355,440,3,6,'2015-12-10','16:12:23','0406219258',2,'FUERA DE SECUENCIA / TIEMPOS MAX O MIN ENTRE PUNTOS NO CUMPLIDOS','Control 2',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1356,440,1,7,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1357,440,2,8,'2015-12-10','16:11:51','0403669508',1,'FUERA DE SECUENCIA','Punto Flotante',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1358,441,4,5,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1359,441,3,6,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1360,441,1,7,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1361,441,2,8,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1362,442,4,5,'2015-12-10','16:25:28','0406215258',3,'FUERA DE SECUENCIA','Control 1',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1363,442,3,6,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1364,442,1,7,'2015-12-10','16:25:19','0406209033',1,'CORRECTO','Control 3',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1365,442,2,8,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1366,442,NULL,7,'2015-12-10','16:25:24','0406209033',2,'PUNTO REPETIDO','Control 3',0,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1367,443,4,5,'2015-12-10','16:29:46','0406215258',1,'FUERA DE SECUENCIA','Control 1',NULL,'');
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1368,443,3,6,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1369,443,1,7,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1370,443,2,8,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1371,444,1,5,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);
insert  into `rondas_realizadaspuntos`(`rondaRealizadaPuntoId`,`rondaRealizadaId`,`orden`,`puntoId`,`fecha`,`hora`,`tagleido`,`ordenleido`,`resultado`,`nombre`,`incidenciaId`,`observaciones`) values (1372,444,2,6,NULL,NULL,NULL,NULL,'NO LEIDO',NULL,NULL,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

/*Data for the table `rondaspuntos` */

insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values (21,1,13,5);
insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values (22,2,13,6);
insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values (29,1,15,5);
insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values (30,3,15,7);
insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values (31,2,15,6);
insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values (32,1,14,7);
insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values (33,2,14,8);
insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values (34,3,14,6);
insert  into `rondaspuntos`(`rondaPuntoId`,`orden`,`rondaId`,`puntoId`) values (35,4,14,5);

/*Table structure for table `terminales` */

DROP TABLE IF EXISTS `terminales`;

CREATE TABLE `terminales` (
  `terminalId` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `fechaAlta` date DEFAULT NULL,
  `fechaBaja` date DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`terminalId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `terminales` */

insert  into `terminales`(`terminalId`,`numero`,`nombre`,`fechaAlta`,`fechaBaja`,`observaciones`) values (1,'112339','BONITO 112339','2015-10-20','2015-10-20','Observaciones de este terminal algo más amplias');

/*Table structure for table `vigilantes` */

DROP TABLE IF EXISTS `vigilantes`;

CREATE TABLE `vigilantes` (
  `vigilanteId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `tagf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vigilanteId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `vigilantes` */

insert  into `vigilantes`(`vigilanteId`,`nombre`,`tag`,`tagf`) values (6,'Fernando Colomos','0004044154',NULL);
insert  into `vigilantes`(`vigilanteId`,`nombre`,`tag`,`tagf`) values (7,'Pedro Martinez','0004049464',NULL);
insert  into `vigilantes`(`vigilanteId`,`nombre`,`tag`,`tagf`) values (8,'Vigilante 1',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

/*
SQLyog Community v12.12 (64 bit)
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
  PRIMARY KEY (`administradorId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `administradores` */

insert  into `administradores`(`administradorId`,`nombre`,`login`,`password`,`email`) values (4,'Administrador Principal','admin','admin','adm@gh.com');

/*Table structure for table `descargas` */

DROP TABLE IF EXISTS `descargas`;

CREATE TABLE `descargas` (
  `descargaId` int(11) NOT NULL AUTO_INCREMENT,
  `nterminal` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `resultado` text,
  PRIMARY KEY (`descargaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `descargas` */

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `descargas_lineas` */

/*Table structure for table `edificios` */

DROP TABLE IF EXISTS `edificios`;

CREATE TABLE `edificios` (
  `edificioId` int(11) NOT NULL AUTO_INCREMENT,
  `grupoId` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`edificioId`),
  KEY `ref_grupo` (`grupoId`),
  CONSTRAINT `ref_grupo` FOREIGN KEY (`grupoId`) REFERENCES `grupos` (`grupoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `edificios` */

/*Table structure for table `grupos` */

DROP TABLE IF EXISTS `grupos`;

CREATE TABLE `grupos` (
  `grupoId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`grupoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `grupos` */

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `puntos` */

/*Table structure for table `rondas` */

DROP TABLE IF EXISTS `rondas`;

CREATE TABLE `rondas` (
  `rondaId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `tagf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rondaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `rondas` */

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `rondas_realizadas` */

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
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8;

/*Data for the table `rondas_realizadaspuntos` */

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `rondaspuntos` */

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

/*Table structure for table `vigilantes` */

DROP TABLE IF EXISTS `vigilantes`;

CREATE TABLE `vigilantes` (
  `vigilanteId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `tagf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vigilanteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `vigilantes` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

# --------------------------------------------------------------
# DE LA 1.1.0
# --------------------------------------------------------------
CREATE TABLE `sguard`.`terminales`(  
  `terminalId` INT(11) NOT NULL AUTO_INCREMENT,
  `numero` VARCHAR(255),
  `nombre` VARCHAR(255),
  `fechaAlta` DATE,
  `fechaBaja` DATE,
  `observaciones` TEXT,
  PRIMARY KEY (`terminalId`)
);
ALTER TABLE `sguard`.`rondas_realizadas`   
  ADD COLUMN `terminalId` INT(11) NULL AFTER `rondaId`,
  ADD CONSTRAINT `ref_terminal` FOREIGN KEY (`terminalId`) REFERENCES `sguard`.`terminales`(`terminalId`);
ALTER TABLE `sguard`.`rondas_realizadas`   
  ADD COLUMN `validada` BOOL NULL AFTER `resultado`,
  ADD COLUMN `obsvalida` TEXT NULL AFTER `validada`;
ALTER TABLE `sguard`.`rondas_realizadas`   
  CHANGE `validada` `validada` TINYINT(1) DEFAULT 0  NULL;
ALTER TABLE `sguard`.`administradores`   
  ADD COLUMN `nivel` INT(11) DEFAULT 0  NULL AFTER `email`;
# --------------------------------------------------------------
# DE LA 2.0
# --------------------------------------------------------------
CREATE TABLE `sguard`.`incidencias`(
  `incidenciaId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`incidenciaId`)
);

ALTER TABLE `sguard`.`descargas_lineas`   
  ADD COLUMN `incidenciaId` INT(11) NULL AFTER `nombre`,
  ADD COLUMN `observaciones` VARCHAR(255) NULL AFTER `incidenciaId`;
  
ALTER TABLE `sguard`.`rondas_realizadas`   
  ADD COLUMN `incidenciaId` INT(11) NULL AFTER `obsvalida`,
  ADD COLUMN `observaciones` TEXT NULL AFTER `incidenciaId`;
  
  
 ALTER TABLE `sguard`.`rondas_realizadaspuntos`   
  ADD COLUMN `incidenciaId` INT(11) NULL AFTER `nombre`,
  ADD COLUMN `observaciones` TEXT NULL AFTER `incidenciaId`;
# --------------------------------------------------------------
# DE LA 2.1
# --------------------------------------------------------------
ALTER TABLE `sguard`.`rondas`   
  ADD COLUMN `mintime` INT(11) NULL   COMMENT 'Minimo tiempo entre puntos de una ronda' AFTER `tagf`,
  ADD COLUMN `maxtime` INT(11) NULL   COMMENT 'Maximo tiempo entre puntos de una ronda' AFTER `mintime`;
 ALTER TABLE `sguard`.`puntos`   
  ADD COLUMN `csnmax` INT(11) NULL   COMMENT 'Max. tiempo (min) entre rondas' AFTER `observaciones`,
  ADD COLUMN `csnmargen` INT(11) NULL   COMMENT 'Margen de tiempo antes de penalizar' AFTER `csnmax`;
ALTER TABLE `sguard`.`puntos` 
  ADD COLUMN `lastcontrol` DATETIME NULL COMMENT 'Última vez que ese punto fué controlado' AFTER `csnmargen`;

CREATE TABLE tmp_lastcontrol
	SELECT puntoId, MAX(CONCAT(fecha, " ", hora)) AS lc
	FROM rondas_realizadaspuntos AS rp
	GROUP BY puntoId;

UPDATE puntos AS p, tmp_lastcontrol AS tmp
	SET p.lastcontrol = tmp.lc
	WHERE p.puntoId = tmp.puntoId;
	
DROP TABLE tmp_lastcontrol;

ALTER TABLE `sguard`.`rondas_realizadaspuntos`  
  DROP FOREIGN KEY `ref_punto2`;
# --------------------------------------------------------------
# DE LA 2.5
# --------------------------------------------------------------
ALTER TABLE `sguard`.`rondas`   
ADD COLUMN `csnmax` INT(11) NULL  COMMENT 'Máximo tiempo entre dos inicios de la misma ronda' AFTER `maxtime`,
ADD COLUMN `csnmargen` INT(11) NULL  COMMENT 'Margen antes de considerar incorrecto' AFTER `csnmax`,
ADD COLUMN `lastcontrol` DATETIME NULL  COMMENT 'Última vez que se inició un control de esta ronda' AFTER `csnmargen`;
# --------------------------------------------------------------
# DE LA 2.6
# --------------------------------------------------------------
ALTER TABLE `sguard`.`puntos`   
  ADD COLUMN `zonafuego` VARCHAR(255) NULL AFTER `cubiculo`;
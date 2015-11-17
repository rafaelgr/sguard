`descargas_lineas`CREATE TABLE `sguard`.`incidencias`(
  `incidenciaId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  PRIMARY KEY (`incidenciaId`)
);

ALTER TABLE `sguard`.`descargas_lineas`   
  ADD COLUMN `incidenciaId` INT(11) NULL AFTER `nombre`,
  ADD COLUMN `observaciones` VARCHAR(255) NULL AFTER `incidenciaId`;
  
ALTER TABLE `sguard`.`rondas_realizadas`   
  ADD COLUMN `incidenciaId` INT(11) NULL AFTER `obsvalida`,
  ADD COLUMN `observaciones` TEXT NULL AFTER `incidenciaId`,
  ADD CONSTRAINT `ref_incidencia` FOREIGN KEY (`incidenciaId`) REFERENCES `sguard`.`incidencias`(`incidenciaId`);
  
 ALTER TABLE `sguard`.`rondas_realizadaspuntos`   
  ADD COLUMN `incidenciaId` INT(11) NULL AFTER `nombre`,
  ADD COLUMN `observaciones` TEXT NULL AFTER `incidenciaId`,
  ADD CONSTRAINT `ref_inicidencia2` FOREIGN KEY (`incidenciaId`) REFERENCES `sguard`.`incidencias`(`incidenciaId`);
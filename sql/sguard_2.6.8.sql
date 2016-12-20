ALTER TABLE `sguard`.`descargas`   
  ADD COLUMN `procesada` BOOL DEFAULT FALSE NULL AFTER `resultado`;
ALTER TABLE `sguard`.`rondas_realizadas`   
  ADD COLUMN `descargaId` INT(11) NULL AFTER `observaciones`,
  ADD CONSTRAINT `ref_descarga` FOREIGN KEY (`descargaId`) REFERENCES `sguard`.`descargas`(`descargaId`);
UPDATE descargas SET procesada = 1;
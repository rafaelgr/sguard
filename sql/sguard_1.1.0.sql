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
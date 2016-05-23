ALTER TABLE `sguard`.`rondas`   
ADD COLUMN `csnmax` INT(11) NULL  COMMENT 'Máximo tiempo entre dos inicios de la misma ronda' AFTER `maxtime`,
ADD COLUMN `csnmargen` INT(11) NULL  COMMENT 'Margen antes de considerar incorrecto' AFTER `csmax`,
ADD COLUMN `lastcontrol` DATETIME NULL  COMMENT 'Última vez que se inició un control de esta ronda' AFTER `csnmargen`;
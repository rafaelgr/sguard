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

  
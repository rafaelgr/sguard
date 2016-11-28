ALTER TABLE `sguard`.`rondas`   
  ADD  UNIQUE INDEX `idx_ronda_tag` (`tag`);
ALTER TABLE `sguard`.`vigilantes`   
  ADD  UNIQUE INDEX `ref_vigilante_tag` (`tag`);
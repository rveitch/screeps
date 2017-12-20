const towerController = {

  run(Game) {
    const tower = Game.getObjectById('TOWER_ID');
    if (tower) {
      // Repair Towers
      const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax,
      });
      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
      }

      // Attack hostile creeps with tower
      const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
      }
    }
  },

};

module.exports = towerController;

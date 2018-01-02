const towerController = {

  run(Game) {
    const currentRoomName = Game.spawns['Spawn1'].room.name;
    var towers = Game.rooms[currentRoomName].find(
      FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

    _.forEach(towers, function(tower, index) {
      if (tower) {
        // Repair Towers
        /*const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => structure.hits < structure.hitsMax,
        });
        if (closestDamagedStructure) {
          console.log('Tower is repairing damaged structure.');
          tower.repair(closestDamagedStructure);
        }*/

        // Attack hostile creeps with tower
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
          tower.attack(closestHostile);
        } else {
          // console.log('No Hostiles');
        }
      } else {
        console.log('No Tower');
      }
    });
  },

};

module.exports = towerController;

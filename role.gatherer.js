const roleGatherer = {
  run(creep, config) {
    const preferSource = config.roles.gatherers.preferSource;

    if (creep.carry.energy < creep.carryCapacity) {
      /*var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
      if (energy.length) {
        console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
        creep.pickup(energy[0]);
      }*/

      const targets = creep.room.find(FIND_DROPPED_RESOURCES);
      if(targets.length) {
          creep.moveTo(targets[0]);
          creep.pickup(targets[0]);

          var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
          if (energy.length) {
            console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
            creep.pickup(energy[0]);
          }
      }
    }
  }
};

module.exports = roleGatherer;

/*
if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
  creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
}
*/

/*
const targets = creep.room.find(FIND_DROPPED_RESOURCES);
if(targets.length) {
    creep.moveTo(targets[0]);
    creep.pickup(targets[0]);
}
*/

const roleFixer = {
  run(creep, config) {
    const preferSource = config.roles.fixers.preferSource;

    // Switch to harvesting when out of energy
    if (creep.memory.repairing && creep.carry.energy === 0) {
      creep.memory.repairing = false;
      creep.say('🔄 harvest');
    }

    // Switch to repairing when energy is full
    if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
      creep.memory.repairing = true;
      creep.say('🔧 repair');
    }

    // Find and move to things to repair
    if (creep.memory.repairing) {
      let targets = creep.room.find(FIND_STRUCTURES, {
        filter: (object) => object.hits < object.hitsMax,
        //filter: (s) => s.structureType == STRUCTURE_WALL
      });

      /* const targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: object => object.hits < object.hitsMax,
      }); */

      // targets = _.sortBy(targets, target => creep.pos.getRangeTo(target));
      targets.sort((a, b) => a.hits - b.hits);


      if (targets.length > 0) {
        if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }

    // Find and move to energy sources
    if (!creep.memory.repairing) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[preferSource]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[preferSource], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  },
};

module.exports = roleFixer;

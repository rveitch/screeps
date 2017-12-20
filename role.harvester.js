const energyController = require('controller.energy');

const roleHarvester = {

  run(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_CONTAINER ||
            structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        },
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
  },
};

module.exports = roleHarvester;

/**
const containers = creep.pos.findInRange(FIND_STRUCTURES, 1,
      {filter: {structureType: STRUCTURE_CONTAINER}});
containers[0].transfer(creep, RESOURCE_ENERGY);


const containersWithEnergy = room.find(FIND_STRUCTURES, {
    filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                   i.store[RESOURCE_ENERGY] > 0
});const total = _.sum(container.store);


const target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
if(target) {
    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

const pos = Game.rooms.sim.getPositionAt(5,12);
const source = pos.findClosestByRange(FIND_SOURCES_ACTIVE);
 */

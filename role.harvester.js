const energyController = require('controller.energy');

const roleHarvester = {

  run(creep, config) {
    const preferSource = config.roles.harvesters.preferSource;
    if (creep.carry.energy < creep.carryCapacity) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[preferSource]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[preferSource], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER // ||
            //structure.structureType === STRUCTURE_CONTAINER
          //) && (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.storeCapacity);
          ) && (structure.energy < structure.energyCapacity);
        },
      });
      if (targets.length > 0) {
        // console.log(targets[0].structureType);
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        // console.log('No empty structures found for Harvester to desposit energy');
        const targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (
              structure.structureType === STRUCTURE_CONTAINER
            ) && (_.sum(structure.store) < structure.storeCapacity);
          },
        });
        if (targets.length > 0) {
          creep.say('Container');
          if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
          }
        }
      } //
    }
  },
};

module.exports = roleHarvester;

/**
const pos = Game.rooms.sim.getPositionAt(5,12);
const source = pos.findClosestByRange(FIND_SOURCES_ACTIVE);
 */

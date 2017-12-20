var roleFixer = {
    run: function(creep) {

      // Switch to harvesting when out of energy
      if (creep.memory.repairing && creep.carry.energy == 0) {
        creep.memory.repairing = false;
        creep.say('🔄 harvest');
      }

      // Switch to repairing when energy is full
      if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
        creep.memory.repairing = true;
        creep.say('🔧 repair');
      }

      // Find and move to things to repair
      if (creep.memory.repairing) {
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        /*const targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });*/
        targets.sort((a,b) => a.hits - b.hits);

        if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
      }

      // Find and move to energy sources
      if (!creep.memory.repairing) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }

  }
};

module.exports = roleFixer;


/*
const target = creep.pos.findClosestByRange(FIND_STRUCTURES,
    {filter: {structureType: STRUCTURE_WALL}});
if(target) {
    if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

const source = pos.findClosestByRange(FIND_SOURCES_ACTIVE);
*/

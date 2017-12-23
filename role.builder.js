const roleBuilder = {
  run(creep, config) {
    const preferSource = config.roles.builders.preferSource;

    // Switch to harvesting when out of energy
    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }

    // Switch to building when energy is full
    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    // Find and move to build sites
    if (creep.memory.building) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }

    // Find and move to energy sources
    if (!creep.memory.building) {
      const sources = creep.room.find(FIND_SOURCES);
      const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);

      if (droppedEnergy.length) {
        const droppedEnergySorted = _.sortBy(droppedEnergy, e => creep.pos.getRangeTo(e));
        creep.moveTo(droppedEnergySorted[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        creep.pickup(droppedEnergySorted[0]);
      }

      if (!droppedEnergy.length && creep.harvest(sources[preferSource]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[preferSource], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  },
};

module.exports = roleBuilder;

/*
To be efficient, you have to mine 3000 energy every 300 ticks.
If it's empty before that, you have lost energy on useless creeps.
If it's not empty after 300 ticks, you have lost the energy that was left.

A miner with 5 work parts will mine exactly 3000 energy every 300 ticks.
So only one miner per source.
You can store energy on the same tick as you harvest, so it never stops.
You need a container/storage/link next to the miner.

I personally save sourceId in my miner memory when it spawns.


createMiner: function(p_spawn, p_body, p_sourceId)
{
        p_spawn.createCreep(p_body, "", { role: 'miner', sourceId: p_sourceId });
}

harvest: function(creep)
{
        var source = Game.getObjectById(creep.memory.sourceId);
        if (creep.harvest(source) != 0)
            creep.moveTo(source);
}
*/

// spawn = 300 energy
// extension = 50 energy (5 = 250)
// 5ext + spawn = 550

const energyController = require('controller.energy');

const spawnController = {

  run(Game, Memory, config) {
    const creepRole = config.roles;
    const creepBody = spawnController.getBodyParts(Game);
    const allCreeps = _.filter(Game.creeps, (creep) => creep);
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    const fixers = _.filter(Game.creeps, (creep) => creep.memory.role === 'fixer');
    const harvesterPopulationOptimal = harvesters.length >= creepRole.harvesters.population;
    // console.log(`Harvesters: ${harvesters.length}\nUpgraders: ${upgraders.length}\nBuilders: ${builders.length}\nFilxers: ${fixers.length}`);

    // Re-assign other roles if no Harvesters exist
    if (!harvesterPopulationOptimal) {
      if (builders.length >= 1) {
        builders[0].memory.role = 'harvester';
        console.log('Reassigning builder to harvester role.')
      } else if (upgraders.length >= 1) {
        upgraders[0].memory.role = 'harvester';
        console.log('Reassigning upgrader to harvester role.')
      } else if (upgraders.length >= 1) {
        fixers[0].memory.role = 'harvester';
        console.log('Reassigning fixer to harvester role.')
      }
    }

    if (_.isEmpty(Game.creeps)) { // Fallback to restart production if all screep population is wiped out.
      const creepName = `Harvester_${Game.time}`;
      Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], creepName, { memory: { role: 'harvester' } });
    } else if (harvesters.length < creepRole.harvesters.population) {
      const creepName = `Harvester_${Game.time}`;
      Game.spawns['Spawn1'].spawnCreep(creepBody, creepName, { memory: { role: 'harvester' } });
    } else if (fixers.length < creepRole.fixers.population && harvesterPopulationOptimal) {
      const creepName = `Fixer_${Game.time}`;
      Game.spawns['Spawn1'].spawnCreep(creepBody, creepName, { memory: { role: 'fixer' } });
    } else if (upgraders.length < creepRole.upgraders.population && harvesterPopulationOptimal) {
      const creepName = `Upgrader_${Game.time}`;
      Game.spawns['Spawn1'].spawnCreep(creepBody, creepName, { memory: { role: 'upgrader' } });
    } else if (builders.length < creepRole.builders.population && harvesterPopulationOptimal) {
      const creepName = `Builder_${Game.time}`;
      Game.spawns['Spawn1'].spawnCreep(creepBody, creepName, { memory: { role: 'builder' } });
    }

    if (Game.spawns['Spawn1'].spawning) {
      const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
      Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        { align: 'left', opacity: 0.8 },
      );
    }
  },

  getSpawnLevel(Game, Memory, config) {

  },

  getBodyParts(Game) {
    const roomEnergy = energyController.getRoomEnergyInfo(Game);
    const energyCapacity = roomEnergy.sourceEnergy.energyCapacity;

    if (energyCapacity <= 300) {
      return [WORK,WORK,CARRY,MOVE];
    }

    if (energyCapacity <= 400) {
      return [WORK,WORK,WORK,CARRY,MOVE];
    }

    if (energyCapacity <= 550) {
      return [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    }

    if (energyCapacity <= 600 || energyCapacity <= 650 || energyCapacity >= 650) {
      return [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    }

  },

};

module.exports = spawnController;

/* const bodyPartsCost = {
  MOVE: 50,
  WORK: 100
  CARRY: 50,
  ATTACK: 80,
  RANGED_ATTACK: 150,
  HEAL: 250,
  TOUGH: 10,
  CLAIM: 600,
} */

const energyController = require('controller.energy');

const spawnController = {

  run(Game, Memory, config) {
    const creepRole = config.roles;
    const creepBody = spawnController.getBodyParts(Game);
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    const fixers = _.filter(Game.creeps, (creep) => creep.memory.role === 'fixer');
    // console.log(`Harvesters: ${harvesters.length}`, `Upgraders: ${upgraders.length}`, `Builders: ${builders.length}`, );

    if (harvesters.length < creepRole.harvesters.population) {
      const creepName = `Harvester_${Game.time}`;
      //console.log('Spawning new harvester: ' + creepName);
      Game.spawns['Spawn1'].spawnCreep(creepBody, creepName, { memory: { role: 'harvester' } });
    }

    if (upgraders.length < creepRole.upgraders.population) {
      const creepName = `Upgrader_${Game.time}`;
      //console.log('Spawning new upgrader: ' + creepName);
      Game.spawns['Spawn1'].spawnCreep(creepBody, creepName, { memory: { role: 'upgrader' } });
    }

    if (builders.length < creepRole.builders.population) {
      const creepName = `Builder_${Game.time}`;
      //console.log('Spawning new builder: ' + creepName);
      Game.spawns['Spawn1'].spawnCreep(creepBody, creepName, { memory: { role: 'builder' } });
    }

    if (fixers.length < creepRole.fixers.population) {
      const creepName = `Fixer_${Game.time}`;
      //console.log('Spawning new fixer: ' + creepName);
      Game.spawns['Spawn1'].spawnCreep(creepBody, creepName, { memory: { role: 'fixer' } });
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

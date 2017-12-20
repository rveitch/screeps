const spawnController = {

  run(Game, Memory, spawnConfig) {
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    const fixers = _.filter(Game.creeps, (creep) => creep.memory.role === 'fixer');
    // console.log(`Harvesters: ${harvesters.length}`, `Upgraders: ${upgraders.length}`, `Builders: ${builders.length}`, );

    if (harvesters.length < spawnConfig.harvesters) {
      const creepName = `Harvester_${Game.time}`;
      //console.log('Spawning new harvester: ' + creepName);
      //Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,MOVE], creepName, { memory: { role: 'harvester' } });
      // Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,CARRY,MOVE], creepName, { memory: { role: 'harvester' } });
      Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], creepName, { memory: { role: 'harvester' } });
    }

    if (upgraders.length < spawnConfig.upgraders) {
      const creepName = `Upgrader_${Game.time}`;
      //console.log('Spawning new upgrader: ' + creepName);
      //Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], creepName, { memory: { role: 'upgrader' } });
      Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,CARRY,MOVE], creepName, { memory: { role: 'upgrader' } });
    }

    if (builders.length < spawnConfig.builders) {
      const creepName = `Builder_${Game.time}`;
      //console.log('Spawning new builder: ' + creepName);
      //Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], creepName, { memory: { role: 'builder' } });
      Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], creepName, { memory: { role: 'builder' } });
    }

    if (fixers.length < spawnConfig.fixers) {
      const creepName = `Fixer_${Game.time}`;
      //console.log('Spawning new fixer: ' + creepName);
      Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,MOVE], creepName, { memory: { role: 'fixer' } });
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

};

module.exports = spawnController;

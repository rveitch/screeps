var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');

module.exports.loop = function () {
  var currentRoom = Game.spawns['Spawn1'].room;
  var energySources = currentRoom.find(FIND_SOURCES);
  var energyAvailable = currentRoom.energyAvailable;
  var energyCapacity = currentRoom.energyCapacityAvailable;
  //console.log('Energy:', `${energyAvailable}/${energyCapacity}`)

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
    // console.log(`Harvesters: ${harvesters.length}`, `Upgraders: ${upgraders.length}`, `Builders: ${builders.length}`, );

    if(harvesters.length < 1) {
        var newName = 'Harvester_' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        //Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,MOVE], newName, { memory: { role: 'harvester' } } );
        // Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,CARRY,MOVE], newName, { memory: { role: 'harvester' } } );
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}}); // 5 work is the goal
    }

    if(upgraders.length < 2) {
        var newName = 'Upgrader_' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        //Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
        Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,CARRY,MOVE], newName, { memory: { role: 'upgrader' } } );
    }

    if(builders.length < 3) {
        var newName = 'Builder_' + Game.time;
        console.log('Spawning new builder: ' + newName);
        //Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});
        Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,CARRY,MOVE], newName, { memory: { role: 'builder' } } );
    }

    if(fixers.length < 1) {
        var newName = 'Fixer_' + Game.time;
        //console.log('Spawning new fixer: ' + newName);
        //Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,MOVE], newName, { memory: { role: 'fixer' } } );
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            // TODO: if no harvesters turn other roles to harvester
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        }
    }
}

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleFixer = require('role.fixer');

const rolesHandler = {

  run(Game, Memory) {
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];

      if (creep.memory.role === 'harvester') {
        roleHarvester.run(creep);
      }

      if (creep.memory.role === 'upgrader') {
        roleUpgrader.run(creep);
        // TODO: if no harvesters turn other roles to harvester
      }

      if (creep.memory.role === 'builder') {
        roleBuilder.run(creep);
      }

      if (creep.memory.role === 'fixer') {
        roleFixer.run(creep);
      }
    }
  },

};

module.exports = rolesHandler;

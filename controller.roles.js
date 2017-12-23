const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleFixer = require('role.fixer');
const roleGatherer = require('role.gatherer');

const rolesHandler = {

  run(Game, Memory, config) {
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];

      if (creep.memory.role === 'harvester') {
        roleHarvester.run(creep, config);
      }

      if (creep.memory.role === 'upgrader') {
        roleUpgrader.run(creep, config);
        // TODO: if no harvesters turn other roles to harvester
      }

      if (creep.memory.role === 'builder') {
        roleBuilder.run(creep, config);
      }

      if (creep.memory.role === 'fixer') {
        roleFixer.run(creep, config);
      }

      if (creep.memory.role === 'gatherer') {
        roleGatherer.run(creep, config);
      }
    }
  },

};

module.exports = rolesHandler;

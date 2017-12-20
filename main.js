const rolesHandler = require('controller.roles');
const spawnController = require('controller.spawn');
const memoryController = require('controller.memory');
const towerController = require('controller.towers');
// const infoLogging = require('controller.logging');
// const energyController = require('controller.energy');

module.exports.loop = function () {
  const spawnConfig = { // TODO: add sources values
    harvesters: 2,
    upgraders: 3,
    builders: 1,
    fixers: 1,
  };

  memoryController.run(Game, Memory);
  spawnController.run(Game, Memory, spawnConfig);
  rolesHandler.run(Game, Memory);
  towerController.run(Game, Memory);
}

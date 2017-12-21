const rolesHandler = require('controller.roles');
const spawnController = require('controller.spawn');
const memoryController = require('controller.memory');
const towerController = require('controller.towers');

module.exports.loop = function () {
  const config = {
    roles: {
      harvesters: {
        population: 1,
        preferSource: 0,
      },
      upgraders: {
        population: 2,
        preferSource: 0,
      },
      builders: {
        population: 2,
        preferSource: 1,
      },
      fixers: {
        population: 1,
        preferSource: 1,
      },
    }
  };

  memoryController.run(Game, Memory);
  spawnController.run(Game, Memory, config);
  rolesHandler.run(Game, Memory);
  towerController.run(Game, Memory);
}

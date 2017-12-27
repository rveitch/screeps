const rolesHandler = require('controller.roles');
const spawnController = require('controller.spawn');
const memoryController = require('controller.memory');
const towerController = require('controller.towers');
const logging = require('controller.logging');

module.exports.loop = function () {
  const config = {
    roles: {
      harvesters: {
        population: 2,
        preferSource: 1,
      },
      upgraders: {
        population: 3,
        preferSource: 0,
      },
      builders: {
        population: 3,
        preferSource: 1,
      },
      fixers: {
        population: 1,
        preferSource: 1,
      },
      gatherers: {
        population: 0,
        preferSource: 1,
      },
    }
  };

  memoryController.run(Game, Memory);
  spawnController.run(Game, Memory, config);
  rolesHandler.run(Game, Memory, config);
  towerController.run(Game, Memory);
  logging.wastedEnergy(Game, Memory);
}

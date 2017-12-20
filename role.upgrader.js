/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var harvestSourceA = creep.harvest(sources[0]);
            var harvestSourceB = creep.harvest(sources[1]);
            
            if(harvestSourceA == ERR_NOT_IN_RANGE) {
                  //creep.say('Source1');
                  creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
              }

            /*if(harvestSourceA !== ERR_INVALID_TARGET) {
              if(harvestSourceA == ERR_NOT_IN_RANGE) {
                  //creep.say('Source1');
                  creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
              }
            }

            if(harvestSourceB !== ERR_INVALID_TARGET) {
              if(harvestSourceB == ERR_NOT_IN_RANGE) {
                //creep.say('Source2');
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
              }
            }*/

        }
    }
};

module.exports = roleUpgrader;

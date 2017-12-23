const infoLogging = {

  wastedEnergy(Game, Memory) {
    const currentRoom = Game.spawns['Spawn1'].room;
    const energySources = currentRoom.find(FIND_SOURCES);
    _.forEach(energySources, function(source, index) {
      if (source.ticksToRegeneration === 1) {
        console.log(`Source ${index} regenerated with ${source.energy}/${source.energyCapacity} energy left unharvested.`)
      }
    });
  },

  // TODO: logging for if creep population drops below a threshhold

};

module.exports = infoLogging;


/*
Harvests energy from target source. Gathers 2 energy/tick.
Sources have 300 ticks until regeneration.

*/

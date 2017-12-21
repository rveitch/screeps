const infoLogging = {

  wastedEnergy(Game, Memory) {
    const currentRoom = Game.spawns['Spawn1'].room;
    const energySources = currentRoom.find(FIND_SOURCES);
    _.forEach(energySources, function(source, index) {
      if (source.ticksToRegeneration === 0) {
        console.log(`Source ${index} regenerated with ${source.energy}/${source.energyCapacity} energy left unharvested.`)
      }
    });
  },

};

module.exports = infoLogging;

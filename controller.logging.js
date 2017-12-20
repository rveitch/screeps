const infoLogging = {

  run(Game, Memory) {
    const currentRoom = Game.spawns['Spawn1'].room;
    const energySources = currentRoom.find(FIND_SOURCES);
    const energyAvailable = currentRoom.energyAvailable;
    const energyCapacity = currentRoom.energyCapacityAvailable;
    // console.log('Energy:', `${energyAvailable}/${energyCapacity}`);
  },

};

module.exports = infoLogging;

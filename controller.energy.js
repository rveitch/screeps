const energyController = {

  getRoomEnergyInfo(Game) {
    const currentRoom = Game.spawns['Spawn1'].room;
    const roomEnergyInfo = {
      sourceEnergy: energyController.getSourceEnergyInfo(currentRoom),
      containerEnergy: energyController.getContainerEnergyInfo(currentRoom),
    };
    return roomEnergyInfo;
  },

  getSourceEnergyInfo(room) {
    const energySources = room.find(FIND_SOURCES);
    const energyAvailable = room.energyAvailable;
    const energyCapacity = room.energyCapacityAvailable;
    // console.log('Energy:', `${energyAvailable}/${energyCapacity}`);

    const sourceEnergyInfo = {
      energyAvailable,
      energyCapacity,
    };
    return sourceEnergyInfo;
  },

  getContainerEnergyInfo(room) {
    const containers = room.find(FIND_STRUCTURES, {
        filter: (i) => i.structureType == STRUCTURE_CONTAINER
    });

    const energyAvailable = _.reduce(containers, function(sum, container) {
      const energyStored = _.sum(container.store);
      return sum + energyStored;
    }, 0);

    const energyCapacity = _.reduce(containers, function(sum, container) {
      return sum + container.storeCapacity;
    }, 0);

    const containerEnergyInfo = {
      energyAvailable,
      energyCapacity,
    };
    return containerEnergyInfo;
  },

  getOpenContainers(room) {
    const containers = room.find(FIND_STRUCTURES, {
        filter: (i) => i.structureType == STRUCTURE_CONTAINER
    });

    const openContainers = _.reduce(containers, (results, container) => {
      const energyStored = _.sum(container.store);
      const energyCapacity = container.storeCapacity;
      const isFull = !(energyStored <= energyCapacity);
      if (!isFull) {
        results.push(container);
      }
      return results;
    }, []);

    return openContainers;
  },

};

module.exports = energyController;

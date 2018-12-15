import { Room, EntityMap, Client, nosync } from "colyseus";

export class State {
  players: EntityMap<Player> = {};

  createPlayer(id: string) {
    this.players[id] = new Player();
  }

  removePlayer(id: string) {
    delete this.players[id];
  }

  movePlayer(id: string, movement: any) {
    if (movement.x
      && this.players[id].x + movement.x * 16 < 256
      && this.players[id].x + movement.x * 16 >= 0) {
      this.players[id].x += movement.x * 16;

    } else if (movement.y
      && this.players[id].y + movement.y * 16 < 256
      && this.players[id].y + movement.y * 16 >= 0) {
      this.players[id].y += movement.y * 16;
    }
  }
}

export class Player {
  x = Math.floor(Math.random() * 16) * 16;
  y = Math.floor(Math.random() * 16) * 16;
}

export class StateHandlerRoom extends Room<State> {
  onInit(options) {
    console.log("StateHandlerRoom created!", options);

    this.setState(new State());
  }

  onJoin(client) {
    this.state.createPlayer(client.sessionId);
  }

  onLeave(client) {
    this.state.removePlayer(client.sessionId);
  }

  onMessage(client, data) {
    console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
    this.state.movePlayer(client.sessionId, data);
  }

  onDispose() {
    console.log("Dispose StateHandlerRoom");
  }

}
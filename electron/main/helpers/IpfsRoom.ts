import * as Room from 'ipfs-pubsub-room';

import { getReadyIpfsInstance }  from './IpfsInstance';

export type RoomName = string;
export type DappUUID = string;
export type Message = { from: string, data: Buffer };

export interface SubscribeOptions {
  onMessage?: (message: Message) => void;
  onJoined?: (peer: string) => void;
  onLeft?: (peer: string) => void;
  onSubscribed?: () => void;
}

type DappRooms = { [roomName:string]: Room };
type DappMap = { [dappUUID:string]: DappRooms };

class RoomStorage {
  rooms: DappMap;

  constructor() {
    this.rooms = {};
  }

  getRoom(dappUUID: DappUUID, roomName: RoomName): Room {
    return this.rooms[dappUUID] && this.rooms[dappUUID][roomName];
  }

  addRoom(dappUUID: DappUUID, roomName: RoomName, room: Room): void {
    if (!this.rooms[dappUUID]) {
      this.rooms[dappUUID] = {};
    }
    this.rooms[dappUUID][roomName] = room;
  }
}

const RoomMapInstance = new RoomStorage();

export default class IpfsRoom {
  room: Room;

  constructor(room?: Room) {
    this.room = room || null;

  }

  static async create(dappUUID: string, name?: RoomName): Promise<IpfsRoom> {
    if (!dappUUID || !name) {
      return new IpfsRoom();
    }

    const ipfs = await getReadyIpfsInstance({ repo: `ipfs-room/repos/${Math.random()}` });

    const getRoomInstance = <any> Room;

    const room = getRoomInstance(ipfs, name);

    RoomMapInstance.addRoom(dappUUID, name, room);

    return new IpfsRoom(room);
  }

  static get(dappUUID: string, name?: RoomName): IpfsRoom {
    const room = RoomMapInstance.getRoom(dappUUID, name);
    return room && new IpfsRoom(room);
  }

  setRoom(room: Room): void {
    this.room = room;
  }

  subscribe(options: SubscribeOptions = {}): void {
    if (this.room) {
      options.onJoined && this.room.on('peer joined', options.onJoined);
      options.onLeft && this.room.on('peer left', options.onLeft);
      options.onMessage && this.room.on('message', options.onMessage);
      options.onSubscribed && this.room.on('subscribed', options.onSubscribed);
    }
  }

  async broadcast(message: string | Buffer) {
    if (this.room) {
      this.room.broadcast(message);
    }
  }

  sendTo(peer: string, message: string | Buffer) {
    if (this.room) {
      this.room.sendTo(peer, message);
    }
  }

  leave() {
    if (this.room) {
      this.room.leave();
    }
  }

}
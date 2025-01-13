import { Player } from "../player/entities/Player";
import { Room } from "./entities/Room";

export class RoomService {
    private rooms: Room[];
    private static instance: RoomService;
    private constructor() {
        this.rooms = [];
    };

    static getInstance(): RoomService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new RoomService();
        return this.instance;
    }

    public addPlayer(player: Player ): Room {
        let room = this.rooms.find((item) => item.occupied == false);
        if (room == undefined) {
            const genRanHex = (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            room = {
                name: "room" + genRanHex(128),
                players: [player],
                occupied: false
            }
            this.rooms.push(room);
            player.id.join(room.name as string);
        
        } else {
            room.players.push(player);
            if (room.players.length == 4) room.occupied = true;
            player.id.join(room.name as string);
        }

        return room;
    }
}

import { Service } from "typedi";
import * as io from 'socket.io';
import * as http from 'http';
import { DatabaseService } from "../services/database.service";

@Service()
export class SocketController {

    private io: io.Server;
    private rooms: string[] = [];
    private dataBaseService: DatabaseService = new DatabaseService();

    constructor(
        server: http.Server,
    ){
        this.io = new io.Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
    }

    init(): void {
        this.dataBaseService.getChats().then((result)=>{
            result.rows.forEach((id) => this.rooms.push(id));
            console.log(this.rooms);
        })
        this.initRooms();
    }

    private initRooms(): void {
        const socketRooms = this.io.of('/');

        this.rooms.forEach(room => {
            // this.io.of("/").adapter.rooms.set().on("create-room", (room) => {
            //     console.log(`room ${room} was created`);
            // });

            socketRooms.use((socket, next ) => {
                socket.data.room = room;
            });
        });

        socketRooms.on('connection', (socket) => {
            const room =  socket.data.room.chatId;
            socket.join(`room-${room}`);

            console.log('Room joined')

            socket.on('message', (message: any) => {
                console.log(message);
            });

            socket.on('disconnect', () => {
                
                
            });

        });
    }
}

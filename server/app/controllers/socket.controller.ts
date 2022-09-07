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
            result.rows.forEach((room) => this.rooms.push(room.chatid));
            console.log('current rooms:', this.rooms)
            this.initRooms();
        })
    }

    private initRooms(): void {
        let init = true;
        const socketRooms = this.io.of('/');

        socketRooms.use((socket, next ) => {
            //socket.data.room = socket.id;
            next();
        });

        socketRooms.on('connect', (socket) => {

           if(init) {
                this.rooms.forEach(room => {
                    socket.data.room = room;
                    socket.join(`room-${room}`);
                    socket.emit('connected', ` Joined room-${socket.data.room}`);
                    console.log('socket rooms:', socket.rooms, 'my room:', socket.data.room)
                });
                init = false;
           }
            
           

            

            const events: [string, (id: any, data: any) => void][] = [['message', (socketId, message) => socket.to(socketId).emit('message', `new message : ${message}`)]];
            events.forEach(([name, handler]) => socket.on(name, handler));

            socket.on('disconnect', () => {
                
                socket.disconnect();
            });

        });
    }
}

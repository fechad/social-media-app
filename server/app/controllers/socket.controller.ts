import { Service } from "typedi";
import * as io from 'socket.io';
import * as http from 'http';
import { DatabaseService } from "../services/database.service";

interface User {
    email: string,
    handle : string,
    socketId: string
}

@Service()
export class SocketController {

    private io: io.Server;
    private rooms: string[] = [];
    private users: User[] = []
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
        // let init = true;
        const socketRooms = this.io.of('/');

        socketRooms.use((socket, next ) => {
            //socket.data.room = socket.id;
            next();
        });

        socketRooms.on('connect', (socket) => {

            socket.on('join server', (userData, callBack) => {

                const user: User = {
                    email: userData.email,
                    handle : userData.handle,
                    socketId: socket.id
                };

                const alreadyJoined = this.users.find(currentUser => currentUser.handle === user.handle);

                if(!alreadyJoined) this.users.push(user);

                callBack(this.users);
            });
           
            socket.on('join room', (room, callBack) => {
                
                if(this.rooms.find(availableRoom => availableRoom === room)) {
                    socket.join(room);
                    callBack(`Success: You joined room ${room}`);
                } else {
                    callBack(`Failed: Room ${room} doesn't exist or is not available at this time`);
                }
                
            })

            // const events: [string, (id: any, data: any) => void][] = [['message', (socketId, message) => socket.to(socketId).emit('message', `new message : ${message}`)]];
            // events.forEach(([name, handler]) => socket.on(name, handler));

            socket.on("send message", (message, room) => {

                console.log('room  is',room, 'message is', message);

                if(this.rooms.find(availableRoom => availableRoom === room)) {
                    
                    socketRooms.to(room).emit('new message', message);
                };
            });

            socket.on('disconnect', () => {
                
                this.users = this.users.filter(user => user.socketId !== socket.id);

                socketRooms.emit('current active users', this.users);
            });

        });
    }
}

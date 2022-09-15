
import { DATABASE, DELETE, END_CHAR, HOST, INSERT, KEEPALIVE, LIST_TABLES, PASSWORD, PORT, SELECT_ALL, SELECT_SOME, SELECT_MANY, TABLE_COLUMNS_TYPES, TABLE_FOREIGN_KEYS, TABLE_PRIVATE_KEYS, UPDATE, USER, DELETE_USER, DELETE_POST, SCHEMA_NAME } from '../constants';
import * as pg from 'pg';
import 'reflect-metadata';
import { Service } from 'typedi';

export interface Update {
    new: any;
    old: any;
}

export interface Member {
    handle: string,
    profile_pic: string
}

export interface Message {
    messageid: string,
    chatid: string,
    replyid: string,
    messagetime: string,
    handle: string,
    textmessage: string,
    media: string,
    file_name: string
}

export interface Room {
    chatid: string,
    message_log: string,
    members: string,
    messages: Message[],
    users: (Member | undefined)[],
}


@Service()
export class DatabaseService {

    public rooms!: Room[];

    public connectionConfig: pg.ConnectionConfig = {
        user: USER,
        database: DATABASE,
        password: PASSWORD,
        port: PORT,
        host: HOST,
        keepAlive: KEEPALIVE,
    };

    public pool: pg.Pool = new pg.Pool(this.connectionConfig);

    constructor(){
        this.initRooms();
    }

    public async initRooms(): Promise<void> {

        this.rooms = [];

       this.getAllUsers().then((users) => {
            this.getAllMessages().then((dbMessages) => {
                this.getChats().then((result)=>{
                    result.rows.forEach((room) => {
                        let newRoom: Room = {
                            chatid: room.chatid,
                            message_log: room.message_log,
                            members: room.members,
                            messages: dbMessages.rows.filter((message) => message.chatid === room.chatid),
                            users: users.rows.map((user) => {
                                if(room.members.split(';').includes(user.handle)) {
                                    return {handle: user.handle, profile_pic: user.profile_pic} as Member;
                                }
                                else return;
                            }).filter((member) => member),
                        }
                        this.rooms.push(newRoom);
                    });
                    console.log('current rooms:', this.rooms)
                })
            })
       });
    }

    // ======= GENERIC =======
    public async getTable(tableName: string, filter: any = {}): Promise<pg.QueryResult> {
        console.log(SELECT_ALL(tableName) + ' WHERE name LIKE ' + `'%${filter.name}%' ` + END_CHAR);

        if (Object.keys(filter).length && tableName === 'users')
            return this.query(SELECT_ALL(tableName) + 'WHERE name LIKE ' + `"%${filter.name}%" ` + END_CHAR);
        if (Object.keys(filter).length) return this.query(SELECT_ALL(tableName) + this.where(filter) + END_CHAR);
        else return this.query(SELECT_ALL(tableName) + END_CHAR);
    }

    public async getAllUsers(): Promise<pg.QueryResult> {
        console.log(SELECT_ALL('users') + END_CHAR);
        return this.query(SELECT_ALL('users') + END_CHAR);
    }

    public async getUSerInfos(handle: string): Promise<pg.QueryResult> {
        console.log(SELECT_ALL('users') + ' WHERE handle =' + `'${handle}' ` + END_CHAR);
        return this.query(SELECT_ALL('users') + ` WHERE handle = '${handle}' ` + END_CHAR);
    }

    public async getUSerPhotos(handles: string): Promise<pg.QueryResult> {
        const condition = SELECT_MANY(handles, ';');
        console.log('SELECT handle, profile_pic FROM ' + SCHEMA_NAME + '.users' + condition + END_CHAR);
        return this.query('SELECT handle, profile_pic FROM ' + SCHEMA_NAME + '.users' + condition + END_CHAR);
    }

    public async getMessages(ids: string): Promise<pg.QueryResult> {
        const condition = SELECT_MANY(ids, ';', 'messageid');
        console.log('SELECT * FROM ' + SCHEMA_NAME + '.message' + condition + END_CHAR);
        return this.query('SELECT * FROM ' + SCHEMA_NAME + '.message' + condition + END_CHAR);
    }

    public async getAllMessages(): Promise<pg.QueryResult> {
        console.log('SELECT * FROM ' + SCHEMA_NAME + '.message' + END_CHAR);
        return this.query('SELECT * FROM ' + SCHEMA_NAME + '.message' + END_CHAR);
    }


    public async getUSerFavorite(email: string): Promise<pg.QueryResult> {
        const favorite = (await this.query(SELECT_SOME(['posts'],'favorite') + ' WHERE email =' + `'${email}'` + END_CHAR)).rows[0].posts;
        const list = favorite.split(' ');
        let query = '';
        for (let i = 1; i<list.length; i++) {
            query += `post_id = '${list[i]}' OR `
        }
        query += `post_id = '${list[0]}'`
        console.log(SELECT_ALL('post') + ' WHERE ' + `${query}` + END_CHAR);
        return this.query(SELECT_ALL('post') + ' WHERE ' + `${query}` + END_CHAR);
    }

    public async getOneFavorite(email: string, postId: string): Promise<boolean> {
        const favorite = (await this.query(SELECT_SOME(['posts'],'favorite') + ' WHERE email =' + `'${email}'` + END_CHAR)).rows[0].posts;
        const list = favorite.split(' ');
        console.log(list);
        for (let elem of list) {
            if(elem === postId) return true;
        }
        return false
    }

    public async getUSerPost(handle: string): Promise<pg.QueryResult> {
        console.log(SELECT_ALL('post') + ' WHERE handle =' + `'${handle}' ORDER BY post_id DESC` + END_CHAR);
        return this.query(SELECT_ALL('post') + ` WHERE handle = '${handle}' ORDER BY post_id DESC` + END_CHAR);
    }

    public async getPostLiked(email: string): Promise<pg.QueryResult> {
        console.log(SELECT_SOME(['posts'], 'likes') + ' WHERE email =' + `'${email}' ` + END_CHAR);
        return this.query(SELECT_SOME(['posts'], 'likes') + ` WHERE email = '${email}' ` + END_CHAR);
    }

    public async getPosts(): Promise<pg.QueryResult> {
        console.log(SELECT_ALL('post') + END_CHAR);
        return this.query(SELECT_ALL('post') + END_CHAR);
    }

    public async getFeedPosts(email: string): Promise<pg.QueryResult> {
        const handles =  (await this.query(SELECT_SOME(['list'],'friends') + ` WHERE email = '${email}' ` + END_CHAR));
        if(handles.rows[0]?.list) {
            const queryCondition = SELECT_MANY(handles.rows[0].list);
            console.log(SELECT_ALL('post') + queryCondition + 'order by post_id desc' + END_CHAR)
            return this.query(SELECT_ALL('post') + queryCondition + 'order by post_id desc' + END_CHAR);
        };
        return handles;
    }

    public async getChats(): Promise<pg.QueryResult> {
        console.log('SELECT * FROM ' + SCHEMA_NAME + '.Chat' + END_CHAR);
        return this.query('SELECT * FROM ' + SCHEMA_NAME + '.Chat' + END_CHAR);
    }

    public async getMyInfos(email: string): Promise<pg.QueryResult> {
        console.log(SELECT_ALL('users') + ' WHERE email =' + `'${email}' ` + END_CHAR);
        return this.query(SELECT_ALL('users') + ` WHERE email = '${email}' ` + END_CHAR);
    }

    public async getMyNotifications(handle: string): Promise<pg.QueryResult> {
        console.log(SELECT_ALL('notification') + ' WHERE destination_handle =' + `'${handle}' or destination_handle='*'` + END_CHAR);
        return this.query(SELECT_ALL('notification') + ' WHERE destination_handle =' + `'${handle}' or destination_handle='*'` + END_CHAR);
    }

    public async getMyChats(handle: string): Promise<Room[]> {
        // console.log(SELECT_ALL('chat') + ` WHERE members Like '%${handle}%' or members Like 'users/*'` + END_CHAR);
        // return this.query(SELECT_ALL('chat') + ` WHERE members Like '%${handle}%' or members Like 'users/*'` + END_CHAR);
     
        let chats = this.rooms.filter((room) =>{
            console.log(room.members)
            if(room.members.split(';').includes(handle) || room.members.includes('users/*')) return room;
            else return
        });

        return chats;
    }

    public async getMyFriends(email: string): Promise<pg.QueryResult> {
        const handles =  (await this.query(SELECT_SOME(['list'],'friends') + ` WHERE email = '${email}' ` + END_CHAR));
        if(handles.rows[0]?.list) {
            const queryCondition = SELECT_MANY(handles.rows[0].list);
            console.log(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + queryCondition + END_CHAR)
            return this.query(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + queryCondition + END_CHAR);
        };
        return handles;
    }
    public async getMyBlockedFriends(email: string): Promise<pg.QueryResult> {
        const handles = (await this.query(SELECT_SOME(['list'],'blocked_people') + ` WHERE email = '${email}' ` + END_CHAR));
        if(handles.rows[0]?.list) {
            const queryCondition = SELECT_MANY(handles.rows[0].list);
            console.log(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + queryCondition + END_CHAR)
            return this.query(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + queryCondition + END_CHAR);
        };
        return handles;
    }
    public async getMyMutedFriends(email: string): Promise<pg.QueryResult> {
        const handles = (await this.query(SELECT_SOME(['list'],'muted_people') + ` WHERE email = '${email}' ` + END_CHAR));
        if(handles.rows[0]?.list) {
            const queryCondition = SELECT_MANY(handles.rows[0].list);
            console.log(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + queryCondition + END_CHAR)
            return this.query(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + queryCondition + END_CHAR);
        };
        return handles;
    }
    public async getLinkPhoto(handle: string): Promise<pg.QueryResult> {
        console.log('SELECT profile_pic FROM Chymera.users' + ' WHERE email =' + `'${handle}' ` + 'or handle =' + `'${handle}' ` + END_CHAR);
        return this.query('SELECT profile_pic FROM Chymera.users' + ' WHERE email =' + `'${handle}' ` + 'or handle =' + `'${handle}' ` + END_CHAR);
    }

    public async searchUsers(handle: string): Promise<pg.QueryResult> {
        console.log(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + ' WHERE UPPER(account_name) LIKE' + ` UPPER('%${handle}%')` + ' or UPPER(handle) LIKE ' + `UPPER('%${handle}%')` + END_CHAR);
        return this.query(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + ' WHERE UPPER(account_name) LIKE' + ` UPPER('%${handle}%')` + ' or UPPER(handle) LIKE ' + `UPPER('%${handle}%')` + END_CHAR);
    }

    public async getFriendsInfos(handle: string): Promise<any[]> {
        console.log(SELECT_SOME(['list'],'friends') + ' WHERE email =' + `'${handle}' ` + END_CHAR);
        const result = (await this.query(SELECT_SOME(['list'],'friends') + ` WHERE email = '${handle}' ` + END_CHAR)).rows;
        const friendList = result[0].list.split(' ');
        const friendInfos: any[] | PromiseLike<any[]> = [];
        const promise = await new Promise<string[]>((resolve, reject) => {
            friendList.forEach(async (handle: string, index:number, array: string[]) => {
                this.query(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + ` WHERE handle = '${handle}' ` + END_CHAR)
                .then((result) => {
                    friendInfos.push(result.rows[0]);
                    if(index === array.length - 1){
                        resolve(friendInfos)
                    }
                });
            });
        });
        return promise;
    }

    public async createFave(email: string, postId: string): Promise<void> {
        this.query(INSERT('favorite', 2), [email, postId]).catch( async ()=>{
            let currentPosts = (await this.query(SELECT_SOME(['posts'],'favorite') + ' WHERE email =' + `'${email}' ` + END_CHAR)).rows[0].posts;
            let fave = currentPosts.split(' ');
            let flag = true
            for (let elem of fave) {
                if (elem === postId) flag = false;
            }
            if(flag) {
                console.log('UPDATE chymera.favorite SET email = ' + `'${email}'` + ', posts=' + `'${currentPosts} ${postId}'` + ' WHERE email = ' + `'${email}'` + END_CHAR);
                this.query('UPDATE chymera.favorite SET email = ' + `'${email}'` + ', posts=' + `'${currentPosts} ${postId}'` + ' WHERE email = ' + `'${email}'` + END_CHAR);
            }
        })
    }

    public async createLike(email: string, postId: string): Promise<void> {
        this.query(INSERT('likes', 2), [email, postId]).catch( async ()=>{
            let currentPosts = (await this.query(SELECT_SOME(['posts'],'likes') + ' WHERE email =' + `'${email}' ` + END_CHAR)).rows[0].posts;
            let liked = currentPosts.split(' ');
            let flag = true
            for (let elem of liked) {
                if (elem === postId) flag = false;
            }
            if(flag) {
                console.log('UPDATE chymera.likes SET email = ' + `'${email}'` + ', posts=' + `'${currentPosts} ${postId}'` + ' WHERE email = ' + `'${email}'` + END_CHAR);
                this.query('UPDATE chymera.likes SET email = ' + `'${email}'` + ', posts=' + `'${currentPosts} ${postId}'` + ' WHERE email = ' + `'${email}'` + END_CHAR);
            }
        })
        let currentLikes = (await this.query(SELECT_SOME(['likes'],'post') + ' WHERE post_id =' + `'${postId}' ` + END_CHAR)).rows[0].likes;
        console.log('UPDATE chymera.post SET likes= ' + `'${currentLikes + 1}'` + ' WHERE post_id = ' + `'${postId}'` + END_CHAR);
        this.query('UPDATE chymera.post SET likes= ' + `'${currentLikes + 1}'` + ' WHERE post_id = ' + `'${postId}'` + END_CHAR);
    }

    public async removeFave(email: string, postId: string): Promise<void> {
        if ((await this.query(SELECT_SOME(['posts'],'favorite') + ' WHERE email =' + `'${email}' ` + END_CHAR)).rows[0]) {
                let currentPosts = (await this.query(SELECT_SOME(['posts'],'favorite') + ' WHERE email =' + `'${email}' ` + END_CHAR)).rows[0].posts;
                let fave = currentPosts.split(' ');
                let newPosts = '';
                for (let elem of fave) {
                    if (elem !== postId && elem !== '') newPosts += elem + ' ';
                }
                console.log('UPDATE chymera.favorite SET email = ' + `'${email}'` + ', posts=' + `'${newPosts}'` + ' WHERE email = ' + `'${email}'` + END_CHAR);
                this.query('UPDATE chymera.favorite SET email = ' + `'${email}'` + ', posts=' + `'${newPosts}'` + ' WHERE email = ' + `'${email}'` + END_CHAR);
            }
    }

    public async removeLike(email: string, postId: string): Promise<void> {
        if ((await this.query(SELECT_SOME(['posts'],'likes') + ' WHERE email =' + `'${email}' ` + END_CHAR)).rows[0]) {
                let currentPosts = (await this.query(SELECT_SOME(['posts'],'likes') + ' WHERE email =' + `'${email}' ` + END_CHAR)).rows[0].posts;
                let liked = currentPosts.split(' ');
                let newPosts = '';
                for (let elem of liked) {
                    if (elem !== postId && elem !== '') newPosts += elem + ' ';
                }
                console.log('UPDATE chymera.likes SET email = ' + `'${email}'` + ', posts=' + `'${newPosts}'` + ' WHERE email = ' + `'${email}'` + END_CHAR);
                this.query('UPDATE chymera.likes SET email = ' + `'${email}'` + ', posts=' + `'${newPosts}'` + ' WHERE email = ' + `'${email}'` + END_CHAR);

                let currentLikes = (await this.query(SELECT_SOME(['likes'],'post') + ' WHERE post_id =' + `'${postId}' ` + END_CHAR)).rows[0].likes;
                console.log('UPDATE chymera.post SET likes= ' + `'${currentLikes - 1}'` + ' WHERE post_id = ' + `'${postId}'` + END_CHAR);
                this.query('UPDATE chymera.post SET likes= ' + `'${currentLikes - 1}'` + ' WHERE post_id = ' + `'${postId}'` + END_CHAR);
            }
    }

    public async getTablesList(): Promise<pg.QueryResult> {
        return this.query(LIST_TABLES);
    }

    public async getTablePrimaryKeys(tableName: string): Promise<pg.QueryResult> {
        return this.query(TABLE_PRIVATE_KEYS(tableName));
    }

    public async getTableForeignKey(tableName: string): Promise<pg.QueryResult> {
        return this.query(TABLE_FOREIGN_KEYS(tableName));
    }

    public async getTableColumnsTypes(tableName: string): Promise<pg.QueryResult> {
        return this.query(TABLE_COLUMNS_TYPES(tableName));
    }

    public async create(tableName: string, obj: any): Promise<pg.QueryResult> {
        console.log(this.objectToArray(obj));
        return this.insert(tableName, this.objectToArray(obj));
    }

    // public async updateUser(update: Update): Promise<pg.QueryResult> {
    //     const query = UPDATE('users') + this.assign(update.new, ', ') + this.where(update.old) + END_CHAR;
    //     console.log(query);
    //     return this.query(query);
    // }

    public async remove(tableName: string, obj: any): Promise<pg.QueryResult> {
        return this.delete(tableName, obj);
    }

    public async updateUser(tableName: string, update: Update): Promise<pg.QueryResult> {
        return this.updateDBUser(tableName, update);
    }

    public async updateUserEmail(tableName: string, update: Update): Promise<pg.QueryResult> {
        return this.updateEmail(tableName, update);
    }

    public async deleteUser(email: string): Promise<pg.QueryResult> {
        console.log(DELETE_USER(email));
        return this.query(DELETE_USER(email))
    }

    public async deletePost(id: string): Promise<pg.QueryResult> {
        console.log(DELETE_POST(id));
        return this.query(DELETE_POST(id));
    }

    public async change(tableName: string, update: Update): Promise<pg.QueryResult> {
        return this.update(tableName, update);
    }

    // get the hotel names and numbers so so that the user can only select an existing hotel
    public async getHotelNamesByNos(): Promise<pg.QueryResult> {
        const query = SELECT_SOME(['hotelNb', 'name'], 'Hotel') + END_CHAR;

        return this.query(query);
    }

    // ======= QUERY UTILS =======
    private async insert(table: string, values: string[]): Promise<pg.QueryResult> {
        if (!values.length) throw new Error('Invalid insert values');
        const queryText: string = INSERT(table, values.length);

        return this.query(queryText, values);
    }

    private async update(table: string, update: Update): Promise<pg.QueryResult> {
        const query = UPDATE(table) + this.assign(update.new, ', ') + this.where(update.old) + END_CHAR;
        console.log(query);
        return this.query(query);
    }

    private async updateDBUser(table: string, update: Update): Promise<pg.QueryResult> {
        /*SET email=?, handle=?, profile_pic=?, age=?, account_name=?, private_account=?, bio=?, news_options=?, local_news=?, french_language=?
	WHERE <condition>;*/
        const query = UPDATE(table) + this.assign(update.new, ', ') + this.where(update.old) + END_CHAR;
        console.log(query);
        return this.query(query);
    }

    private async updateEmail(table: string, update: Update): Promise<pg.QueryResult> {
        const query = UPDATE(table) + this.assign(update.new, ', ') + this.where(update.old) + END_CHAR;
        console.log(query);
        return this.query(query);
    }


    public async delete(table: string, obj: any): Promise<pg.QueryResult> {
        if (!Object.keys(obj).length) throw new Error('Invalid delete values');
        let query = DELETE(table) + this.where(obj) + END_CHAR;

        return this.query(query);
    }

    private async query(text: string, values?: any[]): Promise<pg.QueryResult> {
        const client = await this.pool.connect();
        const res = await client.query(text, values);

        client.release();
        return res;
    }

    private objectToArray(obj: any): string[] {
        let arr: string[] = [];

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Object.prototype.toString.call(obj[key]) === '[object Date]') arr.push(obj[key].toString());
                else arr.push(obj[key]);
            }
        }

        return arr;
    }

    private where(obj: any): string {
        if (!obj) return '';
        return ' WHERE ' + this.assign(obj);
    }

    private assign(obj: any, separator: string = ' AND '): string {
        if (!obj) return '';
        let query = '';

        Object.keys(obj).forEach((key, index) => {
            if (index) query += separator;
            if (typeof obj[key] === 'number') query += `${key} = ${obj[key]}`;
            else query += `${key} = '${obj[key].replace("'", "''")}'`;
        });

        return query;
    }
}

import { DATABASE, DELETE, END_CHAR, HOST, INSERT, KEEPALIVE, LIST_TABLES, PASSWORD, PORT, SELECT_ALL, SELECT_SOME, SELECT_MANY, TABLE_COLUMNS_TYPES, TABLE_FOREIGN_KEYS, TABLE_PRIVATE_KEYS, UPDATE, USER, DELETE_USER } from '../constants';
import * as pg from 'pg';
import 'reflect-metadata';
import { Service } from 'typedi';

export interface Update {
    new: any;
    old: any;
  }




@Service()
export class DatabaseService {
    public connectionConfig: pg.ConnectionConfig = {
        user: USER,
        database: DATABASE,
        password: PASSWORD,
        port: PORT,
        host: HOST,
        keepAlive: KEEPALIVE,
    };

    public pool: pg.Pool = new pg.Pool(this.connectionConfig);

    // ======= GENERIC =======
    public async getTable(tableName: string, filter: any = {}): Promise<pg.QueryResult> {
        console.log(SELECT_ALL(tableName) + ' WHERE name LIKE ' + `'%${filter.name}%' ` + END_CHAR);

        if (Object.keys(filter).length && tableName === 'users')
            return this.query(SELECT_ALL(tableName) + 'WHERE name LIKE ' + `"%${filter.name}%" ` + END_CHAR);
        if (Object.keys(filter).length) return this.query(SELECT_ALL(tableName) + this.where(filter) + END_CHAR);
        else return this.query(SELECT_ALL(tableName) + END_CHAR);
    }

    public async getUSerInfos(handle: string): Promise<pg.QueryResult> {
        console.log(SELECT_ALL('users') + ' WHERE handle =' + `'${handle}' ` + END_CHAR);
        return this.query(SELECT_ALL('users') + ` WHERE handle = '${handle}' ` + END_CHAR);
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
        console.log(SELECT_ALL('post') + ' WHERE handle =' + `'${handle}' ` + END_CHAR);
        return this.query(SELECT_ALL('post') + ` WHERE handle = '${handle}' ` + END_CHAR);
    }

    public async getPosts(): Promise<pg.QueryResult> {
        console.log(SELECT_ALL('post') + END_CHAR);
        return this.query(SELECT_ALL('post') + END_CHAR);
    }

    public async getMyInfos(email: string): Promise<pg.QueryResult> {
        console.log(SELECT_ALL('users') + ' WHERE email =' + `'${email}' ` + END_CHAR);
        return this.query(SELECT_ALL('users') + ` WHERE email = '${email}' ` + END_CHAR);
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
        console.log(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + ' WHERE name  or handle LIKE ' + `'%${handle}%' ` + END_CHAR);
        return this.query(SELECT_SOME(['handle', 'profile_pic', 'account_name'],'users') + ' WHERE account_name LIKE ' + `'%${handle}%'` + ' or handle LIKE ' + `'%${handle}%' ` + END_CHAR)
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
import { RandomizingService } from '../services/randomizing.service';
import { NextFunction, Request, Response, Router } from 'express';
import * as pg from 'pg';
import { Service } from 'typedi';
import { DatabaseService } from '../services/database.service';


@Service()
export class DatabaseController {
    public constructor(private databaseService: DatabaseService, private randomizingService: RandomizingService) {}

    public get router(): Router {
        const router: Router = Router();

        const multer = require('multer');
        const storage = multer.diskStorage({
            destination:function(req:any, file:any, cb:any) {
            cb(null, './assets/profile-pics')
            },
            filename: function(req:any, file:any, cb:any) {
                cb(null, file.originalname)
            }
        })

        const upload = multer({ storage: storage})

        // this.router.post('/image', upload.single('image'), async (req: Request, res: Response) => {});

        // ======= GENERAL ROUTES =======

        router.get('/users/MyInfos/:email', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                . getMyInfos(req.params.email)
                .then((result: pg.QueryResult) => {res.json(result.rows), console.log(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/users/MyInfos/notifications/:handle', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                . getMyNotifications(req.params.handle)
                .then((result: pg.QueryResult) => {res.json(result.rows), console.log(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/isFavorite/:creds', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                . getOneFavorite(req.params.creds.split('..')[0], req.params.creds.split('..')[1])
                .then((result: boolean) => {res.json(result), console.log(result)})
        });

        router.get('/users/MyFriends/:email', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                . getMyFriends(req.params.email)
                .then((result: pg.QueryResult) => {res.json(result.rows), console.log(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/users/MyBlockedFriends/:email', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                . getMyBlockedFriends(req.params.email)
                .then((result: pg.QueryResult) => {res.json(result.rows), console.log(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/users/MyMutedFriends/:email', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                . getMyMutedFriends(req.params.email)
                .then((result: pg.QueryResult) => {res.json(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/users/:handle', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getUSerInfos(req.params.handle)
                .then((result: pg.QueryResult) => {res.json(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/users/post/:handle', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getUSerPost(req.params.handle)
                .then((result: pg.QueryResult) => {res.json(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/users/favorite/:email', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getUSerFavorite(req.params.email)
                .then((result: pg.QueryResult) => {res.json(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/users/liked/:email', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getPostLiked(req.params.email)
                .then((result: pg.QueryResult) => {res.json(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/image/:pk', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getLinkPhoto(req.params.pk)
                .then((result: pg.QueryResult) => {
                    if(result.rows[0].profile_pic === 'undefined') res.download('./assets/profile-pics/logo.svg');
                    else if(result.rows[0].profile_pic !== 'none') res.download(result.rows[0].profile_pic);
                    
                })
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('profile_pic/:handle', (req: Request, res: Response) => {
            res.download(req.params.path);
        });

        router.patch('/users/:email', (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            const update = { new: req.body, old: {email: req.params.email} }
            this.databaseService
                .updateUser('users', update)
                .then((result: pg.QueryResult) => res.json(result.rowCount))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });

        router.patch('/users/update/:email', (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            const update = { new: req.body, old: {email: req.params.email} }
            this.databaseService
                .updateUserEmail('users', update)
                .then((result: pg.QueryResult) => res.json(result.rowCount))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });

        router.delete('/users/:email', (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            this.databaseService
                .deleteUser(req.params.email)
                .then((result: pg.QueryResult) => res.json(result.rowCount))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });
        
        
        router.post('/image', upload.single('image'), (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json('OK');
        });
        
        router.post('/users', (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            this.databaseService
                .create('users', req.body)
                .then((result: pg.QueryResult) => res.json(result.rowCount))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });

        router.get('/discover/post', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getPosts()
                .then((result: pg.QueryResult) => res.json(this.randomizingService.shuffleArray(result.rows, 50)))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });

        router.get('/myFeed/:email', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getFeedPosts(req.params.email)
                .then((result: pg.QueryResult) => res.json(result.rows))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });

        router.post('/users/post', (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            this.databaseService
                .create('post', req.body)
                .then((result: pg.QueryResult) => res.json(result.rowCount))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });

        // router.patch('/users/:email', (req: Request, res: Response, next: NextFunction) => {
        //     console.log(req.body);
        //     const update = { new: req.body, old: {email: req.params.email} }
        //     this.databaseService
        //         .updateUser(update)
        //         .then((result: pg.QueryResult) => res.json(result.rowCount))
        //         .catch((e: Error) => {
        //             console.error(e.stack);
        //             res.status(405).json(e.stack);
        //         });
        // });

        router.post('/favorite/:infos', (req: Request, res: Response) => {
            this.databaseService.createFave(req.params.infos.split('..')[0], req.params.infos.split('..')[1]).then(()=>res.status(200));
        });

        router.post('/defavorite/:infos', (req: Request, res: Response) => {
                    this.databaseService.removeFave(req.params.infos.split('..')[0], req.params.infos.split('..')[1]).then(()=>res.status(200));
                });

        router.post('/like/:infos', (req: Request, res: Response) => {
            this.databaseService.createLike(req.params.infos.split('..')[0], req.params.infos.split('..')[1]).then(()=>res.status(200));
        });

        router.post('/delike/:infos', (req: Request, res: Response) => {
            this.databaseService.removeLike(req.params.infos.split('..')[0], req.params.infos.split('..')[1]).then(()=>res.status(200));
        });

        

        router.get('/users/search/:handle', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .searchUsers(req.params.handle)
                .then((result) => {res.json(result.rows), console.log(result.rows)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/friends/:handle', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getFriendsInfos(req.params.handle)
                .then((result) => {res.json(result)})
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        /*router.get('/tables', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getTablesList()
                .then((result: pg.QueryResult) => res.json(result.rows))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/tables/:tableName', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getTable(req.params.tableName, req.query)
                .then((result: pg.QueryResult) => res.json(result.rows))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/tables/:tableName/primary-key', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getTablePrimaryKeys(req.params.tableName)
                .then((result: pg.QueryResult) => res.json(result.rows))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/tables/:tableName/foreign-key', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getTableForeignKey(req.params.tableName)
                .then((result: pg.QueryResult) => res.json(result.rows))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.get('/tables/:tableName/types', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .getTableColumnsTypes(req.params.tableName)
                .then((result: pg.QueryResult) => res.json(result.rows))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(404).json(e.stack);
                });
        });

        router.delete('/tables/:tableName', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .remove(req.params.tableName, req.body)
                .then((result: pg.QueryResult) => res.json(true))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });

        router.post('/tables/:tableName', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .create(req.params.tableName, req.body)
                .then((result: pg.QueryResult) => res.json(result.rowCount))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });

        router.put('/tables/:tableName', (req: Request, res: Response, next: NextFunction) => {
            this.databaseService
                .change(req.params.tableName, req.body)
                .then((result: pg.QueryResult) => res.json(result.rowCount))
                .catch((e: Error) => {
                    console.error(e.stack);
                    res.status(405).json(e.stack);
                });
        });
        */

        return router;
    }
}

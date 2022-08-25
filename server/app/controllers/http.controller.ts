import { NextFunction, Router } from 'express';
import { Service } from 'typedi';
import { Request, Response} from 'express';
import { NewsService } from '../services/news.service';

@Service()
export class HttpController {
    router!: Router;

    constructor(
        private newsService: NewsService
    ) {
        this.init();
        this.configureRouter();
    }

    private async init() {
    }

    private configureRouter() {

        //const { validate } = new Validator({});
        this.router = Router();
        
        this.router.get('/favicon.ico', (req, res) => res.status(204));
        this.router.get('/', async (req: Request, res: Response) => {
            // Send the request to the service and send the response
            const time: string = 'Hello world';
            console.log(req);
            res.json(time);
        });

        this.router.delete('/removePic/:file', (req, res) => {
            const fs = require('fs')

            try {
            fs.unlinkSync(`./assets/profile-pics/${req.params.file}`)
            //file removed
            } catch(err) {
            console.error(err)
            }
            res.status(204);
        });

        this.router.get('/api/image/:file', (req: Request, res: Response, next: NextFunction) => {
            if(req.params.file !== 'undefined' && req.params.file !== 'none' && req.params.file !== '0'){
                res.download(`./assets/profile-pics/${req.params.file}`);
            } else if(req.params.file === 'undefined'){
                res.download(`./assets/logo/logo.svg`);
            }
        });

        this.router.get('/api/video/:file', (req: Request, res: Response, next: NextFunction) => {
            if(req.params.file !== 'undefined' && req.params.file !== 'none' && req.params.file !== '0'){
                res.download(`./assets/videos/${req.params.file}`);
            }
        });

        this.router.get('/api/news/:filters', (req: Request, res: Response, next: NextFunction) => {
            let sample = this.newsService.getArticles(req.params.filters, req.params.filters.split(';')[0]);
            res.json(sample), console.log(sample.length);
           
        });
        /*this.router.post('/user', async (req: Request, res: Response) => {
            
        });

        this.router.get('/high-scores', async (req: Request, res: Response) => {
            const scores = await this.highScoreService.getScores(false);
            res.json(scores);
        });*/
        
    }
}

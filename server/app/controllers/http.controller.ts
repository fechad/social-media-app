import { NextFunction, Router } from 'express';
import { Service } from 'typedi';
import { Request, Response} from 'express';

@Service()
export class HttpController {
    router!: Router;

    constructor(
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
            res.json(time);
        });

        this.router.get('/api/image/:file', (req: Request, res: Response, next: NextFunction) => {
            if(req.params.file !== 'undefined'){
                res.download(`./assets/profile-pics/${req.params.file}`);
            } else {
                res.download(`./assets/logo/logo.svg`);
            }
        });
        /*this.router.post('/user', async (req: Request, res: Response) => {
            
        });

        this.router.get('/high-scores', async (req: Request, res: Response) => {
            const scores = await this.highScoreService.getScores(false);
            res.json(scores);
        });*/
        
    }
}

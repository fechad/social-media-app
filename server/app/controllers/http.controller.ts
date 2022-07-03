import { Router } from 'express';
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
        this.router.get('/', async (req: Request, res: Response) => {
            // Send the request to the service and send the response
            const time: string = 'Hello world';
            res.json(time);
        });
        /*this.router.post('/user', async (req: Request, res: Response) => {
            
        });

        this.router.get('/high-scores', async (req: Request, res: Response) => {
            const scores = await this.highScoreService.getScores(false);
            res.json(scores);
        });*/
        
    }
}

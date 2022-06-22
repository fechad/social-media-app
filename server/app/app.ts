import { HttpException } from './classes/http.exception';
import cookieParser from 'cookie-parser';
import * as cors from 'cors';
import express from 'express';
import { ValidationError } from 'express-json-validator-middleware';
import { StatusCodes } from 'http-status-codes';
import * as logger from 'morgan';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { Service } from 'typedi';
import { HttpController } from './controllers/http.controller';
import { DatabaseController } from './controllers/db.controller';

@Service()
export class Application {
    app: express.Application;
    private readonly internalError: number = StatusCodes.INTERNAL_SERVER_ERROR;
    private readonly swaggerOptions: swaggerJSDoc.Options;

    constructor(private readonly httpController: HttpController, private dbController: DatabaseController ) {
        this.app = express();

        this.swaggerOptions = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'Cadriciel Serveur',
                    version: '1.0.0',
                },
            },
            apis: ['**/*.ts'],
        };

        this.config();

        this.bindRoutes();
    }

    bindRoutes(): void {
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc.default(this.swaggerOptions)));
        this.app.use('/api', this.httpController.router);
        this.app.use('/database', this.dbController.router);
        /*this.app.use('/', (req, res) => {
            res.redirect('/api/docs');
        });*/
        this.errorHandling();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger.default('dev'));
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors.default());
    }

    private errorHandling(): void {
        // When previous handlers have not served a request: path wasn't found
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: HttpException = new HttpException('Introuvé');
            next(err);
        });

        // validation error handling
        this.app.use((error: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
            if (error instanceof ValidationError) {
                response.status(StatusCodes.BAD_REQUEST).send(error.validationErrors);
            } else {
                next(error);
            }
        });

        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            this.app.use((err: HttpException, req: express.Request, res: express.Response) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        this.app.use((err: HttpException, req: express.Request, res: express.Response) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}

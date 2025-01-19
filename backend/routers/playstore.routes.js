import { Router } from 'express';
import { demoPlayStoreData, fetchPlayStoreData } from '../controller/playStore.controller.js';

const playstoreRouter = Router();

playstoreRouter.post('/', fetchPlayStoreData);
playstoreRouter.post('/demo', demoPlayStoreData);

export { playstoreRouter };
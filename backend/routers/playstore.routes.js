import { Router } from 'express';
import { fetchPlayStoreData } from '../controller/playStore.controller.js';

const playstoreRouter = Router();

playstoreRouter.post('/', fetchPlayStoreData);

export { playstoreRouter };
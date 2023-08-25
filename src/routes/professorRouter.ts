import { Router } from 'express';

import { getAllprofessor } from '../controllers/professorController';

const professorRouter = Router();

professorRouter.get('/professors', getAllprofessor);

export default professorRouter;



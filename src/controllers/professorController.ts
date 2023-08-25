import { Request, Response } from 'express';
import { professorService } from '../services/professorService';

export async function getAllprofessor(req: Request, res: Response) {
    const professor = await professorService.getAllProfessors();
    res.send(professor).status(200);
}

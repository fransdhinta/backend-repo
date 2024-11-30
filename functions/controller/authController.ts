import { Request, Response } from 'express';
import { IAuthLogin, IAuthRegister } from '../entities/auth';
import { auth } from '../config/firebaseConfig';

export const register = async (
    req: Request, 
    res: Response
  ): Promise<void> => {
    try {
        const {email, password, name}: Partial<IAuthRegister> = req.body;
        
        if (!email || !password || !name) {
            res.status(400).send({ message: 'Name, Email, password are required' });
        }
    
        try {
            const userRecord = await auth.createUser({
                displayName: name,
                email,
                password,
            });
    
            res.status(201).send({ uid: userRecord.uid });
        } catch (error) {
            res.status(500).send({ mesuserDatasage: error });
        }
    } catch (error) {
      res.status(500).json({ error: 'An error occured, please try again later' });
    }
};

export const login = async (
    req: Request, 
    res: Response
  ): Promise<void> => {
    try {
        const {email, password}: Partial<IAuthLogin> = req.body;        

        if (!email || !password) {
            res.status(400).send({ message: 'Email and password are required' });
        }

        try {
            const user = await auth.getUserByEmail(email ?? "");
            const token = await auth.createCustomToken(user.uid);

            res.status(200).send({ token });
        } catch (error) {
            res.status(500).send({ message: error });
        }
    } catch (error) {
      res.status(500).json({ error: 'An error occured, please try again later' });
    }
};
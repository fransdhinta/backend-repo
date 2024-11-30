import { Request, Response } from 'express';
import { User } from '../entities/user';
import { db } from '../config/firebaseConfig';

export const createUserData = async (
    req: Request, 
    res: Response
  ): Promise<void> => {
    try {
      const userData: Partial<User> = req.body;
  
      if (!userData.name || !userData.address) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
      }
  
      const userWithTimestamps = {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      await db.collection('USERS').doc(`${userData.id}`).set(userWithTimestamps);
      res.status(201).json({ 
        message: 'User created successfully',
        userId: `${userData.id}`,
        data: userWithTimestamps
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
};

export const updateUserData = async (
    req: Request, 
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userData: Partial<User> = req.body;
  
      if (!id) {
        res.status(400).json({ error: 'User ID is required' });
        return;
      }
  
      // Check if user exists
      const userDoc = await db.collection('USERS').doc(id).get();
      if (!userDoc.exists) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      // Update with timestamps
      const updateData = {
        ...userData,
        updatedAt: new Date()
      };
  
      await db.collection('USERS').doc(id).update(updateData);
      
      res.status(200).json({ 
        message: 'User updated successfully',
        userId: id
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
};
  
  export const fetchUserData = async (
    req: Request, 
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
  
      if (!id) {
        res.status(400).json({ error: 'User ID is required' });
        return;
      }
  
      const userDoc = await db.collection('USERS').doc(id).get();
      
      if (!userDoc.exists) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const userData = userDoc.data() as User;
      
      res.status(200).json({
        message: 'User fetched successfully',
        userId: id,
        data: userData
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };

export const fetchAllUserData = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
        const usersSnapshot = await db.collection('USERS').get();
        const users: User[] = [];

        usersSnapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() } as User);
        });

        res.status(200).json({
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
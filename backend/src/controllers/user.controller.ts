import { Request, Response } from 'express';
import { signinSchema, signupSchema } from '../types/user.type';
import { User } from '../models/User';
import { AuthRequest } from '../middlewares/auth';

export const signup = async (req: Request, res: Response) => {
     try {
          const validatedInput = signupSchema.safeParse(req.body);
          if (validatedInput.error) { 
               res.status(411).json({ success: false, message: validatedInput.error.issues[0].message });
               return;
          }
          const { email, name, password } = validatedInput.data;
          const isAlreadyRegisterd = await User.findOne({ email });
          if (isAlreadyRegisterd) { 
               res.status(400).json({ success: false, message: 'Email is already registerd' });
               return;
          }
          const user = new User({ name, email, password });
          await user.save();
          const token = user.generateAuthToken()
          res.status(200).json({ success: true, message: 'Signup successfull', token });
     } catch (error) {
          console.error('❌ Error during signup: ', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
     }
}

export const signin = async (req: Request, res: Response) => {
     try {
          const validatedInput = signinSchema.safeParse(req.body);
          if (validatedInput.error) { 
               res.status(411).json({ success: false, message: validatedInput.error.issues[0].message });
               return;
          }
          const { email, password } = validatedInput.data;
          const user = await User.findOne({ email });
          if (!user) { 
               res.status(400).json({ success: false, message: 'Incorrect email' });
               return;
          }
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
               res.status(400).json({ success: false, message: 'Incorrect password' });
               return;
          }
          const token = user.generateAuthToken()
          res.status(200).json({ success: true, message: 'Signin successfull', token });
     } catch (error) {
          console.error('❌ Error during signin: ', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
     }
}


export const getProfile = async (req: AuthRequest, res: Response) => {
     try {
          const user = await User.findById(req.id).select('-password');
          if (!user) {
               res.status(404).json({ success: false, message: 'User not found' });
               return;
          }
          res.status(200).json({ success: false, user });
     } catch (error) {
          console.error('❌ Error during fetch profile: ', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
     }
}
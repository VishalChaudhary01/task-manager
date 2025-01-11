import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
     name: string,
     email: string;
     password: string;
     generateAuthToken: () => string;
     comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
});

userSchema.pre('save', async function(next) {
     const user = this;
     if (user.isModified('password')) {
          user.password = await bcrypt.hash(user.password, 10);
     }
     next();
});

userSchema.methods.comparePassword = async function(password: string) {
     return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAuthToken = function() {
     const token = jwt.sign({ id: this._id}, process.env.JWT_SECRET!, { expiresIn: '7d' });
     return token;
}

export const User = mongoose.model<IUser>('User', userSchema);
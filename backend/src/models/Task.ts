import mongoose, { Document } from 'mongoose';

interface ITaskSchema extends Document {
     userId: mongoose.ObjectId;
     title: String;
     description?: String;
     status: 'DONE' | 'PENDING';
}

const taskSchema = new mongoose.Schema<ITaskSchema>(
     {
          userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
          title: { type: String, required: true },
          description: { type: String },
          status: { type: String, enum: ['DONE', 'PENDING'], default: 'PENDING' },
     },
     { timestamps: true }
)

export const Task = mongoose.model<ITaskSchema>('Task', taskSchema);
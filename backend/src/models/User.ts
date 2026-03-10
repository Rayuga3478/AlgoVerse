import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    firebaseUid: string;
    email: string;
    name: string;
    avatarUrl?: string;
    searchHistory: {
        prompt: string;
        timestamp: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        firebaseUid: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
        avatarUrl: { type: String },
        searchHistory: [
            {
                prompt: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);

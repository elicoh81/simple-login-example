import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema<{ username: string, hashPassword: string, email: string, name: string, lastName: string }>({
    username: { type: String, require: true, unique: true },
    hashPassword: { type: String, require: true },
    email: { type: String, require: true },
    name: { type: String, require: true },
    lastName: { type: String, require: true },
});

export const User = mongoose.model('User', userSchema);
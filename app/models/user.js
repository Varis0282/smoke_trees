import mongoose, { Schema } from "mongoose";
import MongooseDelete from 'mongoose-delete'

const userSchema = new Schema({
    name: { type: String, required: true },
    addresses: [{ type: String, required: true }]
}, { timestamps: true });

userSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: ['count', 'countDocuments', 'find'] })

export default mongoose.model("User", userSchema);
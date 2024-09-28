import mongoose, { Schema } from "mongoose";
import MongooseDelete from 'mongoose-delete'

const addressSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

addressSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: ['count', 'countDocuments', 'find'] })

export default mongoose.model("Blog", addressSchema);
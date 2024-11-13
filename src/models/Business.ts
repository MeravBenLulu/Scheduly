import mongoose, { Document, Schema } from 'mongoose';

interface IBusiness extends Document {
    name: string;
    description: string;
    email: string;
    telephone: string;
    address: string;
}

const businessSchema: Schema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      email: { type: String, required: true },
      telephone: { type: String },
      address: { type: String, required: true },
    },
    { timestamps: true }
  );

const Business = mongoose.model<IBusiness>('Business', businessSchema);

export default Business;
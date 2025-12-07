import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
    name: string;
    email?: string;
    date: Date;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        email: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            required: [true, 'Please provide a date for the appointment'],
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        notes: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

// Check if the model is already defined to prevent overwriting during hot reloads
const Appointment: Model<IAppointment> =
    mongoose.models.Appointment ||
    mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;

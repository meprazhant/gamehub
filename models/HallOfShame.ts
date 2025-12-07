import mongoose, { Schema, Document, Model } from 'mongoose';

// Sub-schemas for cleaner structure
const PlayerSchema = new Schema({
    name: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }, // Optional link to registered user
}, { _id: false });

const GameSchema = new Schema({
    key: { type: String, required: true, trim: true, lowercase: true }, // e.g., 'fc26', 'tekken8'
    name: { type: String, required: true, trim: true }, // e.g., 'FC 26', 'Tekken 8'
}, { _id: false });

const ResultSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['Score', 'KO', 'Submission', 'Pinfall', 'TimeOut', 'Other'],
        default: 'Score'
    },
    scoreWinner: { type: Number, required: false }, // Only for Score type
    scoreLoser: { type: Number, required: false },  // Only for Score type
    description: { type: String, required: false }, // e.g., "Round 1 KO", "Armbar"
}, { _id: false });

const PaidSchema = new Schema({
    isPaid: { type: Boolean, default: false },
    amount: { type: Number, default: 0 },
}, { _id: false });

// Main Interface
export interface IHallOfShame extends Document {
    game: {
        key: string;
        name: string;
    };
    winner: {
        name: string;
        user?: mongoose.Types.ObjectId;
    };
    loser: {
        name: string;
        user?: mongoose.Types.ObjectId;
    };
    result: {
        type: 'Score' | 'KO' | 'Submission' | 'Pinfall' | 'TimeOut' | 'Other';
        scoreWinner?: number;
        scoreLoser?: number;
        description?: string;
    };
    roast?: string;
    paid: {
        isPaid: boolean;
        amount: number;
    };
    createdBy?: mongoose.Types.ObjectId;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const HallOfShameSchema: Schema = new Schema(
    {
        game: { type: GameSchema, required: true },
        winner: { type: PlayerSchema, required: true },
        loser: { type: PlayerSchema, required: true },
        result: { type: ResultSchema, required: true },
        roast: { type: String, maxlength: 280 }, // Twitter-style limit for fun
        paid: { type: PaidSchema, default: () => ({ isPaid: false, amount: 0 }) },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        date: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

// Prevent model overwrite in dev, but allow schema updates
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.HallOfShame;
}

const HallOfShame: Model<IHallOfShame> =
    mongoose.models.HallOfShame ||
    mongoose.model<IHallOfShame>('HallOfShame', HallOfShameSchema);

export default HallOfShame;

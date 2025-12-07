import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGame extends Document {
    name: string;
    key: string;
    image?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const GameSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a game name'],
            trim: true,
        },
        key: {
            type: String,
            required: [true, 'Please provide a unique key for the game'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        image: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Game: Model<IGame> =
    mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);

export default Game;

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: { type: String, required: true },
    usageArea: { type: String, required: true },
    numberOfMembers: { type: Number, required: true },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    boardPassword: { type: String, required: true },
    createDate: { type: String, required: true }
});

boardSchema.set('toJSON', { getters: true });

const Board = mongoose.model('Board', boardSchema);
export default Board;
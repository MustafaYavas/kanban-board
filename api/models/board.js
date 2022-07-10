import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: { type: String, required: true },
    usageArea: { type: String, required: true },
    numberOfMembers: { type: Number, required: true },
    owner: { type: String, required: true },
    boardPassword: { type: String, required: true },
    createDate: { type: String, required: true }
});

boardSchema.set('toJSON', { getters: true });

const Board = mongoose.model('Board', boardSchema);
export default Board;
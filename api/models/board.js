import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: { type: String, required: true },
    usageArea: { type: String, required: true },
    membersNumber: { type: Number, required: true },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    members: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
    tasks: [{ type: Object, required: true }],
    creatorName: { type: String, required: true },
    boardPassword: { type: String, required: true },
    createDate: { type: String, required: true }
});

boardSchema.set('toJSON', { getters: true });

const Board = mongoose.model('Board', boardSchema);
export default Board;
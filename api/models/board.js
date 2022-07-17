import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: { type: String, required: true },
    usageArea: { type: String, required: true },
    membersNumber: { type: Number, required: true },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },      // proje kim tarafından oluşturuldu
    members: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],  // projedeki üyeler
    tasks: [{ type: Object, required: true }],    // projedeki görevler
    creatorName: { type: String, required: true },
    boardPassword: { type: String, required: true },
    createDate: { type: String, required: true }
});

boardSchema.set('toJSON', { getters: true });

const Board = mongoose.model('Board', boardSchema);
export default Board;
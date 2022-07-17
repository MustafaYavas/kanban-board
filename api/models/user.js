import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, minlength: 5 },
    password: { type: String, required: true, minlength: 5 },
    image: { type: String, required: true },
    ownBoards:  [{ type: mongoose.Types.ObjectId, required: true, ref: 'Board' }],      // sahibi olduğu projeler
    memberBoards:  [{ type: mongoose.Types.ObjectId, required: true, ref: 'Board' }]    // üyesi olduğu projeler
});

userSchema.plugin(uniqueValidator);
userSchema.set('toJSON', { getters: true });

const User = mongoose.model('User', userSchema);
export default User;
import mongoose from "mongoose";
import MUUID from 'uuid-mongodb';
const bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

export interface IUser{
  id: string,
  email: string,
  password: string,
  comparePassword(candidatePassword:string): Promise<boolean>
}

const UserSchema = new Schema({
    _id: {
      type: 'object',
      value: { type: 'Buffer' },
      default: () => MUUID.v4(),
    },    
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name:String,
    avatar_url:String,
},
{timestamps: true});

UserSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err:Error, salt:string) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err:Error, hash:string) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

UserSchema.virtual('id').get(function(){
  return this._id;
});

UserSchema.methods.comparePassword = function(candidatePassword: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err:Error, isMatch:boolean) => {
        if (err) reject(err);
        resolve(isMatch);
    });
  })
};

UserSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.password;
  return obj
}

export const User = mongoose.model<IUser>('user', UserSchema);

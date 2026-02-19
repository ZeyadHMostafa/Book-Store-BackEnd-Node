import mongoose from 'mongoose';

const { Schema, model } = mongoose;

//TODO: This is just a sample. all the content here should bechanged before deploying the project!!

const schema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to another model
      required: true
    }
  },
  {
    // Automatically creates createdAt and updatedAt fields
    timestamps: true 
  }
);

// removes fields when transformed to json
schema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

//removes fields when transformed to object
schema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

schema.index({ name: 1 });

//TODO: Change this to a sutable entity name
const Entity = model('Entity', schema);
module.exports = Entity;
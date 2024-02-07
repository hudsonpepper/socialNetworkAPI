const { Schema } = require('mongoose');
const dayjs = require('dayjs');

// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);

reactionSchema.virtual('formatDate').get(function () {
  return dayjs(this.createdAt).format('MM/DD/YYYY')
});

module.exports = reactionSchema;

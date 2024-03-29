const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);


thoughtSchema.virtual('formatDate').get(function () {
  return dayjs(this.createdAt).format('MM/DD/YYYY')
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
})
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
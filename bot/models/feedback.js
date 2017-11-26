var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new Schema({ telegramLogin: String, 
							message: String,
							createdAt: { type: Date, default: Date.now }
});
var FeedbackModel = mongoose.model('Feedback', schema);

export const removeFeedback = ((id) => FeedbackModel.findByIdAndRemove() );
export const findFeedback = ((id) => FeedbackModel.find({"_id": id}) );
export const findFeedbacks = (() => FeedbackModel.find({}) );
export const saveFeedback = (({telegramLogin, message}) => new FeedbackModel({ telegramLogin, message }).save() );
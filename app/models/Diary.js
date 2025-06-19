import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
    questionOne: {
        type: String,
        required: true
    },
    questionTwo: {
        type: String,
        required: true
    },
    questionThree: {
        type: String,
        required: true
    },
    questionFour: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})

const Diary = mongoose.models.Diary || mongoose.model("Diary",diarySchema);

export default Diary;

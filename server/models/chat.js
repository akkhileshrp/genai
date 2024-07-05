const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    prompt: { type: String, required: true },
    data: { type: String, required: true }
}, { timestamps: true });

const dataModel = mongoose.model("datas", dataSchema);

module.exports = dataModel;

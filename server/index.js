const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const GenAISchema = require("./models/chat");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());
const configuration = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected sucessfully"))
    .catch((err) => console.error(err));

const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const genAI = new GenAISchema({ prompt: prompt, data: text });
        await genAI.save();
        res.send(text.toString());
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
};
app.get("/", (req, res) => {
    res.send({ message: "Hello, World!" });
});

app.post("/generate", generateResponse);
app.get("/history", async (req, res) => {
    try {
        const data = await GenAISchema.find();
        res.send({ data: data });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

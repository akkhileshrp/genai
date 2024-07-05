const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());
const configuration = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });
const userPromptHistory = [];
const userPromptDataHistory = [];

const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        userPromptHistory.push(prompt);
        userPromptDataHistory.push(text);
        res.send(text.toString());
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
app.get("/", (req, res) => {
    res.send({ message: "Hello, World!" });
});
app.get("/prompt-history", async (req, res) => {
    res.send(userPromptHistory);
});
app.get("/prompt-data", async (req, res) => {
    res.send(userPromptDataHistory);
});
app.post("/generate", generateResponse);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

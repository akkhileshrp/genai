const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
const configuration = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });
const history = [];
const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        history.push(text);
        res.send(text.toString());
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
app.get("/", (req, res) => {
    res.send({ message: "Hello, World!" });
});
app.get("/history", async (req, res) => {
    res.send(history);
});
app.post("/generate", generateResponse);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

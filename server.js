import express from "express";
import OpenAI from "openai";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

// Open Ai npm package method.
// const client = new OpenAI({
//   apiKey: process.env.SECREAT_KEY,
// });

// const response = await client.responses.create({
//   model: "gpt-4o",
//   instructions: "you are story teller.",
//   input: "Write a short bedtime story about a unicorn.",
// });

// console.log(response.output_text);

// app.get("/test", (req, res) => {});

// app.post("/test", async (req, res) => {
//   fetch;
// });

//Open Ai with endpoints

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.SECREAT_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: req.body.message,
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     res.send(data.choices[0].message.content);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});

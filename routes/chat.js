import Route from "express";
import Thread from "../model/Thread.js";
import getOpenAiresponse from "../utils/openai.js";

const router = Route();

//testing Db connection
router.post("/test", async (req, res) => {
  try {
    const testThread = new Thread({
      threadId: "123abc",
      title: "test thread2",
    });

    const response = await testThread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to save in DB" });
  }
});

// GET threads
router.get("/thread", async (req, res) => {
  try {
    const allThread = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(allThread);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch threads" });
  }
});

//GET specific thread
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "thread not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch this thread" });
  }
});

//Delete route

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ error: "thread not found" });
    }
    res.status(200).json({ success: "thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: `something went wrong in delete route: ${err}` });
  }
});

//POST route
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fileds" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }
    const assistantReply = await getOpenAiresponse(message);
    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();
    res.json({ reply: assistantReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `something went wrong in /chat: ${err}` });
  }
});

export default router;

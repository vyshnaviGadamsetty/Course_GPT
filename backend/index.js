import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  const topicMatch = prompt.match(/topic: (.*)/i);
  const topic = topicMatch ? topicMatch[1] : "Unknown Topic";

  const mockResponse = `
🔹 Title: Introduction to ${topic}

🔹 Description:
This lesson provides a comprehensive introduction to ${topic}, covering its foundational principles, importance, and real-world relevance.

🔹 Learning Outcomes:
- Understand what ${topic} is
- Identify key concepts and terminology
- Recognize common use cases
- Apply basic ${topic} principles through examples

🔹 Key Concepts:
- Definition of ${topic}
- Core components and structure
- Benefits and limitations

🔹 Example:
Imagine you're teaching ${topic} to a beginner. Use real-world analogies and break down each part step-by-step.

✅ This is a mock AI-generated response.
`;

  res.send(mockResponse);
});

app.listen(port, () => {
  console.log(`🟢 Mock backend running at http://localhost:${port}`);
});

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // API Routes
  app.post("/api/predict-insight", async (req, res) => {
    try {
      const { data } = req.body;
      
      const prompt = `As an expert cardiovascular diagnostic assistant, provide a rigorous analysis based on clinical guidelines (AHA/ACC):
      Patient Metrics: ${JSON.stringify(data)}
      
      Clinical Guidelines Reference:
      1. Blood Pressure: Normal <120/80, Elevated 120-129/<80, Stage 1 Hypertension 130-139/80-89, Stage 2 >=140/>90.
      2. Cholesterol: Desirable <200 mg/dL, Borderline 200-239, High >=240.
      3. Fasting Blood Sugar: >120 mg/dL is a strong diabetic indicator.
      4. ST Depression (Oldpeak): >=1.0mm is clinically significant.
      5. Max HR: Age-predicted max is 220 minus age. Achieving <85% of this may indicate chronotropic incompetence.
      6. Exercise Angina: Positive is a strong predictor of Coronary Artery Disease.
      
      Analyze the specific metrics provided. identify discrepancies with healthy ranges, and provide:
      - A professional summary of the cardiovascular profile.
      - A focused list of Risk Factors (only those present).
      - Targeted recommendations for further diagnostic testing and lifestyle intervention.
      
      Format strictly as JSON:
      {
        "summary": "...",
        "riskFactors": ["...", "..."],
        "recommendations": ["...", "..."]
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Attempt to parse JSON from Markdown if necessary
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const cleanedJson = jsonMatch ? jsonMatch[0] : text;
      
      res.json(JSON.parse(cleanedJson));
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate clinical insights" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

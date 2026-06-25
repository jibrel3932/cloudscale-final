const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

const STUDENT_NAME = "Jibrel Abubakr Jibrel";

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CloudScale - Final Project</title>
  <style>
    body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; margin: 0;
      background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); color: #fff;
      display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: rgba(255,255,255,0.08); padding: 48px 56px; border-radius: 20px;
      text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.4); backdrop-filter: blur(10px); }
    h1 { font-size: 2.6rem; margin: 0 0 8px; }
    .icon { font-size: 3.5rem; }
    .name { font-size: 1.4rem; margin: 16px 0; color: #4fd1c5; font-weight: 600; }
    .badges { margin-top: 24px; }
    .badge { display: inline-block; background: rgba(255,255,255,0.15); padding: 8px 16px;
      margin: 6px; border-radius: 30px; font-size: 0.9rem; }
    .meta { margin-top: 20px; font-size: 0.85rem; opacity: 0.7; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">&#9729;&#65039;</div>
    <h1>CloudScale</h1>
    <div class="name">Deployed by ${STUDENT_NAME}</div>
    <div class="badges">
      <span class="badge">&#128051; Docker</span>
      <span class="badge">&#9881;&#65039; Terraform</span>
      <span class="badge">&#9096; Kubernetes (AKS)</span>
      <span class="badge">&#128230; ACR</span>
      <span class="badge">&#128640; GitHub Actions</span>
    </div>
    <div class="meta">Running on Azure Kubernetes Service &bull; Pod: ${require('os').hostname()}</div>
  </div>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`CloudScale app listening on port ${PORT}`));

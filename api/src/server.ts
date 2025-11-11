import express from "express";
import cors from "cors";
import { CompraController } from "./controller/Compra";

const app = express();
const PORT = process.env.PORT || 3009;

// Middlewares
app.use(cors());
app.use(express.json());

// Controllers
const compraController = new CompraController();

// Routes
app.use("/api", compraController.router);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API está funcionando!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});

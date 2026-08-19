require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const patrimoniosRoutes = require("./routes/patrimonios.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    mensaje: "API funcionando",
  });
});

app.use("/api/patrimonios", patrimoniosRoutes);

app.use((error, req, res, next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: error.message,
    });
  }

  res.status(500).json({
    error: "Error interno del servidor",
  });
});

const PORT = process.env.PORT || 3000;

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Bienes Patrimoniales",
    version: "1.0.0",
    description: "API para registrar bienes del patrimonio cultural",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/api/health": {
      get: {
        summary: "Verificar que la API funciona",
        responses: {
          200: {
            description: "API funcionando",
          },
        },
      },
    },
    "/api/patrimonios": {
      get: {
        summary: "Listar bienes patrimoniales",
        responses: {
          200: {
            description: "Lista de patrimonios",
          },
        },
      },
      post: {
        summary: "Crear un bien patrimonial",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                nombre: "Iglesia colonial",
                tipologia: "Arquitectónico",
                periodo_historico: "Siglo XVIII",
                ubicacion: {
                  direccion: "Carrera 5 #10-20",
                  coordenadas: {
                    type: "Point",
                    coordinates: [-74.0817, 4.6097],
                  },
                },
                descripcion: "Edificación de importancia histórica.",
                valor_patrimonial: "Histórico y arquitectónico",
                estado_conservacion: "Bueno",
                inmaterial: {
                  existe: false,
                  tipo: "",
                  contenido: "",
                },
                imagenes: [],
                fuente: "Inventario municipal",
                fecha_registro: "2026-08-19T15:30:00Z",
                created_by: "usuario-001",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Patrimonio creado",
          },
        },
      },
    },
  },
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "patrimonio_cultural",
  })
  .then(() => {
    console.log("Conectado a MongoDB");

    app.listen(PORT, () => {
      console.log(`API ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo conectar a MongoDB:", error.message);
    process.exit(1);
  });

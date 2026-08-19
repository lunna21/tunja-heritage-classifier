const express = require("express");
const mongoose = require("mongoose");
const Patrimonio = require("../models/Patrimonio");

const router = express.Router();

// Crear patrimonio
router.post("/", async (req, res, next) => {
  try {
    const patrimonio = await Patrimonio.create(req.body);

    res.status(201).json(patrimonio);
  } catch (error) {
    next(error);
  }
});

// Listar patrimonios
router.get("/", async (req, res, next) => {
  try {
    const filtro = {};

    if (req.query.tipologia) {
      filtro.tipologia = req.query.tipologia;
    }

    if (req.query.estado_conservacion) {
      filtro.estado_conservacion = req.query.estado_conservacion;
    }

    const patrimonios = await Patrimonio.find(filtro)
      .sort({ created_at: -1 })
      .limit(100);

    res.json(patrimonios);
  } catch (error) {
    next(error);
  }
});

// Consultar un patrimonio
router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "El ID no es válido"
      });
    }

    const patrimonio = await Patrimonio.findById(req.params.id);

    if (!patrimonio) {
      return res.status(404).json({
        error: "Patrimonio no encontrado"
      });
    }

    res.json(patrimonio);
  } catch (error) {
    next(error);
  }
});

// Actualizar patrimonio
router.patch("/:id", async (req, res, next) => {
  try {
    const patrimonio = await Patrimonio.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!patrimonio) {
      return res.status(404).json({
        error: "Patrimonio no encontrado"
      });
    }

    res.json(patrimonio);
  } catch (error) {
    next(error);
  }
});

// Eliminar patrimonio
router.delete("/:id", async (req, res, next) => {
  try {
    const patrimonio = await Patrimonio.findByIdAndDelete(req.params.id);

    if (!patrimonio) {
      return res.status(404).json({
        error: "Patrimonio no encontrado"
      });
    }

    res.json({
      mensaje: "Patrimonio eliminado correctamente"
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
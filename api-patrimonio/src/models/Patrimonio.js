const mongoose = require("mongoose");

const patrimonioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    tipologia: {
      type: String,
      required: true,
      trim: true
    },

    periodo_historico: {
      type: String,
      required: true,
      trim: true
    },

    ubicacion: {
      direccion: {
        type: String,
        required: true,
        trim: true
      },

      coordenadas: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
          default: "Point"
        },

        coordinates: {
          type: [Number],
          required: true,
          validate: {
            validator: function (valor) {
              if (!Array.isArray(valor) || valor.length !== 2) {
                return false;
              }

              const [longitud, latitud] = valor;

              return (
                longitud >= -180 &&
                longitud <= 180 &&
                latitud >= -90 &&
                latitud <= 90
              );
            },
            message: "Las coordenadas deben ser [longitud, latitud]"
          }
        }
      }
    },

    descripcion: {
      type: String,
      required: true
    },

    valor_patrimonial: {
      type: String,
      required: true
    },

    estado_conservacion: {
      type: String,
      required: true
    },

    inmaterial: {
      existe: {
        type: Boolean,
        default: false
      },
      tipo: {
        type: String,
        default: ""
      },
      contenido: {
        type: String,
        default: ""
      }
    },

    imagenes: [
      {
        url: String
      }
    ],

    fuente: {
      type: String,
      required: true
    },

    fecha_registro: {
      type: Date,
      required: true
    }
  },
  {
    collection: "bienes_patrimoniales_Tunja",

    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

patrimonioSchema.index({
  "ubicacion.coordenadas": "2dsphere"
});

module.exports = mongoose.model("Patrimonio", patrimonioSchema);
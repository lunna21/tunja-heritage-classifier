# PWA de Inventario Patrimonial de Tunja

Aplicación React/Vite para capturar y consultar un inventario preliminar interno conectado a la API Express ubicada en api-patrimonio.

## Desarrollo

1. Ejecuta npm install.
2. Copia .env.example como .env.
3. Ejecuta npm run dev.

La API debe estar disponible en VITE_API_BASE_URL y tener MongoDB configurado.

## Verificación

Ejecuta npm run lint, npm test y npm run build.

La aplicación soporta borradores locales y sincronización posterior. La API actual no tiene autenticación ni carga de archivos; por eso esta versión está pensada para un entorno interno o de prototipo y solo registra imágenes mediante URLs HTTPS.

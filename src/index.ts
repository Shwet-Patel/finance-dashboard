import express from "express";
import config from "@/configs/env.config.js";
import apiRoutes from "@/modules/api.routes.js";
import { responseMiddleware } from "@/middlewares/response.middleware.js";
import { errorMiddleware } from "@/middlewares/error.middleware.js";

// create an express application
const app = express();


// middlewares
app.use(express.json());
app.use(responseMiddleware);

//routes
app.use('/api', apiRoutes);

// 404 handler
app.use((_req, res, _next) => {
    return res.error(404, 'route not Found');
});

// error handler
app.use(errorMiddleware);

// initialized the App
app.listen(config.port, () => {
    console.log(`app is up on http://localhost:${config.port}`);
});
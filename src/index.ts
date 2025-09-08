import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from "./middlewares/errorHandler";
import { initDatabase } from './utils/databaseService';
import { setupAssociations } from './models/associations';
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import roleRouter from "./routes/roleRouter";
import paymentRouter from "./routes/paymentRouter";
import formRouter from "./routes/formRouter";
import imageRouter from "./routes/imageRouter";
import path from "path";
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/static/images", express.static(path.join(process.cwd(), "uploads", "images")));


app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/roles", roleRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/forms", formRouter);
app.use("/api/images", imageRouter);



async function initServer() {
    try {
        await initDatabase();
        setupAssociations();
        app.listen(port, () => {
            console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.error(`⚡️[servidor]: Error al iniciar el servidor: ${error}`);
    }
}
app.use(errorHandler);


initServer(); 
import express from "express";
import routes from "../routes";
import { errors } from "celebrate";
import errorHandler from "../utils/errorHandle";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors());
app.use(routes)


app.use("*", errorHandler.notFound);
app.use(errors());
app.use(errorHandler.general);

export default app
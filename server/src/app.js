import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import clientRouter from "./routes/clientRouter.js";
import driverRouter from "./routes/driverRouter.js";
import signinRouter from "./routes/signinRouter.js";
import signoutRouter from "./routes/signoutRouter.js";
import deliveryRouter from "./routes/deliveryRouter.js";
import verifyRouter from "./routes/verify.js";
import calculationRouter from "./routes/calculation.js";
import paymentRouter from "./routes/payment.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/client", clientRouter);
app.use("/api/driver", driverRouter);
app.use("/api/sign-in", signinRouter);
app.use("/api/sign-out", signoutRouter);
app.use("/api/delivery", deliveryRouter);
app.use("/api/verify", verifyRouter);
app.use("/api/calculation", calculationRouter);
app.use("/api/payment", paymentRouter);

export default app;

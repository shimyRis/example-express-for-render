import express from "express";
import { checkDBConnection } from "./db1.js";
import usersRouter from "./routes/usersRoute.js";

const app = express();

app.use(express.json());
app.use("/api/users", usersRouter);

// const dbConnection = await checkDBConnection();
// if (dbConnection) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log("app is listening in port: " + PORT);
    });
// }

import express from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from "../db1.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send("server failed to connect with DB");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("user not found in DB");
        }
    } catch (error) {
        res.status(500).send("server failed to connect with DB");
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, age } = req.body;
        if (name && age) {
            const newUser = await createUser(name, age);
            res.status(201).json(newUser);
        } else {
            res.status(400).send("user must have a name and an age");
        }
    } catch (error) {
        res.status(500).send("server failed to connect with DB");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await deleteUser(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send("user not found in DB");
        }
    } catch (error) {
        res.status(500).send("server failed to connect with DB");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name, age } = req.body;
        if (name && age) {
            const updatedUser = await updateUser(req.params.id, name, age);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).send("user not found in DB");
            }
        } else {
            res.status(400).send("updated user must have a name and an age");
        }
    } catch (error) {
        res.status(500).send("server failed to connect with DB");
    }
});

export default router;

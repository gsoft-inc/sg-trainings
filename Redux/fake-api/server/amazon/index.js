const express = require("express");

const router = express.Router();

router.get("/items", (req, res) => {
    const item = (id, name, price) => ({ id, name, price });
    
    res.json([
        item(1, "Cracking the Coding Interview: 189 Programming Questions and Solutions", 7),
        item(2, "The Art of Computer Programming, Volumes 1-4A Boxed Set", 13),
        item(3, "Automate the Boring Stuff with Python: Practical Programming for Total Beginners", 2),
        item(4, "Practical Programming: An Introduction to Computer Science Using Python 3.6", 1),
        item(5, "Programming: Principles and Practice Using C++ (2nd Edition)", 10),
        item(6, "Clean Code: A Handbook of Agile Software Craftsmanship", 999),
    ]);
});

module.exports = router;
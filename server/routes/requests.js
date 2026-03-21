const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all requests
router.get('/', (req, res) => {
    const sql = "SELECT * FROM requests ORDER BY createdAt DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Create a new request
router.post('/', (req, res) => {
    const { category, description, priority } = req.body;
    if (!category || !description || !priority) {
        return res.status(400).json({ "error": "Missing required fields" });
    }
    
    const sql = 'INSERT INTO requests (category, description, priority) VALUES (?,?,?)';
    const params = [category, description, priority];
    
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(201).json({
            "message": "success",
            "data": {
                id: this.lastID,
                category,
                description,
                priority,
                status: 'Pending'
            }
        });
    });
});

// Update request status
router.put('/:id/status', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    
    if (!status) {
        return res.status(400).json({ "error": "Status is required" });
    }
    
    db.run(
        'UPDATE requests SET status = ? WHERE id = ?',
        [status, id],
        function (err, result) {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            if (this.changes === 0) {
                return res.status(404).json({"error": "Request not found"});
            }
            res.json({
                message: "success",
                data: { id, status }
            });
        }
    );
});

module.exports = router;

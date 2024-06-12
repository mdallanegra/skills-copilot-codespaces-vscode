// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Read the comments from the file and send them back as JSON
// 4. Create a route for POST /comments
// 5. Read the comments from the file
// 6. Add a new comment to the array
// 7. Save the comments back to the file
// 8. Send a response back to the client

// 1. Create a web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// 2. Create a route for GET /comments
app.get('/comments', (req, res) => {
    // 3. Read the comments from the file and send them back as JSON
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Could not read comments file');
            return;
        }
        res.send(data);
    });
});

// 4. Create a route for POST /comments
app.post('/comments', (req, res) => {
    // 5. Read the comments from the file
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Could not read comments file');
            return;
        }
        const comments = JSON.parse(data);
        // 6. Add a new comment to the array
        comments.push(req.body);
        // 7. Save the comments back to the file
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Could not write comments file');
                return;
            }
            res.send('Comment added');
        });
    });
});

// 8. Send a response back to the client
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
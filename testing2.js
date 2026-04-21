const express = require('express');
const app = express();

const users = require('./users.json');

const {success, error} = require('./utils/response')

app.get('/api/users', (req, res) => {
    // res.json(users);
    try {
        return success(res,users, "Users retrieved successfully")
    } catch(err)
    {
        return error(res, "Failed to fetch users, 500")
    }
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})
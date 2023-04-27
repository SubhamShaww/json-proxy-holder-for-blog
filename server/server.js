const fetch = require('node-fetch')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use((req, res, next) => {
    res.append("x-codedamn-project", "jsonproxyholder");
    next();
})

async function makeExternalApiCall(path) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${path}`);
    const jsonData = await response.json();
    return jsonData;
}

app.get('/', (req, res) => {
	res.status(200).send("status ok")
})

app.get('/posts', async (req, res) => {
    try {
        const requestedData = await makeExternalApiCall('posts');
        res.json(requestedData);
    } catch(err) {
        console.log(err);
        res.status(500).send('Something went wrong')
    }
})

app.get('/posts/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const requestedData = await makeExternalApiCall(`posts/${id}`);
        res.json(requestedData);
    } catch(err) {
        console.log(err);
        res.status(500).send('Something went wrong')
    }
})

app.get('/posts/:id/comments', async (req, res) => {
    const {id} = req.params;
    try {
        const requestedData = await makeExternalApiCall(`posts/${id}/comments`);
        res.json(requestedData);
    } catch(err) {
        console.log(err);
        res.status(500).send('Something went wrong')
    }
})

app.get('*', (req, res) => {
	res.status(404).send("Not found. Please Enter correct path")
})

app.listen(1338, () => {
	console.log('Server listening on port 1338')
})

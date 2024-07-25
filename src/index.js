const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = 1337;

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'https://localhost:3000',
}));

app.get('/', (req, res) =>{
    res.json({
        message: 'Hello, world'
    });
})

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});



app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
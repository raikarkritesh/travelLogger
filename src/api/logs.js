const {Router} = require('express');
const LogEntry = require('../model/logEntry');

const router = Router();

router.get('/', async(req, res, next) => {
    try{
        const entries = await LogEntry.find();
        res.json(entries);
    }catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try{
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    }catch(error){
        next(error);
    }
});

module.exports = router;

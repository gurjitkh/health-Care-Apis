const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConnection = require('./database');


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

//POST SINGLE patient
app.post('/patient', (req, res, next) => {
    let patient = req.body.data;
    if(!patient){
        return res.status(400).send({error: true, message: 'Please provide patient'});
    }

    dbConnection.query('INSERT INTO patients (name, phone_number, disease_type) VALUES (?,?,?)',patient, (err, result, fields) => {
        if(err) throw err;
        return res.send({error: false, data: result, message: 'New patient created successfully!'});
    });
});

//DELETE SINGLE patient
app.delete('/patient', (req, res, next) => {
    let patientId = req.body.id;
    if(!patientId){
        return res.status(400).send({error: true, message: 'Please provide a patient id'});
    }

    dbConnection.query('DELETE FROM patients WHERE id = ?', patientId, (err, result, fields) => {
        if(err) throw err;
        return res.send({error: false, data: result, message:'patient has been updated successfully'});
    });

});



//UPDATE SINGLE patient
app.put('/patient', (req, res, next) => {
    let patientId = req.body.id;
    let patient = req.body.patient;
    if(!patientId || !patient){
        return res.status(400).send({error: true, message: 'Please provide a patient id'});
    }

    dbConnection.query('UPDATE patients SET patient = ? WHERE id = ?', [patient, patientId], (err, result, fields) => {
        if(err) throw err;
        return res.send({error: false, data: result, message:'patient has been updated successfully'});
    });

});



//GET SINGLE patient
app.get('/patient/:id', (req,res,next) => {
    let patientId = req.params.id;
    dbConnection.query('SELECT * FROM patients WHERE id=?', patientId, (err, result, fields) => {
        if(err) throw err;
        return res.send({error: false, data: result, message:'single patient'});
    });
})

//GET route
app.get('/patients', (req, res, next) => {
    dbConnection.query('SELECT * FROM patients', (err, result, fields) =>{
        if(err) throw err;
        return res.send({error: false, data: result, message:"patients list"});
    });
});



//DEFAULT route
app.get('/',(req, res, next) => {
    return res.send({error: false, message:'Default Page'});
});

dbConnection.connect((err) => {
    if(err){
       return console.log(err);
    }

    console.log('connected as id: ' + dbConnection.threadId);
    app.listen(3001,() => {
        console.log("Server is running at localhost:3001");
    });
});



module.exports = app;
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: './upload'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/photo',express.static('upload'));

app.get('/',(req,res) => {
    res.send('server on');
})

app.get('/api/test', (req,res) => {
    db.query("select * from matzip", (err,data) => {
        if (!err) {
            //let blobObject  = new Blob([data.photo]);
            //console.log(data[0].photo);
            res.send(data);
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

//multer필요한듯
app.post('/api/insertItem', upload.single('photo'), (req,res) => {
    let sql = "insert into matzip(name, location, description, photo) values(?,?,?,?)";
    //console.log(req.body);
    //console.log(req.file);
    let name = req.body.name;
    let location = req.body.location;
    let description = req.body.description;
    //let photo = req.body.photo;
    let photo = fs.readFileSync(req.file.path);
    let params = [name, location, description, photo];
    console.log(params);
    console.log(req.body);
    console.log(req.file);
    db.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })
})

app.listen(PORT, () => {
    console.log('listen~');
})
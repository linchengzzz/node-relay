const express = require('express');
const bodyParser = require('body-parser');
const superagent = require('superagent');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/get', (req, res) => {
    const data = req.query;
    const cookie = req.headers.cookie;
    if (data.api === '' || data.api === undefined) {
        res.json({'msg': '请填写Api'});
        return void 0;
    }
    const superReq = superagent.get(data.api);
    superReq.set({
        'Accept': data.Accept || 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Cookie': cookie || '',
    });
    data.datas && superReq.query(data.datas);
    superReq.end((err, _res) => {
        if (err) {
            res.json({'msg': 'error'})
        } else {
            res.send(_res.text);
        }
    })
});

app.listen(8888, () => {
    console.log('Server start,listen to http://localhost:8888');
});

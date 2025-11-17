const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname,'../frontend')));

app.post('/api/save', (req,res)=>{ console.log(req.body); res.json({ok:true,saved:req.body}); });
app.post('/api/load', (req,res)=>{ res.json({ok:true,data:{coins:500,animals:['rabbit']}}); });
app.post('/api/purchase', (req,res)=>{ res.json({ok:true,purchase:'ok'}); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('Server listening', PORT));
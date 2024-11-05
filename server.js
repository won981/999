   // server.js
   const express = require('express');
   const bodyParser = require('body-parser');
   const cors = require('cors');

   const app = express();
   const PORT = 5001;

   app.use(cors());
   app.use(bodyParser.json());

   let data = []; // 데이터를 저장할 배열

   // 데이터 가져오기
   app.get('/data', (req, res) => {
       res.json(data);
   });

   // 데이터 추가
   app.post('/data', (req, res) => {
       data.push(req.body);
       res.status(201).send();
   });

   // 데이터 삭제
   app.delete('/data/:id', (req, res) => {
       data = data.filter(item => item.id !== req.params.id);
       res.status(204).send();
   });

   app.listen(PORT, () => {
       console.log(`서버가 ${PORT}에서 실행 중입니다.`);
   });
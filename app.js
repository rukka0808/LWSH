const express = require('express');
const dotenv = require('dotenv');                   // 환경변수 (.env)를 사용하기 위한 모듈
const path = require('path');

dotenv.config();
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

const app = express();                              // 서버 연결(8001 포트)
app.set('port', process.env.PORT || 8001);

app.use('/', indexRouter);                          // 대문 라우터
app.use('/login', loginRouter);                     // 로그인 라우터

app.use((req, res, next) => {                       // 에러 처리
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {                  // 에러 처리
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
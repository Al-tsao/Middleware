// app.js
const express = require('express')
const app = express()
const port = 3000




// request function middleware (first middleware)
app.use(function (req, res, next) {
  // 請求的時間
  const requestTimestamp = new Date(Date.now())

  // 請求的url
  const currentRouter = req.originalUrl

  // 請求的方法
  const method = req.method

  const YYYY = requestTimestamp.getFullYear()
  const MM = requestTimestamp.getMonth() + 1 // Month starts at 0
  const DD = requestTimestamp.getDate()
  const hr = requestTimestamp.getHours()
  const min = requestTimestamp.getMinutes()
  const sec = requestTimestamp.getSeconds()

  // 輸出字串
  const startTimeOutPrint = `${YYYY}-${MM}-${DD} ${hr}:${min}:${sec}`

  // 送出的時間
  const responseTimestamp = new Date(Date.now())

  // 花費時間
  const totaltime = responseTimestamp - requestTimestamp

  // log start time
  console.log(`${startTimeOutPrint} | ${method} from ${currentRouter} | total time: ${totaltime}ms`)

  // 結束 middleware 
  next()

})



// 路由設定 (second and the last middleware)

// 這邊因為沒response一個完整的html結構，瀏覽器會預設自己去找 /favicon.ico檔案，以至於 double request
// --> 所以給 browser 一個 site icon data 防止瀏覽器重複送出請求
const iconData = '<link rel="icon" href="data:,">'

app.get('/', (req, res) => {
  res.send(iconData + '列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send(iconData + '新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send(iconData + '顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send(iconData + '新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

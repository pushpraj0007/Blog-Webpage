const express = require('express')
const path = require("path");
const mongoose = require('mongoose')
const Article = require('./models/post')
const articleRouter = require('./routes/posts')
const methodOverride = require('method-override')
const app = express()

const port = process.env.port || 8080;
mongoose.connect('mongodb+srv://pushpraj3400:hrw6nJdFB0rxkO3Q@pushpraj7.ytttydr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
}).then(()=>{
  console.log("MongoDB Connected Successfully");
}).catch((e)=>{
  console.log("MongoDB Connection Failed");
})

const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port,()=>{
  console.log(`App is listenening on ${port}`);
})
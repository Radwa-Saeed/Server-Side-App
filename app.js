const express = require('express'); 
const connection = require('./configDB/config');
const userRouter = require('./modules/users/routes/userRoutes');
const postRouter = require('./modules/posts/routes/postRoutes');
const adminRouter = require('./modules/admin/routes/adminRoutes');
const advRouter = require('./modules/adv/routes/advRoutes');
require ('dotenv').config();
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(postRouter)
app.use(adminRouter)
app.use(advRouter)


connection();
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
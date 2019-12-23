const [{ Server: h1 }, x] = [require('http'), require('express')];
const bodyParser = require('body-parser');

const Router = x.Router();
const PORT = 4321;
const { log } = console;
const hu = { 'Content-Type': 'text/html; charset=utf-8' };
const app = x();
Router
  .route('/')
  .get(r => r.res.end('Привет мир!'))
  .post(r =>r.res.json({"Result": r.body.x * r.body.y}));
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/', Router)
  .get('/hi', r => r.res.send('Hello to you!'))
  .use(({ res: r }) => r.status(404).end('Пока нет!'))
  .use((e, r, rs, n) => rs.status(500).end(`Ошибка: ${e}`))
  .set('x-powered-by', false);
module.exports = h1(app)
  .listen(process.env.PORT || PORT, () => log(process.pid));

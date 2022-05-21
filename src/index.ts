import express from 'express';
import path from 'path';
import hbs from 'hbs';
import logger from './middleware/logging.middleware';
import web from './routes/web/web.route';
import api from './routes/api/api.route';

const app = express();
const port = process.env.Port || 3000;

const publicPath = path.join(__dirname, '../public');
const layoutPath = path.join(__dirname, '../views/layout');

app.set('view engine', 'hbs');

app.use(express.static(publicPath));
hbs.registerPartials(layoutPath);

app.use('/', logger, web);
app.use('/api', api);

app.use('/*', (req, res) => {
  res.status(404).render('pages/notFound');
});

app.listen(port, () =>
  console.log(`App listening on port http://localhost:${port} !`)
);

export default app;

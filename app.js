import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db/sequelize.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import User from './models/user.model.js';
import Company from './models/company.model.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

const port = process.env.PORT;

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON data' });
  }
  next();
});

app.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Company, as: 'company', attributes: ['name'] }],
    });

    res.render('index', { users: users });
  } catch (error) {
    return res.status(500).json('Server error.');
  }
});

sequelize
  .sync()
  .then(() => {
    console.log('Baza podataka je sinhronizovana');
  })
  .catch((error) => {
    console.error('Greška prilikom sinhronizacije baze podataka:', error);
  });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

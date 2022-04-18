import express from 'express';
import userRoutes from './src/user/user.routes';

const port = 4000;
const app = express();

async function startServer() {
  try {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization'
      );
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header('Access-Control-Expose-Headers', 'Content-Range');
      next();
    });
    app.use('/users', userRoutes);
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
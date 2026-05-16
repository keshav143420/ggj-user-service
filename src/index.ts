import 'reflect-metadata';
import { setupApp } from './app';

const PORT = process.env.PORT || 3000;

setupApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router/app';
import cors from 'cors';

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({})

const main = async () => {
  const app = express();
  app.use(cors());
  const port = 8080;

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.listen(port, () => {
    console.log(`api-server listening at http://localhost:${port}`);
  });
};

main();

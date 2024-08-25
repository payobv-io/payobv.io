import { PrismaClient, RepositoryUserRole } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient({ log: ['query'] });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export { db, RepositoryUserRole };

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;

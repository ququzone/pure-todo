import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'TodoAppDB';
const DB_VERSION = 1;

export const STORE_NAME = 'todos';

let dbInstance: IDBPDatabase | null = null;

export async function getDB(): Promise<IDBPDatabase> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        });
        store.createIndex('category', 'category');
        store.createIndex('priority', 'priority');
      }
    },
  });

  return dbInstance;
}

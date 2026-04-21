import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'TodoAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'todos';

export async function initDB(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('category', 'category');
        store.createIndex('priority', 'priority');
      }
    },
  });
}

export async function getDB(): Promise<IDBPDatabase> {
  return initDB();
}

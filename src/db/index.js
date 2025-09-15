import * as SQLite from 'expo-sqlite';

let db;

export const initDb = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('novastore.db');
    }
}

export const initSessionTable = async () => {
    await initDb();
    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS session (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                localId TEXT,
                email TEXT NOT NULL,
                token TEXT NOT NULL
            );
        `);
}

export const saveSession = async (localId, email) => {
    await initDb();
    await db.runAsync('DELETE FROM session;');
    await db.runAsync('INSERT INTO session (localId, email) VALUES (?, ?);', [localId, email]);
}

export const getSession = async () => {
    await initDb();
    const result = await db.getAllAsync('SELECT * FROM session LIMIT 1;');
    return result.length > 0 ? result[0] : null;
}

export const clearSession = async () => {
    await initDb();
    await db.runAsync('DELETE FROM session;');
}


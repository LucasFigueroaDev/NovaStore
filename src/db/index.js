import * as SQLite from 'expo-sqlite';

let db;

export const initDb = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('novastore.db');
    }
}

export const initSessionTable = async () => {
    try {
        await initDb();
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS session (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                localId TEXT,
                email TEXT NOT NULL
            );
        `);
    } catch (error) {
        console.log(error);
    }
}

export const saveSession = async (localId, email, image) => {
    await initDb();
    await db.runAsync('DELETE FROM session;');
    await db.runAsync('INSERT INTO session (localId, email, image) VALUES (?, ?, ?);', [localId, email, image]);
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


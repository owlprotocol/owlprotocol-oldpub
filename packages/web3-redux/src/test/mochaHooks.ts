import { JSDOM } from 'jsdom';
// db.ts
import Dexie from 'dexie';
//@ts-ignore
import setGlobalVars from 'indexeddbshim';
import { getDB as getCrudReduxDB } from '@owlprotocol/crud-redux'
import { getDB } from '../db.js';

const beforeAll = async () => {
    const { window } = new JSDOM('', { url: 'http://localhost:8080' });
    //@ts-ignore
    //global.window = global; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
    setGlobalVars(window, { checkOrigin: false, memoryDatabase: '' }); // See signature below
    const { indexedDB, IDBKeyRange } = window;
    //@ts-expect-error
    global.window = window;
    global.document = window.document;
    Dexie.dependencies.indexedDB = indexedDB;
    Dexie.dependencies.IDBKeyRange = IDBKeyRange;
    //@ts-expect-error
    Dexie.debug = true;
};

const beforeEach = async () => {
    const dbCrudRedux = getCrudReduxDB()
    const db = getDB();
    await Promise.all([db.clear(), dbCrudRedux.clear()]);
};

const afterAll = async () => {
    console.debug('Tests finished.');
};

const afterEach = async () => {
    const dbCrudRedux = getCrudReduxDB()
    const db = getDB();
    await Promise.all([db.clear(), dbCrudRedux.clear()]);
};

export const mochaHooks = {
    beforeAll,
    beforeEach,
    afterAll,
    afterEach,
};

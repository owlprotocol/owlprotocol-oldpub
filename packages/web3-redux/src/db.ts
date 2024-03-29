// db.ts
import Dexie, { Table } from 'dexie';
import { REDUX_ROOT } from './common.js';

import { _4ByteSignature, _4ByteIndex } from './4byte/model/index.js';
import { AssetPicker, AssetPickerIndex } from './assetpicker/model/index.js';
import { BlockTransaction, BlockIndex } from './block/model/index.js';
import { Config, ConfigIndex } from './config/model/index.js';
import { Contract, ContractIndex } from './contract/model/index.js';
import { ContractEvent, ContractEventIndex } from './contractevent/model/index.js';
import { ContractEventQuery, ContractEventQueryIndex } from './contracteventquery/model/index.js';
import { ContractSend, ContractSendIndex } from './contractsend/model/index.js';
import { EthCall, EthCallIndex } from './ethcall/model/index.js';
import { HTTPCache, HTTPCacheIndex } from './http/model/index.js';
import { Ipfs, IpfsIndex } from './ipfs/model/index.js';
import { Network, NetworkIndex } from './network/model/index.js';
import { Sync, SyncIndex } from './sync/model/index.js';
import { Transaction, TransactionIndex } from './transaction/model/index.js';
import { ContractInterface, ContractInterfaceIndex } from './contractinterface/model/index.js';
import { NFTGenerativeCollection, NFTGenerativeCollectionIndex } from './nftgenerativecollection/model/index.js';
import { NFTGenerativeItem, NFTGenerativeItemIndex } from './nftgenerativeitem/model/index.js';

import { name as _4ByteName } from './4byte/common.js';
import { name as AssetPickerName } from './assetpicker/common.js'
import { name as BlockName } from './block/common.js';
import { name as ConfigName } from './config/common.js';
import { name as ContractName } from './contract/common.js';
import { name as ContractEventName } from './contractevent/common.js';
import { name as ContractEventQueryName } from './contracteventquery/common.js';
import { name as ContractSendName } from './contractsend/common.js';
import { name as EthCallName } from './ethcall/common.js';
import { name as HTTPCacheName } from './http/common.js';
import { name as IPFSCacheName } from './ipfs/common.js';
import { name as NetworkName } from './network/common.js';
import { name as SyncName } from './sync/common.js';
import { name as TransactionName } from './transaction/common.js';
import { name as ContractInterfaceName } from './contractinterface/common.js';

import { name as NFTGenerativeCollectionName } from './nftgenerativecollection/common.js';
import { name as NFTGenerativeItemName } from './nftgenerativeitem/common.js';

import isClient from './utils/isClient.js';

export class Web3ReduxDexie extends Dexie {
    [_4ByteName]!: Table<_4ByteSignature>;
    [AssetPickerName]!: Table<AssetPicker>
    [BlockName]!: Table<BlockTransaction>;
    [ConfigName]!: Table<Config>;
    [ContractName]!: Table<Contract>;
    [ContractEventName]!: Table<ContractEvent>;
    [ContractEventQueryName]!: Table<ContractEventQuery>;
    [ContractSendName]!: Table<ContractSend>;
    [ContractInterfaceName]!: Table<ContractInterface>;
    [EthCallName]!: Table<EthCall>;
    [HTTPCacheName]!: Table<HTTPCache>;
    [IPFSCacheName]!: Table<Ipfs>;
    [NetworkName]!: Table<Network>;
    [SyncName]!: Table<Sync>;
    [TransactionName]!: Table<Transaction>;
    //Abstractions
    [NFTGenerativeCollectionName]!: Table<NFTGenerativeCollection>;
    [NFTGenerativeItemName]!: Table<NFTGenerativeItem>;

    constructor() {
        super(REDUX_ROOT);
        this.version(1).stores({
            [_4ByteName]: _4ByteIndex,
            [AssetPickerName]: AssetPickerIndex,
            [BlockName]: BlockIndex,
            [ConfigName]: ConfigIndex,
            [ContractName]: ContractIndex,
            [ContractEventName]: ContractEventIndex,
            [ContractEventQueryName]: ContractEventQueryIndex,
            [ContractSendName]: ContractSendIndex,
            [ContractInterfaceName]: ContractInterfaceIndex,
            [EthCallName]: EthCallIndex,
            [HTTPCacheName]: HTTPCacheIndex,
            [IPFSCacheName]: IpfsIndex,
            [NetworkName]: NetworkIndex,
            [SyncName]: SyncIndex,
            [TransactionName]: TransactionIndex,
            [NFTGenerativeCollectionName]: NFTGenerativeCollectionIndex,
            [NFTGenerativeItemName]: NFTGenerativeItemIndex,
        });
    }

    async clear() {
        const promises = [
            this[_4ByteName].clear(),
            this[AssetPickerName].clear(),
            this[BlockName].clear(),
            this[ConfigName].clear(),
            this[ContractName].clear(),
            this[ContractEventName].clear(),
            this[ContractSendName].clear(),
            this[ContractInterfaceName].clear(),
            this[EthCallName].clear(),
            this[HTTPCacheName].clear(),
            this[IPFSCacheName].clear(),
            this[NetworkName].clear(),
            this[SyncName].clear(),
            this[TransactionName].clear(),
            this[NFTGenerativeCollectionName].clear(),
            this[NFTGenerativeItemName].clear(),
        ];
        return Promise.all(promises);
    }
}

let db: Web3ReduxDexie;
interface GetDBOptions {
    fake: boolean;
}

export function setDB(newDb: Web3ReduxDexie) {
    db = newDb;
}

export function getDB(options?: GetDBOptions) {
    if (db) return db;
    db = createDB(options);
    return db;
}

export function createDB(options?: GetDBOptions) {
    if (!isClient() || options?.fake) {
        console.debug('Creating Dexie with fake-indexeddb');
    } else {
        console.debug('Creating Dexie with real indexeddb');
    }
    return new Web3ReduxDexie();
}

export default getDB;

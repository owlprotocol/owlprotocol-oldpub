/**
 * EVM smart contract module.
 * Used to query balances, call smart contracts, send transactions and sync events.
 * Common pre-configured abstractions include ERC20, ERC721, ERC1155, and ERC165.
 * @module Contract
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import * as Sagas from './sagas/index.js';
import * as Hooks from './hooks/index.js';

export const Contract = {
    name: CRUDModel.name,
    enums: {
        DeployType: Actions.DeployType
    },
    actions: {
        ...CRUDModel.actions,
        call: Actions.call,
        callBatched: Actions.callBatched,
        callSynced: Actions.callSynced,
        deploy: Actions.deployAction,
        eventGetPast: Actions.eventGetPast,
        eventGetPastRaw: Actions.eventGetPastRawAction,
        eventSubscribe: Actions.eventSubscribe,
        fetchAbi: Actions.fetchAbi,
        fetchTransactions: Actions.fetchTransactions,
        getBalance: Actions.getBalance,
        getCode: Actions.getCode,
        getNonce: Actions.getNonce,
        getNonceSynced: Actions.getNonceSynced,
        getSupportsInterface: Actions.getSupportsInterface,
        send: Actions.send,
    },
    actionTypes: CRUDModel.actionTypes,
    db: CRUDModel.db,
    hooks: {
        ...CRUDModel.hooks,
        useContractURI: Hooks.useContractURI,
        useContract: Hooks.useContract,
        useContractCall: Hooks.useContractCall,
        useContractSend: Hooks.useContractSend,
        useDeploy: Hooks.useDeploy,
        useERC20: Hooks.useERC20,
        useERC20Approval: Hooks.useERC20Approval,
        useERC20BalanceOf: Hooks.useERC20BalanceOf,
        useERC20Transfer: Hooks.useERC20Transfer,
        useERC165: Hooks.useERC165,
        useERC721: Hooks.useERC721,
        useERC721Approval: Hooks.useERC721Approval,
        useERC721OwnerOf: Hooks.useERC721OwnerOf,
        useERC721IsApprovedForAll: Hooks.useERC721IsApprovedForAll,
        useERC721GetApproved: Hooks.useERC721GetApproved,
        useERC721TokenIds: Hooks.useERC721TokenIds,
        useERC721TokenURI: Hooks.useERC721TokenURI,
        useERC721TotalSupply: Hooks.useERC721TotalSupply,
        useERC721Transfer: Hooks.useERC721Transfer,
        useERC721DnaGetDna: Hooks.useERC721DnaGetDna,
        useERC721TopDownChildTokenIdOf: Hooks.useERC721TopDownChildTokenIdOf,
        useERC721TopDownChildTokenIdsOf: Hooks.useERC721TopDownChildTokenIdsOf,
        useERC721TopDownGetChildContracts: Hooks.useERC721TopDownGetChildContracts,
        useERC721TopDownParentTokenIdOf: Hooks.useERC721TopDownParentTokenIdOf,
        useERC721TopDownRootOwnerOf: Hooks.useERC721TopDownRootOwnerOf,
        useGenerativeCollection: Hooks.useGenerativeCollection,
        useGenerativeItem: Hooks.useGenerativeItem,
        useERC1155: Hooks.useERC1155,
        useERC1155BalanceOf: Hooks.useERC1155BalanceOf,
        useERC1155TokenURI: Hooks.useERC1155TokenURI,
        useERC1155TransferBatch: Hooks.useERC1155TransferBatch,
        useERC1155TransferSingle: Hooks.useERC1155TransferSingle,
        useEvents: Hooks.useEvents,
        useFetchAbi: Hooks.useFetchAbi,
        useFetchTransactions: Hooks.useFetchTransactions,
        useGetBalance: Hooks.useGetBalance,
        useGetCode: Hooks.useGetCode,
        useGetNonce: Hooks.useGetCode,
        useSupportsInterface: Hooks.useSupportsInterface,
        useGetTags: Hooks.useGetTags,
        useForNetworkId: Hooks.useForNetworkId,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga: Sagas.rootSaga,
        call: Sagas.callSaga,
        send: Sagas.sendSaga,
    },
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};

export default Contract;

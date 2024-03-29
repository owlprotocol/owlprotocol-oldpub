//@ts-nocheck
import { assert } from 'chai';
// eslint-disable-next-line prettier/prettier
import { Provider } from 'react-redux';
import Web3 from 'web3';
import { renderHook } from '@testing-library/react-hooks';

import { useERC1155 } from './useERC1155.js';
import { getWeb3Provider, expectThrowsAsync } from '../../../test/index.js';

import { name } from '../../common.js';
import { ADDRESS_0, networkId } from '../../../test/data.js';
import { createStore, StoreType } from '../../../store.js';
import ContractEventCRUD from '../../../contractevent/crud.js';
import BlockCRUD from '../../../block/crud.js';
import TransactionCRUD from '../../../transaction/crud.js';
import NetworkCRUD from '../../../network/crud.js';

import * as Contracts from '@owlprotocol/contracts';

describe(`${name}/hooks/useERC1155.test.tsx`, () => {
    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: ERC1155PresetMinterPauser;
    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = (await new web3.eth.Contract(Artifacats.IERC1155.abi as any)
            .deploy({
                arguments: ['http://example.com/{id}'],
                data: ERC1155PresetMinterPauserArtifact.bytecode,
            })
            .send({ from: accounts[0], gas: 4000000, gasPrice: '875000000' })) as unknown as ERC1155PresetMinterPauser;
        address = web3Contract.options.address;

        await web3Contract.methods
            .mint(accounts[0], '0', 1, '0x')
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useERC1155()', async () => {
        it('default', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useERC1155(networkId, address, accounts[0], '0'), {
                wrapper,
            });

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            //await waitForNextUpdate(); //totalSupply
            await waitForNextUpdate(); //uri
            await waitForNextUpdate(); //balanceOf
            assert.equal(result.all.length, 4, 'result.all.length');

            const value = result.current;
            //assert.equal(value.totalSupply, 1, 'totalSupply');
            assert.equal(value.uri, 'http://example.com/0', 'uri');
            assert.equal(value.balanceOf, '1', 'balanceOf');

            assert.deepEqual(value.TransferFrom, [], 'TransferFrom');
            assert.deepEqual(value.TransferTo, [], 'TransferTo');

            assert.equal(result.all.length, 4, 'result.all.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        describe('Transfer', () => {
            //Sync new transfer events
            it('sync', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC1155(networkId, address, accounts[0], '0', { TransferEventsOptions: { sync: true } }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //uri
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 4, 'result.all.length');

                //Mint function emits Transfer event with to = <accounts[0]>
                web3Contract.methods
                    .mint(accounts[0], '0', 1, '0x')
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                await waitForNextUpdate(); //update events

                const value = result.current;
                assert.equal(value.TransferFrom!.length, 0, 'TransferFrom');
                assert.equal(value.TransferTo!.length, 1, 'TransferTo');

                assert.equal(result.all.length, 5, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
            //Get past Transfer events
            it('past', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC1155(networkId, address, accounts[0], '0', { TransferEventsOptions: { past: true } }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //uri
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 4, 'result.all.length');
                await waitForNextUpdate(); //past Transfer events

                const value = result.current;
                assert.equal(value.TransferFrom!.length, 0, 'TransferFrom');
                assert.equal(value.TransferTo!.length, 1, 'TransferTo');

                assert.equal(result.all.length, 5, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
        });
        describe('balancOf', () => {
            it('Transaction', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC1155(networkId, address, accounts[0], '0', { balanceOf: 'Transaction' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //uri
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 4, 'result.all.length');

                await web3Contract.methods
                    .mint(accounts[0], '0', 1, '0x')
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                //Create transaction, triggering a refresh
                store.dispatch(
                    TransactionCRUD.actions.create({
                        networkId,
                        hash: '0x1',
                        from: accounts[0],
                        to: address,
                    }),
                );

                await waitForNextUpdate(); //balanceOf gets updated by detecting new transaction

                const value = result.current;
                assert.equal(value.balanceOf, '2', 'balanceOf'); //updated balance

                assert.equal(result.all.length, 5, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
            it('Block', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC1155(networkId, address, accounts[0], '0', { balanceOf: 'Block' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //uri
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 4, 'result.all.length');

                await web3Contract.methods
                    .mint(accounts[0], '0', 1, '0x')
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                //Create block, triggering a refresh
                store.dispatch(
                    BlockCRUD.actions.create({
                        networkId,
                        number: 1,
                    }),
                );
                await waitForNextUpdate();

                const value = result.current;
                assert.equal(value.balanceOf, '2', 'balanceOf'); //updated balance
                assert.equal(result.all.length, 5, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
            it('onTransfer', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC1155(networkId, address, accounts[0], '0', { balanceOf: 'onTransfer' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //uri
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 4, 'result.all.length');

                await web3Contract.methods
                    .mint(accounts[0], '0', 1, '0x')
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                //Create event, triggering a refresh
                store.dispatch(
                    ContractEventCRUD.actions.create({
                        networkId,
                        address,
                        blockNumber: 1,
                        blockHash: '0x1',
                        logIndex: 0,
                        name: 'TransferSingle',
                        returnValues: { from: ADDRESS_0, to: accounts[0], id: '0', amount: 1 },
                    }),
                );
                //Synchronous update to TransferTo events
                assert.equal(result.all.length, 5, 'result.all.length');
                await waitForNextUpdate();

                const value = result.current;
                assert.equal(value.balanceOf, '2', 'balanceOf'); //updated balance
                assert.equal(result.all.length, 6, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
        });
    });
});

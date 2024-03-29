import { assert } from 'chai';
import * as Contracts from '@owlprotocol/contracts';
import {
    getInterfaceIdentifierForAbi,
    getFunctionIdentifier,
    hexTo4ByteBinary,
    binaryTo4ByteHex,
    xor,
    getInterfaceIdentifier,
    get4ByteIdentifier,
} from './getInterfaceIdentifier.js';
import { AbiItem } from '../utils/web3-utils/index.js';

import {
    Artifacts
} from '@owlprotocol/contracts';

describe('getInterfaceIdentifierForAbi', () => {
    it('ERC165', () => {
        assert.equal(getInterfaceIdentifierForAbi(Contracts.Artifacts.IERC165.abi as AbiItem[]), '01ffc9a7');
    });

    it('ERC721Enumerable', () => {
        assert.equal(getInterfaceIdentifierForAbi(Contracts.Artifacts.IERC20Metadata.abi as AbiItem[]), 'bfc4c1ea'); // '780e9d63');
    });

    it('ERC721Metadata', () => {
        assert.equal(getInterfaceIdentifierForAbi(Contracts.Artifacts.IERC721Metadata.abi as AbiItem[]), '9c944f16'); // '5b5e139f');
    });
});

describe('getFunctionIdentifier', () => {
    it('supportsInterface', () => {
        const abi = (Contracts.Artifacts.IERC165.abi as AbiItem[]).find((a) => a.name === 'supportsInterface');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        assert.equal(getFunctionIdentifier(abi!), '0x01ffc9a7');
    });

    it('tokenByIndex', () => {
        const abi = (Contracts.Artifacts.IERC721Enumerable.abi as AbiItem[]).find((a) => a.name === 'tokenByIndex');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        assert.equal(getFunctionIdentifier(abi!), '0x4f6ccce7');
    });

    it('name', () => {
        const abi = (Contracts.Artifacts.IERC721Metadata.abi as AbiItem[]).find((a) => a.name === 'name');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        assert.equal(getFunctionIdentifier(abi!), '0x06fdde03');
    });
});

describe('getInterfaceIdentifier', () => {
    it('ERC165', () => {
        const binFunctionIdentifiers: string[] = ['0x01ffc9a7'];

        assert.equal(getInterfaceIdentifier(binFunctionIdentifiers), '01ffc9a7');
    });

    it('ERC721Enumerable', () => {
        const binFunctionIdentifiers: string[] = ['0x4f6ccce7', '0x2f745c59', '0x18160ddd'];

        assert.equal(getInterfaceIdentifier(binFunctionIdentifiers), '780e9d63');
    });

    it('ERC721Metadata', () => {
        const binFunctionIdentifiers: string[] = ['0x06fdde03', '0x95d89b41', '0xc87b56dd'];

        assert.equal(getInterfaceIdentifier(binFunctionIdentifiers), '5b5e139f');
    });
});

describe('get4ByteIdentifier', () => {
    it('supportsInterface(bytes4)', () => {
        assert.equal(get4ByteIdentifier('supportsInterface(bytes4)'), '0x01ffc9a7');
    });

    it('tokenByIndex(uint256)', () => {
        assert.equal(get4ByteIdentifier('tokenByIndex(uint256)'), '0x4f6ccce7');
    });

    it('tokenOfOwnerByIndex(address,uint256)', () => {
        assert.equal(get4ByteIdentifier('tokenOfOwnerByIndex(address,uint256)'), '0x2f745c59');
    });

    it('totalSupply()', () => {
        assert.equal(get4ByteIdentifier('totalSupply()'), '0x18160ddd');
    });
});

describe('hexTo4ByteBinary', () => {
    it('01ffc9a7', () => {
        assert.equal(hexTo4ByteBinary('01ffc9a7'), '00000001111111111100100110100111');
    });

    it('5b5e139f', () => {
        assert.equal(hexTo4ByteBinary('5b5e139f'), '01011011010111100001001110011111');
    });
});

describe('binaryTo4ByteHex', () => {
    it('00000001111111111100100110100111', () => {
        assert.equal(binaryTo4ByteHex('00000001111111111100100110100111'), '01ffc9a7');
    });

    it('01011011010111100001001110011111', () => {
        assert.equal(binaryTo4ByteHex('01011011010111100001001110011111'), '5b5e139f');
    });
});

describe('xor', () => {
    it('01000101, 1000101', () => {
        assert.equal(xor('01000101', '1000101'), '11001111');
    });

    it('same number', () => {
        assert.equal(xor('100100101010010100010', '100100101010010100010'), '000000000000000000000');
    });
});

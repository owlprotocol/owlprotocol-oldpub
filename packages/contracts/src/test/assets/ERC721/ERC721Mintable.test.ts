import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
//@ts-expect-error
import hre, { ethers } from 'hardhat';
import { ERC721Mintable } from '../../../ethers/types.js';
import deployProxyNick from '../../../deploy-hre/common/DeterministicDeployer.js';
import deployProxyFactory from '../../../deploy-hre/common/ProxyFactory.js';
import deployERC1820 from '../../../deploy-hre/common/ERC1820.js';
import { ERC721MintableInitializeArgs, flattenInitArgsERC721Mintable } from '../../../utils/ERC721Mintable.js';
import { expect, assert } from 'chai';
import { Factories, getFactories } from '../../../ethers/factories.js';
import { getDeterministicInitializeFactories, InitializeFactories } from '../../../ethers/deterministicFactories.js';
import {
    IAccessControlInterfaceId,
    IBaseURIInterfaceId,
    IContractURIInterfaceId,
    IERC165InterfaceId,
    IERC2981InterfaceId,
    IERC2981SetterInterfaceId,
    IERC721Interface,
    IERC721InterfaceId,
    IERC721MetadataInterfaceId,
    IERC721MintableInterfaceId,
    interfaceIdNames,
    IRouterReceiverInterfaceId,
} from '../../../ethers/interfaces.js';
import { registry as registryContract } from '../../../utils/ERC1820.js';
import { sleep } from '../../utils/sleep.js';
import { zip } from 'lodash';

describe('ERC721Mintable', function () {
    let signers: SignerWithAddress[];
    let factories: Factories;
    let deterministicFactories: InitializeFactories;
    let ERC721MintableFactory: typeof deterministicFactories.ERC721Mintable;
    let ERC721Mintable: ERC721Mintable;

    let tokenName = 0;
    let token: ERC721MintableInitializeArgs;

    before(async () => {
        await deployProxyNick(hre as any);
        await deployProxyFactory(hre as any);
        await deployERC1820(hre as any);

        await sleep(1000);

        signers = await ethers.getSigners();
        const signer = signers[0];
        const signerAddress = signer.address;

        factories = getFactories(signer);
        deterministicFactories = getDeterministicInitializeFactories(signer, factories, signerAddress);
        ERC721MintableFactory = deterministicFactories.ERC721Mintable;
    });

    beforeEach(async () => {
        token = {
            admin: signers[0].address,
            contractUri: `token.${tokenName}.com`,
            gsnForwarder: ethers.constants.AddressZero,
            name: `Token ${tokenName}`,
            symbol: `TK${tokenName}`,
            initBaseURI: `token.${tokenName}.com/token`,
            feeReceiver: signers[0].address,
            feeNumerator: 0,
        };
        const initializerArgs = flattenInitArgsERC721Mintable(token);
        ERC721Mintable = await ERC721MintableFactory.deploy(...initializerArgs);

        tokenName++;
    });

    it('name', async () => {
        const result = await ERC721Mintable.name();
        expect(result).to.be.eq(token.name);
    });

    it('symbol', async () => {
        const result = await ERC721Mintable.symbol();
        expect(result).to.be.eq(token.symbol);
    });

    it('baseURI', async () => {
        const result = await ERC721Mintable.baseURI();
        expect(result).to.be.eq(token.initBaseURI);
    });

    it('balanceOf', async () => {
        await ERC721Mintable.mint(signers[0].address, 1);
        const result = await ERC721Mintable.balanceOf(signers[0].address);
        expect(result).to.be.eq(1);
    });

    it('InterfaceImplementerSet', async () => {
        const registry = registryContract.connect(signers[0]);
        const filter = registry.filters.InterfaceImplementerSet(ERC721Mintable.address);
        const events = await registry.queryFilter(filter);
        const interfaceIds = events.map((e) => {
            return e.args.interfaceHash.substring(0, 10);
        });
        const interfaceIdsExpected = [
            IERC165InterfaceId,
            IAccessControlInterfaceId,
            IRouterReceiverInterfaceId,
            IContractURIInterfaceId,
            IBaseURIInterfaceId,
            IERC2981InterfaceId,
            IERC2981SetterInterfaceId,
            IERC721InterfaceId,
            IERC721MetadataInterfaceId,
            IERC721MintableInterfaceId,
        ];
        const results = zip(interfaceIds, interfaceIdsExpected);
        for (const [interfaceId, expected] of results) {
            assert.equal(interfaceId, expected, `${interfaceIdNames[interfaceId!]} != ${interfaceIdNames[expected!]}`);
        }
    });

    it('supportsInterface', async () => {
        const interfaceIds = [
            IERC165InterfaceId,
            IAccessControlInterfaceId,
            IRouterReceiverInterfaceId,
            IContractURIInterfaceId,
            IBaseURIInterfaceId,
            IERC2981InterfaceId,
            IERC2981SetterInterfaceId,
            IERC721InterfaceId,
            IERC721MetadataInterfaceId,
            IERC721MintableInterfaceId,
        ];
        for (const interfaceId of interfaceIds) {
            const supported = await ERC721Mintable.supportsInterface(interfaceId);
            assert.isTrue(supported, `${interfaceId} ${interfaceIdNames[interfaceId]} unsupported!`);
        }
    });

    it('implementsERC165Interface', async () => {
        const registry = registryContract.connect(signers[0]);
        const interfaceIds = [
            IERC165InterfaceId,
            IAccessControlInterfaceId,
            IRouterReceiverInterfaceId,
            IContractURIInterfaceId,
            IBaseURIInterfaceId,
            IERC2981InterfaceId,
            IERC2981SetterInterfaceId,
            IERC721InterfaceId,
            IERC721MetadataInterfaceId,
            IERC721MintableInterfaceId,
        ];
        for (const interfaceId of interfaceIds) {
            const supported = await registry.implementsERC165Interface(ERC721Mintable.address, interfaceId);
            assert.isTrue(supported, `${interfaceId} ${interfaceIdNames[interfaceId]} unsupported!`);
        }
    });
});

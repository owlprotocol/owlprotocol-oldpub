import { mapValues } from '../../../lodash.js';
import { constants } from 'ethers';

import { logDeployment, RunTimeEnvironment } from '../../utils.js';
import { getFactories } from '../../../ethers/factories.js';
import { getDeterministicFactories } from '../../../ethers/deterministicFactories.js';
import { getProxy1167InitializeFactories } from '../../../ethers/proxy1167Factories.js';
import { ERC721MintableInitializeArgs, flattenInitArgsERC721Mintable } from '../../../utils/ERC721Mintable.js';

const deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const deterministicFactories = getDeterministicFactories(signer, factories);
    const proxyFactories = getProxy1167InitializeFactories(signer, deterministicFactories, signerAddress);
    const ERC721MintableFactory = proxyFactories.ERC721Mintable;

    //Contracts
    const deployments: { [key: string]: ERC721MintableInitializeArgs } = {
        test: {
            admin: signerAddress,
            contractUri: '',
            gsnForwarder: constants.AddressZero,
            name: 'test',
            symbol: 'TEST',
            initBaseURI: '',
            feeReceiver: signerAddress,
            feeNumerator: 0,
        },
    };

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC721Mintable(initArgs);
        const address = ERC721MintableFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC721MintableFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC721MintableFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC721MintableFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    await Promise.all(Object.values(promises));

    return mapValues(promises, async (p, k) => {
        const r = await p;
        if (r.error) {
            logDeployment(network.name, k, r.address, 'proxy', 'failed');
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, 'proxy', r.deployed ? 'deployed' : 'exists');
        }
        return r;
    });
};

deploy.tags = ['ERC721Mintable1167Proxy'];
deploy.dependencies = ['Implementations', 'ERC1820'];
export default deploy;

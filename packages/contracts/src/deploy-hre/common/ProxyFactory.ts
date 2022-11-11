import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import ProxyFactory from '../../deploy/common/ProxyFactory.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const { abi, bytecode, deployedBytecode, devdoc, solcInputHash, metadata, storageLayout } =
        await deployments.getExtendedArtifact('ERC1167Factory');

    const cloneFactory = await ProxyFactory({
        provider: ethers.provider,
        //Manual transaction signing requires private key
        signers: [new ethers.Wallet(process.env.PK_0 as string, ethers.provider)],
        //@ts-expect-error
        network,
    });

    const { save } = deployments;
    await save(ProxyFactory.tags[0], {
        address: cloneFactory.address,
        args: [],
        abi,
        bytecode,
        deployedBytecode,
        devdoc,
        solcInputHash,
        metadata,
        storageLayout,
    });

    return cloneFactory;
};

deploy.tags = ProxyFactory.tags;
deploy.dependencies = ProxyFactory.dependencies;
export default deploy;

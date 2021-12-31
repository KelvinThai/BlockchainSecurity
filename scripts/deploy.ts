import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [ deployer ] = await ethers.getSigners();
    console.log('deploy from address: ', deployer.address);

   const Hero = await ethers.getContractFactory("Hero");
   const hero = await Hero.deploy();
   console.log('Car address: ', hero.address);

   Config.setConfig(network +'.Hero', hero.address);


    await Config.updateConfig();
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

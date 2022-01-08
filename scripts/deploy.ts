import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [ deployer ] = await ethers.getSigners();
    console.log('deploy from address: ', deployer.address);

    const STMan = await ethers.getContractFactory("STMan");
   const sTMan = await STMan.deploy();
   console.log('Car address: ', sTMan.address);

   const Hero = await ethers.getContractFactory("Hero");
   const hero = await Hero.deploy();
   console.log('Car address: ', hero.address);

   const Market = await ethers.getContractFactory("HeroMarketplace");
   const market = await Market.deploy(sTMan.address,hero.address);
   console.log('Market address: ', market.address);

   Config.setConfig(network +'.STMan', sTMan.address);
   Config.setConfig(network +'.Hero', hero.address);
   Config.setConfig(network +'.Marketplace', market.address);



    await Config.updateConfig();
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

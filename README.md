# Smartcontract project for StickMan Game

# Requirements
 -  NodeJS
 -  Yarn
 -  Ganache
# Install dependency
`yarn install`

## Create .env file from env.example
Edit private key and Bscscan API 
Private is used for deployments on different network
Bscscan API key is used for deployment and verify contract

## Config network in config folder
Project is already configured for bsc testnet.
If required to deploy on another network, new configurations must be provided in the hardhat.config.ts

```shell
## Compile
`yarn compile`
## Test
`yarn test`
## Deploy
`yarn deploy <network>`
## Verify 
```
yarn hardhat verify --network bsctest 0xCONTRACTADDRESS
```

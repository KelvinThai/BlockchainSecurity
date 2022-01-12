const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Control", () => {
  let deployer, attacker, user;

  beforeEach(async function () {
    [deployer, attacker, user] = await ethers.getSigners();
    const MyPets= await ethers.getContractFactory("MyPets", deployer);
    this.myPets = await MyPets.deploy("Lu");
  });
  describe("My Pets", () => {
    it("Should set dog name at deployment", async function () {
      expect(await this.myPets.MyDog()).to.eq("Lu");
    });

    it("Anyone can change my dog name", async function () {
      await this.myPets.connect(attacker).updateDog("kiki");
      expect(await this.myPets.MyDog()).to.eq("kiki");
    });
  });
})

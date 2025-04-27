const ethers = require("ethers");
const fs = require("fs-extra");

const TEST_HTTP_ADDRESS = "http://127.0.0.1:7545";
const TEST_WALLET_PRIVATE_KEY = "0x67ba4d7a71875ace0204f94474d31427659e69eb2269f2d77d88bc5896f79074";

//HTTP://127.0.0.1:7545
async function main() {
    const { JsonRpcProvider } = require('ethers');
    const provider = new JsonRpcProvider(TEST_HTTP_ADDRESS);

   //const provider = new ethers.providers.JsonRpcProvider(TEST_HTTP_ADDRESS);
   const wallet = new ethers.Wallet(
       TEST_WALLET_PRIVATE_KEY,
       provider);

    const abi = fs.readJsonSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary= fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("deploying contract, please wait...");

    try {
        const contract = await contractFactory.deploy({
            gasLimit: 3000000
        }).then(async() => {const deploymentReceipt = await contract.deploymentTransaction.waitAsync(1);});
        console.log("Contract deployed at:", contract.getAddress());
    } catch (error) {
        console.error("Error during deployment:", error);
        if (error.receipt) {
            console.log("Transaction Receipt:", error.receipt);
        }
    }

}

main()
    .then(() => { process.exit(0); })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
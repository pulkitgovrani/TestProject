// Import required modules
const express = require('express');
const { Client, PrivateKey, AccountId, TokenCreateTransaction, TokenType, TokenSupplyType, ContractExecuteTransaction } = require('@hashgraph/sdk');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(express.json());

// Set up the Hedera client
const client = Client.forTestnet();
client.setOperator(AccountId.fromString(process.env.HEDERA_ACCOUNT_ID), PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY));

// Mock data for volunteer-project matching (Replace with actual DB or logic)
const volunteerProjectMap = {};

// Endpoint to match volunteers with projects
app.post('/match-volunteer', async (req, res) => {
    const { volunteerId, projectId } = req.body;

    // Basic logic to "match" volunteer with project
    if (!volunteerProjectMap[volunteerId]) {
        volunteerProjectMap[volunteerId] = [];
    }
    volunteerProjectMap[volunteerId].push(projectId);

    res.send(`Volunteer ${volunteerId} matched with project ${projectId}`);
});

// Endpoint to reward volunteers
app.post('/reward-volunteer', async (req, res) => {
    const { volunteerId, amount } = req.body;

    try {
        // Interact with the Hedera smart contract to reward the volunteer
        // Here we assume you have a contract deployed on Hedera that manages token rewards

        const contractId = "0.0.xxxxx"; // Replace with your contract ID
        const tx = new ContractExecuteTransaction()
            .setContractId(contractId)
            .setFunction("rewardVolunteer", volunteerId, amount)
            .setGas(3000000)
            .freezeWith(client);

        const signTx = await tx.sign(PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY));
        const submitTx = await signTx.execute(client);
        const receipt = await submitTx.getReceipt(client);

        res.send(`Volunteer ${volunteerId} rewarded with ${amount} tokens. Status: ${receipt.status}`);
    } catch (error) {
        console.error("Error rewarding volunteer:", error);
        res.status(500).send("Failed to reward volunteer.");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

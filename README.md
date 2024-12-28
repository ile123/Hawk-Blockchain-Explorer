# Hawk Blockchain Explorer

A blockchain explorer built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to explore various blockchain data such as blocks, transactions, and wallet addresses. This project fetches real-time blockchain data, displays detailed information, and caches it in a MongoDB database for faster access.

## Features

### 1. **Block Search**
   - **Description**: Users can search for specific blocks by block number or block hash.
   - **Functionality**:
     - View details of a block such as block height, timestamp, miner, and a list of transactions included in the block.
     - Ability to search using either a block number or block hash.

### 2. **Transaction Search**
   - **Description**: Users can search for transactions using transaction IDs.
   - **Functionality**:
     - Display transaction details including sender and receiver(inputs and outputs), amount, transaction status, and the block in which the transaction was included.
     - Users can track transactions by ID and view detailed information like gas fees, value transfers, etc.

### 3. **Wallet Address Lookup**
   - **Description**: Users can look up wallet addresses to view associated transaction histories and balances.
   - **Functionality**:
     - Display balance of the wallet.
     - View a detailed list of transactions sent and received by the wallet.

### 4. **Network Overview**
   - **Description**: Provides an overview of the blockchain network, such as the latest block, the number of transactions, and hash rate.
   - **Functionality**:
     - Displays the latest block number and block hash.
     - Show the number of transactions on the blockchain.
     - Real-time hash rate and network health statistics.

### 5. **Security Features**
   - **Description**: Authentication and authorization system.
   - **Functionality**:
     - Registration and login system.
     - Secure endpoints to prevent unauthorized access.
     - Previously searched transactions, wallets and block will be saved and displayed.
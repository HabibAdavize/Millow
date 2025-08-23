# Millow - Real Estate NFT Marketplace

A decentralized real estate marketplace built on Ethereum where properties are represented as NFTs and transactions are handled through smart contract escrow.

## 🏠 Features

- **Property NFTs**: Real estate properties minted as ERC-721 tokens
- **Smart Contract Escrow**: Secure property transactions with multi-party approval
- **Role-Based System**: Buyer, Seller, Inspector, and Lender roles
- **MetaMask Integration**: Connect wallet to buy, sell, and manage properties
- **IPFS Metadata**: Property details and images stored on IPFS
- **Responsive UI**: Modern React interface for seamless user experience

## 🛠 Technology Stack

- **Smart Contracts**: Solidity
- **Frontend**: React.js, Ethers.js
- **Development**: Hardhat, Node.js
- **Testing**: Chai, Mocha
- **Storage**: IPFS for metadata
- **Wallet**: MetaMask integration

## 📋 Requirements

- [Node.js](https://nodejs.org/en/) (v16+ recommended)
- [MetaMask](https://metamask.io/) browser extension
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/millow.git
cd millow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Tests
```bash
npx hardhat test
```

### 4. Start Local Blockchain
```bash
npx hardhat node
```

### 5. Deploy Contracts
In a separate terminal:
```bash
npx hardhat run ./scripts/deploy.js --network localhost
```

### 6. Configure MetaMask
- Add Localhost network:
  - Network Name: `Localhost 8545`
  - RPC URL: `http://localhost:8545`
  - Chain ID: `31337`
  - Currency Symbol: `ETH`

### 7. Start Frontend
```bash
npm run start
```

Visit `http://localhost:3000` to use the application.

## 📁 Project Structure

```
millow/
├── contracts/           # Smart contracts
│   ├── RealEstate.sol  # NFT contract for properties
│   └── Escrow.sol      # Escrow contract for transactions
├── scripts/            # Deployment scripts
├── test/               # Contract tests
├── src/                # React frontend
│   ├── components/     # React components
│   ├── abis/          # Contract ABIs
│   └── config.json    # Contract addresses
└── metadata/          # Property metadata (IPFS)
```

## 🔧 Smart Contracts

### RealEstate.sol
- ERC-721 compliant NFT contract
- Mints property tokens with IPFS metadata
- Handles property ownership transfers

### Escrow.sol
- Multi-signature escrow system
- Requires approval from buyer, seller, inspector, and lender
- Handles earnest money deposits and final payments
- Supports inspection and lending workflows

## 🎯 How It Works

1. **Property Listing**: Seller mints property as NFT and lists it in escrow
2. **Property Purchase**: Buyer deposits earnest money and approves purchase
3. **Inspection**: Inspector approves property condition
4. **Financing**: Lender approves and provides remaining funds
5. **Sale Completion**: All parties approve, funds transfer, NFT ownership changes

## 🧪 Testing

Run the complete test suite:
```bash
npx hardhat test
```

Tests cover:
- Contract deployment
- Property listing and purchasing
- Escrow functionality
- Multi-party approval system
- Edge cases and error handling

## 🌐 Deployment

For testnet/mainnet deployment:

1. Update `hardhat.config.js` with network configuration
2. Set environment variables for private keys
3. Deploy: `npx hardhat run scripts/deploy.js --network <network-name>`
4. Update `src/config.json` with deployed contract addresses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

This is a demonstration project. Do not use in production without proper security audits and testing.
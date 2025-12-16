# Web3 Wallet Integration

HaloLight Web3 provides unified access to EVM + Solana + IPFS, with Core/React/Vue packages.

**GitHub**: [https://github.com/halolight/halolight-web3](https://github.com/halolight/halolight-web3)

**npm**:
- `@halolight/web3-core` - Core functionality (framework-agnostic)
- `@halolight/web3-react` - React components and hooks
- `@halolight/web3-vue` - Vue 3 components and composables

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| wagmi | ^2.12.x | EVM wallet and contract calls |
| viem | ^2.21.x | EVM RPC & ABI utilities |
| @solana/web3.js | ^1.95.x | Solana JavaScript SDK |
| @solana/wallet-adapter | latest | Solana wallet adapters |
| @web3-storage/w3up-client | ^16.0.x | IPFS/web3.storage client |
| siwe | ^2.3.x | Sign-In with Ethereum |
| TypeScript | ^5.7.x | Type system |
| Turborepo | ^2.3.x | Monorepo build tool |

## Core Features

### EVM (Ethereum/Polygon/BSC)

- Wallet connection (MetaMask, WalletConnect, etc.)
- Sign-In with Ethereum (SIWE)
- ERC-20 token interactions
- ERC-721 NFT support
- Smart contract calls (read/write)
- Gas estimation & management
- Multi-chain support

### Solana

- Wallet adapter integration (Phantom, Solflare, etc.)
- Signature-based authentication
- SOL transfers
- SPL Token support
- Transaction management
- Devnet/Testnet/Mainnet support

### IPFS

- File upload (web3.storage)
- JSON metadata upload
- NFT metadata handling
- CID validation & conversion
- Gateway URL management
- Batch upload with progress

## Directory Structure

```
halolight-web3/
├── packages/
│   ├── core/                      # Core package (@halolight/web3-core)
│   │   ├── src/
│   │   │   ├── evm/               # EVM/Ethereum functionality
│   │   │   │   ├── wallet.ts      # Wagmi configuration
│   │   │   │   ├── chains.ts      # Chain configuration
│   │   │   │   ├── siwe.ts        # Sign-In with Ethereum
│   │   │   │   └── contracts.ts   # Smart contract interaction
│   │   │   ├── solana/            # Solana functionality
│   │   │   │   ├── wallet.ts      # Wallet adapters
│   │   │   │   └── auth.ts        # Signature authentication
│   │   │   ├── storage/           # Storage functionality
│   │   │   │   └── ipfs.ts        # IPFS upload
│   │   │   ├── types/             # TypeScript types
│   │   │   └── utils/             # Utilities
│   │   └── package.json
│   │
│   ├── react/                     # React package (@halolight/web3-react)
│   │   ├── src/
│   │   │   ├── providers/
│   │   │   │   └── Web3Provider.tsx
│   │   │   ├── components/
│   │   │   │   ├── WalletButton.tsx
│   │   │   │   ├── TokenBalance.tsx
│   │   │   │   ├── NftGallery.tsx
│   │   │   │   └── ContractCall.tsx
│   │   │   └── hooks/
│   │   └── package.json
│   │
│   └── vue/                       # Vue package (@halolight/web3-vue)
│       ├── src/
│       │   ├── composables/
│       │   │   └── useWallet.ts
│       │   └── components/
│       │       ├── WalletButton.vue
│       │       └── TokenBalance.vue
│       └── package.json
│
├── .env.example
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Quick Start

### Installation

```bash
# Using pnpm (recommended)
pnpm add @halolight/web3-core @halolight/web3-react
# or for Vue
pnpm add @halolight/web3-core @halolight/web3-vue

# Using npm
npm install @halolight/web3-core @halolight/web3-react

# Using yarn
yarn add @halolight/web3-core @halolight/web3-react
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# EVM - RPC nodes
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key

# EVM - WalletConnect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Solana
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# IPFS/web3.storage
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_web3_storage_token
```

### React Example

```tsx
import { Web3Provider, WalletButton, TokenBalance } from '@halolight/web3-react';

function App() {
  return (
    <Web3Provider
      evmNetwork="mainnet"
      solanaCluster="mainnet-beta"
      enableEvm={true}
      enableSolana={true}
    >
      <div>
        <WalletButton chain="evm" />
        <WalletButton chain="solana" />

        <TokenBalance
          chain="evm"
          tokenAddress="0x..." // USDC on Ethereum
          showSymbol
        />
      </div>
    </Web3Provider>
  );
}
```

### Vue Example

```vue
<script setup lang="ts">
import { WalletButton, TokenBalance, useEvmWallet } from '@halolight/web3-vue';
import { WagmiPlugin } from '@wagmi/vue';
import { createWagmiConfig } from '@halolight/web3-core';

const config = createWagmiConfig('mainnet');
</script>

<template>
  <div>
    <WalletButton />
    <TokenBalance
      token-address="0x..."
      :show-symbol="true"
    />
  </div>
</template>
```

### Core Library (Framework-agnostic)

```typescript
import {
  createWagmiConfig,
  getTokenBalance,
  uploadToIpfs,
  authenticateWithSiwe,
} from '@halolight/web3-core';

// EVM: Get token balance
const balance = await getTokenBalance(client, tokenAddress, walletAddress);

// IPFS: Upload file
const result = await uploadToIpfs(file);
console.log(result.cid, result.gateway);

// SIWE: Authenticate user
const auth = await authenticateWithSiwe({
  domain: 'example.com',
  address: walletAddress,
  chainId: 1,
  signMessage: async (msg) => wallet.signMessage(msg),
});
```

## React Components

### Web3Provider

Unified EVM + Solana Provider:

```tsx
<Web3Provider
  evmNetwork="mainnet"           // or "testnet" | "development"
  solanaCluster="mainnet-beta"   // or "devnet" | "testnet"
  enableEvm={true}               // Enable EVM support
  enableSolana={true}            // Enable Solana support
>
  {children}
</Web3Provider>
```

### WalletButton

```tsx
import { WalletButton, DefaultWalletButton } from '@halolight/web3-react';

// EVM wallet
<WalletButton
  chain="evm"
  connectText="Connect Ethereum"
  className="custom-class"
/>

// Solana wallet
<WalletButton
  chain="solana"
  className="custom-class"
/>

// With default styling
<DefaultWalletButton chain="evm" />
```

### TokenBalance

```tsx
import { TokenBalance } from '@halolight/web3-react';

<TokenBalance
  chain="evm"
  tokenAddress="0x..." // ERC-20 contract address
  showSymbol
  decimals={4}
  loadingComponent={<Spinner />}
  errorComponent={(error) => <div>Error: {error}</div>}
/>
```

### NftGallery

```tsx
import { NftGallery } from '@halolight/web3-react';

<NftGallery
  contractAddress="0x..." // ERC-721 contract
  maxDisplay={50}
  columns={3}
  renderNft={(nft) => (
    <div>
      <img src={nft.image} alt={nft.name} />
      <h3>{nft.name}</h3>
    </div>
  )}
/>
```

### ContractCall

```tsx
import { ContractCallButton, useContractCall } from '@halolight/web3-react';

// Using component
<ContractCallButton
  contract={{
    address: '0x...',
    abi: MyABI,
    functionName: 'mint',
    args: [tokenId],
  }}
  type="write"
  buttonText="Mint NFT"
  onSuccess={(data) => console.log('Minted!', data)}
/>

// Using hook
const { call, loading, error, txHash } = useContractCall(
  {
    address: '0x...',
    abi: MyABI,
    functionName: 'balanceOf',
    args: [address],
  },
  'read'
);
```

## Vue Composables

### useEvmWallet

```typescript
import { useEvmWallet } from '@halolight/web3-vue';

const { address, isConnected, connect, disconnect } = useEvmWallet();
```

### useTokenBalance

```typescript
import { useTokenBalance } from '@halolight/web3-vue';

const { balance, loading, error, refresh } = useTokenBalance('0x...');
```

### useNativeBalance

```typescript
import { useNativeBalance } from '@halolight/web3-vue';

const { balance, formatted, loading } = useNativeBalance();
```

## Core API

### EVM Wallet

```typescript
import {
  createWagmiConfig,
  formatAddress,
  isValidAddress,
} from '@halolight/web3-core';

// Create wagmi configuration
const config = createWagmiConfig('mainnet');

// Format address
const short = formatAddress('0x1234...5678'); // "0x1234...5678"

// Validate address
const valid = isValidAddress('0x...'); // true/false
```

### Smart Contracts

```typescript
import {
  readContract,
  writeContract,
  getTokenBalance,
  transferToken,
  ERC20_ABI,
} from '@halolight/web3-core';

// Read contract
const name = await readContract(publicClient, {
  address: '0x...',
  abi: ERC20_ABI,
  functionName: 'name',
});

// Write contract
const hash = await writeContract(walletClient, publicClient, {
  address: '0x...',
  abi: ERC20_ABI,
  functionName: 'transfer',
  args: [toAddress, amount],
});
```

### SIWE Authentication

```typescript
import {
  createSiweMessage,
  formatSiweMessage,
  verifySiweMessage,
  authenticateWithSiwe,
} from '@halolight/web3-core';

// Complete authentication flow
const result = await authenticateWithSiwe({
  domain: 'example.com',
  address: walletAddress,
  chainId: 1,
  signMessage: async (message) => {
    return await wallet.signMessage(message);
  },
});

if (result.success) {
  console.log('Authenticated:', result.address);
}
```

### Solana Wallet

```typescript
import {
  createSolanaConnection,
  getSolBalance,
  transferSol,
} from '@halolight/web3-core';

// Create connection
const connection = createSolanaConnection('mainnet-beta');

// Get SOL balance
const balance = await getSolBalance(connection, walletAddress);

// Transfer SOL
const signature = await transferSol(
  connection,
  wallet,
  toAddress,
  1.0 // 1 SOL
);
```

### IPFS Storage

```typescript
import {
  uploadToIpfs,
  uploadJsonToIpfs,
  fetchJsonFromIpfs,
  ipfsToHttp,
} from '@halolight/web3-core';

// Upload file
const result = await uploadToIpfs(file);
console.log(result.cid); // "QmXxx..."
console.log(result.gateway); // "https://w3s.link/ipfs/QmXxx..."

// Upload JSON
const metadata = await uploadJsonToIpfs({
  name: 'My NFT',
  description: 'Cool NFT',
  image: 'ipfs://QmYyy...',
});

// Fetch JSON
const data = await fetchJsonFromIpfs('QmXxx...');

// Convert IPFS URL to HTTP
const url = ipfsToHttp('ipfs://QmXxx...'); // "https://w3s.link/ipfs/QmXxx..."
```

## Development Guide

### Common Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Development mode (watch)
pnpm dev

# Run tests
pnpm test

# Type check
pnpm type-check

# Lint
pnpm lint

# Clean build artifacts
pnpm clean
```

### Single Package Operations

```bash
# In packages/core directory
pnpm build
pnpm dev
pnpm test

# Or from root
pnpm --filter @halolight/web3-core build
pnpm --filter @halolight/web3-react dev
```

## Best Practices

### RPC Configuration

- Configure RPC keys properly (Alchemy/Infura) to avoid rate limiting
- Use RPC fallback mechanism for better availability

### Error Handling

- Handle on-chain errors and rejection states
- Provide clear UI feedback

### Security

- Never expose private keys/sensitive tokens in production
- Use backend signing and proxy forwarding
- Validate all user inputs

## Related Projects

- [halolight](https://github.com/halolight/halolight) - Next.js frontend
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue frontend
- [halolight-docs](https://github.com/halolight/docs) - Documentation

## References

- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)
- [SIWE Documentation](https://login.xyz/)
- [web3.storage Documentation](https://web3.storage/docs/)

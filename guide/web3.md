# Web3 钱包集成

HaloLight Web3 提供 EVM + Solana + IPFS 的统一接入，包含 Core/React/Vue 三个包。

**GitHub**：[https://github.com/halolight/halolight-web3](https://github.com/halolight/halolight-web3)

**npm**：
- `@halolight/web3-core` - 核心功能 (框架无关)
- `@halolight/web3-react` - React 组件和 Hooks
- `@halolight/web3-vue` - Vue 3 组件和 Composables

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| wagmi | ^2.12.x | EVM 钱包与合约调用 |
| viem | ^2.21.x | EVM RPC & ABI 工具 |
| @solana/web3.js | ^1.95.x | Solana JavaScript SDK |
| @solana/wallet-adapter | latest | Solana 钱包适配器 |
| @web3-storage/w3up-client | ^16.0.x | IPFS/web3.storage 客户端 |
| siwe | ^2.3.x | Sign-In with Ethereum |
| TypeScript | ^5.7.x | 类型系统 |
| Turborepo | ^2.3.x | Monorepo 构建工具 |

## 核心特性

### EVM (Ethereum/Polygon/BSC)

- 钱包连接 (MetaMask，WalletConnect 等)
- Sign-In with Ethereum (SIWE)
- ERC-20 代币交互
- ERC-721 NFT 支持
- 智能合约调用 (读/写)
- Gas 估算与管理
- 多链支持

### Solana

- 钱包适配器集成 (Phantom，Solflare 等)
- 签名认证
- SOL 转账
- SPL Token 支持
- 交易管理
- Devnet/Testnet/Mainnet 支持

### IPFS

- 文件上传 (web3.storage)
- JSON 元数据上传
- NFT 元数据处理
- CID 验证与转换
- Gateway URL 管理
- 批量上传与进度

## 目录结构

```
halolight-web3/
├── packages/
│   ├── core/                      # 核心包 (@halolight/web3-core)
│   │   ├── src/
│   │   │   ├── evm/               # EVM/Ethereum 功能
│   │   │   │   ├── wallet.ts      # Wagmi 配置
│   │   │   │   ├── chains.ts      # 链配置
│   │   │   │   ├── siwe.ts        # Sign-In with Ethereum
│   │   │   │   └── contracts.ts   # 智能合约交互
│   │   │   ├── solana/            # Solana 功能
│   │   │   │   ├── wallet.ts      # 钱包适配器
│   │   │   │   └── auth.ts        # 签名认证
│   │   │   ├── storage/           # 存储功能
│   │   │   │   └── ipfs.ts        # IPFS 上传
│   │   │   ├── types/             # TypeScript 类型
│   │   │   └── utils/             # 工具函数
│   │   └── package.json
│   │
│   ├── react/                     # React 包 (@halolight/web3-react)
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
│   └── vue/                       # Vue 包 (@halolight/web3-vue)
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

## 快速开始

### 安装

```bash
# 使用 pnpm (推荐)
pnpm add @halolight/web3-core @halolight/web3-react
# 或 Vue
pnpm add @halolight/web3-core @halolight/web3-vue

# 使用 npm
npm install @halolight/web3-core @halolight/web3-react

# 使用 yarn
yarn add @halolight/web3-core @halolight/web3-react
```

### 环境变量

复制 `.env.example` 到 `.env` 并配置：

```env
# EVM - RPC 节点
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key

# EVM - WalletConnect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Solana
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# IPFS/web3.storage
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_web3_storage_token
```

### React 示例

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

### Vue 示例

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

### Core 库 (框架无关)

```typescript
import {
  createWagmiConfig,
  getTokenBalance,
  uploadToIpfs,
  authenticateWithSiwe,
} from '@halolight/web3-core';

// EVM: 获取代币余额
const balance = await getTokenBalance(client, tokenAddress, walletAddress);

// IPFS: 上传文件
const result = await uploadToIpfs(file);
console.log(result.cid, result.gateway);

// SIWE: 用户认证
const auth = await authenticateWithSiwe({
  domain: 'example.com',
  address: walletAddress,
  chainId: 1,
  signMessage: async (msg) => wallet.signMessage(msg),
});
```

## React 组件

### Web3Provider

统一的 EVM + Solana Provider：

```tsx
<Web3Provider
  evmNetwork="mainnet"           // 或 "testnet" | "development"
  solanaCluster="mainnet-beta"   // 或 "devnet" | "testnet"
  enableEvm={true}               // 启用 EVM 支持
  enableSolana={true}            // 启用 Solana 支持
>
  {children}
</Web3Provider>
```

### WalletButton

```tsx
import { WalletButton, DefaultWalletButton } from '@halolight/web3-react';

// EVM 钱包
<WalletButton
  chain="evm"
  connectText="Connect Ethereum"
  className="custom-class"
/>

// Solana 钱包
<WalletButton
  chain="solana"
  className="custom-class"
/>

// 带默认样式
<DefaultWalletButton chain="evm" />
```

### TokenBalance

```tsx
import { TokenBalance } from '@halolight/web3-react';

<TokenBalance
  chain="evm"
  tokenAddress="0x..." // ERC-20 合约地址
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
  contractAddress="0x..." // ERC-721 合约
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

// 使用组件
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

// 使用 Hook
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

### EVM 钱包

```typescript
import {
  createWagmiConfig,
  formatAddress,
  isValidAddress,
} from '@halolight/web3-core';

// 创建 wagmi 配置
const config = createWagmiConfig('mainnet');

// 格式化地址
const short = formatAddress('0x1234...5678'); // "0x1234...5678"

// 验证地址
const valid = isValidAddress('0x...'); // true/false
```

### 智能合约

```typescript
import {
  readContract,
  writeContract,
  getTokenBalance,
  transferToken,
  ERC20_ABI,
} from '@halolight/web3-core';

// 读取合约
const name = await readContract(publicClient, {
  address: '0x...',
  abi: ERC20_ABI,
  functionName: 'name',
});

// 写入合约
const hash = await writeContract(walletClient, publicClient, {
  address: '0x...',
  abi: ERC20_ABI,
  functionName: 'transfer',
  args: [toAddress, amount],
});
```

### SIWE 认证

```typescript
import {
  createSiweMessage,
  formatSiweMessage,
  verifySiweMessage,
  authenticateWithSiwe,
} from '@halolight/web3-core';

// 完整认证流程
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

### Solana 钱包

```typescript
import {
  createSolanaConnection,
  getSolBalance,
  transferSol,
} from '@halolight/web3-core';

// 创建连接
const connection = createSolanaConnection('mainnet-beta');

// 获取 SOL 余额
const balance = await getSolBalance(connection, walletAddress);

// 转账 SOL
const signature = await transferSol(
  connection,
  wallet,
  toAddress,
  1.0 // 1 SOL
);
```

### IPFS 存储

```typescript
import {
  uploadToIpfs,
  uploadJsonToIpfs,
  fetchJsonFromIpfs,
  ipfsToHttp,
} from '@halolight/web3-core';

// 上传文件
const result = await uploadToIpfs(file);
console.log(result.cid); // "QmXxx..."
console.log(result.gateway); // "https://w3s.link/ipfs/QmXxx..."

// 上传 JSON
const metadata = await uploadJsonToIpfs({
  name: 'My NFT',
  description: 'Cool NFT',
  image: 'ipfs://QmYyy...',
});

// 获取 JSON
const data = await fetchJsonFromIpfs('QmXxx...');

// 转换 IPFS URL 到 HTTP
const url = ipfsToHttp('ipfs://QmXxx...'); // "https://w3s.link/ipfs/QmXxx..."
```

## 开发指南

### 常用命令

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 开发模式 (watch)
pnpm dev

# 运行测试
pnpm test

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 清理构建产物
pnpm clean
```

### 单个包操作

```bash
# 在 packages/core 目录下
pnpm build
pnpm dev
pnpm test

# 或从根目录
pnpm --filter @halolight/web3-core build
pnpm --filter @halolight/web3-react dev
```

## 注意事项

### RPC 配置

- 合理配置 RPC Key (Alchemy/Infura)，避免速率限制
- 使用 RPC 回退机制提高可用性

### 错误处理

- 处理链上错误与拒签状态
- 给出清晰的 UI 反馈

### 安全

- 生产环境避免暴露私钥/敏感令牌
- 使用后端签名与代理转发
- 验证所有用户输入

## 相关项目

- [halolight](https://github.com/halolight/halolight) - Next.js 前端
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue 前端
- [halolight-docs](https://github.com/halolight/docs) - 文档

## 参考资源

- [Wagmi 文档](https://wagmi.sh/)
- [Viem 文档](https://viem.sh/)
- [Solana Web3.js 文档](https://solana-labs.github.io/solana-web3.js/)
- [SIWE 文档](https://login.xyz/)
- [web3.storage 文档](https://web3.storage/docs/)

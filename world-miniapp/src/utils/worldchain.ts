import { Chain } from 'viem'

export const worldchain = {
  id: 480,
  name: 'World Chain',
  nativeCurrency: {
    name: 'Worldcoin',
    symbol: 'WLD',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.worldchain.build'],
    },
  },
  blockExplorers: {
    default: {
      name: 'WorldScan',
      url: 'https://worldscan.org',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1,
    },
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xc097d054eBfD310fD0B368fC7B5F35cFfFfe53Cd',
      blockCreated: 0,
    },
  },
} as const satisfies Chain;
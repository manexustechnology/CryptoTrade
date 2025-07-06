# MetaMask Integration Documentation

## Overview
This document describes the MetaMask wallet integration implemented in the CryptoTrade application.

## Features Implemented

### 1. MetaMask Service (`src/services/metamask.ts`)
- **Wallet Connection**: Secure connection to MetaMask wallet
- **Account Management**: Handle account switching and disconnection
- **Network Detection**: Automatic network detection and validation
- **Balance Tracking**: Real-time balance updates
- **Event Listeners**: Listen for account and network changes

### 2. Wallet Context (`src/contexts/WalletContext.tsx`)
- **Global State Management**: Centralized wallet state across the application
- **Connection Persistence**: Maintains connection state across page refreshes
- **Error Handling**: Comprehensive error handling for connection issues
- **Loading States**: Loading indicators during connection process

### 3. UI Components

#### Header Component (`src/components/Header.tsx`)
- **Connection Button**: Smart button that shows connection status
- **Loading States**: Spinner during connection process
- **Error Display**: Shows MetaMask installation errors
- **Address Display**: Shows truncated wallet address when connected

#### Wallet Info Component (`src/components/WalletInfo.tsx`)
- **Address Display**: Full wallet address with copy functionality
- **Balance Display**: Current ETH balance
- **Network Information**: Network name and chain ID
- **Connection Status**: Visual connection indicator

#### MetaMask Install Component (`src/components/MetaMaskInstall.tsx`)
- **Installation Guide**: Step-by-step MetaMask installation instructions
- **Direct Link**: Direct link to MetaMask download page
- **Conditional Display**: Only shows when MetaMask is not installed

#### Trading Interface Updates (`src/components/TradingInterface.tsx`)
- **Wallet Requirement**: Trading requires wallet connection
- **Disabled States**: Form inputs disabled when not connected
- **Smart Button**: Button changes based on connection status

## Usage

### Connecting to MetaMask
1. Click the "Connect Wallet" button in the header
2. MetaMask will prompt for connection approval
3. Once approved, wallet information will be displayed

### Features Available When Connected
- View wallet address and balance
- See current network information
- Access trading interface
- Copy wallet address to clipboard

### Network Support
The application supports multiple Ethereum networks:
- Ethereum Mainnet (Chain ID: 1)
- Goerli Testnet (Chain ID: 5)
- Sepolia Testnet (Chain ID: 11155111)
- Polygon (Chain ID: 137)
- BSC (Chain ID: 56)

## Technical Implementation

### Dependencies
- `ethers`: Ethereum library for wallet interaction
- `lucide-react`: Icons for UI components

### Key Functions

#### MetaMaskService
```typescript
// Connect to MetaMask
async connect(): Promise<WalletInfo>

// Get current wallet info
async getWalletInfo(): Promise<WalletInfo | null>

// Listen for account changes
onAccountsChanged(callback: (accounts: string[]) => void)

// Listen for network changes
onChainChanged(callback: (chainId: string) => void)
```

#### WalletContext
```typescript
// Connect wallet
const { connect } = useWallet()

// Check connection status
const { isConnected } = useWallet()

// Get wallet information
const { walletInfo } = useWallet()

// Handle errors
const { error } = useWallet()
```

## Security Considerations

1. **No Private Key Access**: The application never requests or stores private keys
2. **Secure Connection**: Uses MetaMask's secure connection protocol
3. **User Consent**: All transactions require explicit user approval
4. **Network Validation**: Validates network before allowing transactions

## Error Handling

### Common Errors
1. **MetaMask Not Installed**: Shows installation guide
2. **Connection Rejected**: User-friendly error message
3. **Wrong Network**: Network validation and guidance
4. **Account Locked**: Prompts user to unlock MetaMask

### Error Recovery
- Automatic reconnection attempts
- Graceful degradation when wallet is unavailable
- Clear error messages for user guidance

## Future Enhancements

1. **Multi-Wallet Support**: Support for other wallet providers
2. **Transaction History**: Display transaction history from blockchain
3. **Gas Estimation**: Real-time gas price estimation
4. **Network Switching**: Automatic network switching for optimal trading
5. **Token Support**: Support for ERC-20 tokens

## Testing

### Manual Testing Checklist
- [ ] MetaMask installation detection
- [ ] Wallet connection flow
- [ ] Account switching
- [ ] Network switching
- [ ] Disconnection handling
- [ ] Error scenarios
- [ ] UI responsiveness

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Edge
- Brave

## Troubleshooting

### Common Issues
1. **MetaMask not detected**: Ensure MetaMask extension is installed and enabled
2. **Connection fails**: Check if MetaMask is unlocked and on correct network
3. **Wrong network**: Switch to supported network in MetaMask
4. **Permission denied**: Check MetaMask permissions for the site

### Debug Information
Enable browser console logging for detailed error information:
```javascript
// In browser console
window.ethereum.isMetaMask // Should return true
window.ethereum.selectedAddress // Should show connected address
``` 
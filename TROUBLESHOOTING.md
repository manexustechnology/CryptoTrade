# Troubleshooting Guide - MetaMask Integration

## Common Issues and Solutions

### 1. MetaMask Extension Not Found

**Error Message:** `MetaMask extension not found`

**Solutions:**
1. **Install MetaMask:**
   - Visit [metamask.io/download](https://metamask.io/download/)
   - Install the extension for your browser
   - Restart your browser

2. **Enable MetaMask:**
   - Check if MetaMask is enabled in your browser extensions
   - Click the puzzle piece icon in Chrome to see all extensions
   - Make sure MetaMask is toggled ON

3. **Refresh the Page:**
   - After installing MetaMask, refresh the page
   - Clear browser cache if needed

### 2. Multiple Wallet Extensions Detected

**Symptoms:** 
- Warning message about multiple wallets
- Connection issues
- Console errors from other wallet extensions

**Solutions:**
1. **Disable Other Wallet Extensions:**
   - Temporarily disable Yoroi, TronLink, or other wallet extensions
   - Keep only MetaMask enabled
   - Refresh the page

2. **Use Incognito Mode:**
   - Open the app in incognito/private browsing mode
   - Only enable MetaMask in incognito mode

3. **Check Extension Permissions:**
   - Ensure MetaMask has permission to access the site
   - Check if other extensions are interfering

### 3. MetaMask is Locked

**Error Message:** `MetaMask is locked. Please unlock MetaMask and try again.`

**Solutions:**
1. **Unlock MetaMask:**
   - Click on the MetaMask extension icon
   - Enter your password to unlock
   - Try connecting again

2. **Check if MetaMask is Open:**
   - Make sure MetaMask extension is not minimized
   - Close and reopen MetaMask if needed

### 4. Connection Rejected

**Error Message:** `Connection rejected by user. Please try again.`

**Solutions:**
1. **Check MetaMask Popup:**
   - Look for MetaMask popup that might be blocked
   - Allow popups for the site
   - Click "Connect" in the MetaMask popup

2. **Check Site Permissions:**
   - In MetaMask, go to Settings > Connected Sites
   - Remove the site if it's already connected
   - Try connecting again

### 5. Wrong Network

**Symptoms:**
- Wallet connects but shows wrong network
- Trading interface doesn't work properly

**Solutions:**
1. **Switch to Ethereum Mainnet:**
   - In MetaMask, click the network dropdown
   - Select "Ethereum Mainnet"
   - Or add a custom network if needed

2. **Supported Networks:**
   - Ethereum Mainnet (Chain ID: 1)
   - Goerli Testnet (Chain ID: 5)
   - Sepolia Testnet (Chain ID: 11155111)
   - Polygon (Chain ID: 137)
   - BSC (Chain ID: 56)

### 6. Browser Compatibility Issues

**Supported Browsers:**
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Brave

**Unsupported Browsers:**
- ❌ Safari (limited Web3 support)
- ❌ Internet Explorer

### 7. Console Errors

**Common Console Errors:**

1. **Yoroi Wallet Errors:**
   ```
   [yoroi/prod] dapp-connector is successfully injected into localhost
   ```
   - **Solution:** Disable Yoroi extension temporarily

2. **TronLink Errors:**
   ```
   TronLink initiated
   ```
   - **Solution:** Disable TronLink extension temporarily

3. **MetaMask Not Found:**
   ```
   [ChromeTransport] connect error: Error: MetaMask extension not found
   ```
   - **Solution:** Install or enable MetaMask extension

### 8. Debug Tools

**Development Mode Debug Panel:**
- Look for the "Wallet Debug" button in the bottom-right corner
- Click to see detailed wallet detection information
- Use "Log to Console" to get detailed debug info

**Browser Console Commands:**
```javascript
// Check if MetaMask is available
window.ethereum.isMetaMask

// Check current address
window.ethereum.selectedAddress

// Check current network
window.ethereum.chainId

// Check connection status
window.ethereum.isConnected()
```

### 9. Network Issues

**If you can't connect to MetaMask:**

1. **Check Internet Connection:**
   - Ensure you have a stable internet connection
   - Try refreshing the page

2. **Check MetaMask Network:**
   - Make sure MetaMask is connected to a supported network
   - Try switching networks in MetaMask

3. **Clear Browser Data:**
   - Clear cookies and cache
   - Try in incognito mode

### 10. Security Considerations

**Best Practices:**
1. **Never share your private keys**
2. **Only connect to trusted sites**
3. **Verify the site URL before connecting**
4. **Use hardware wallets for large amounts**
5. **Keep MetaMask updated**

**Warning Signs:**
- Requests for private keys
- Unexpected transaction requests
- Suspicious popups or redirects

## Getting Help

If you're still experiencing issues:

1. **Check the Debug Panel** (development mode only)
2. **Review Console Logs** for specific error messages
3. **Try in Incognito Mode** with only MetaMask enabled
4. **Update MetaMask** to the latest version
5. **Contact Support** with specific error messages

## Development Notes

For developers debugging wallet issues:

1. **Wallet Detection Logic:**
   - The app specifically checks for `window.ethereum.isMetaMask === true`
   - Other wallet providers are detected but not used
   - Multiple wallet warnings help identify conflicts

2. **Error Handling:**
   - Specific error messages for different failure scenarios
   - Toast notifications for user feedback
   - Graceful degradation when wallet is unavailable

3. **Testing:**
   - Test with multiple wallet extensions installed
   - Test with no wallet extensions
   - Test with locked/unlocked MetaMask
   - Test network switching scenarios 
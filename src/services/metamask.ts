import { ethers } from 'ethers';

export interface WalletInfo {
  address: string;
  balance: string;
  chainId: number;
  networkName: string;
}

export class MetaMaskService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  // Check if MetaMask is installed
  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && 
           typeof window.ethereum !== 'undefined' && 
           window.ethereum.isMetaMask === true;
  }

  // Get MetaMask provider
  async getProvider(): Promise<ethers.BrowserProvider> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask extension.');
    }

    if (!this.provider) {
      try {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        // Test the provider
        await this.provider.getNetwork();
      } catch (error) {
        console.error('Error initializing MetaMask provider:', error);
        throw new Error('Failed to connect to MetaMask. Please ensure MetaMask is unlocked and try again.');
      }
    }

    return this.provider;
  }

  // Connect to MetaMask
  async connect(): Promise<WalletInfo> {
    try {
      const provider = await this.getProvider();
      
      // Check if MetaMask is unlocked
      const accounts = await provider.listAccounts();
      if (accounts.length === 0) {
        // Request account access
        const requestedAccounts = await provider.send('eth_requestAccounts', []);
        if (requestedAccounts.length === 0) {
          throw new Error('No accounts found. Please unlock MetaMask and try again.');
        }
      }

      const address = accounts[0]?.address || (await provider.send('eth_requestAccounts', []))[0];
      this.signer = await provider.getSigner();

      // Get network information
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(address);

      return {
        address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        networkName: network.name
      };
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      if (error instanceof Error) {
        if (error.message.includes('User rejected')) {
          throw new Error('Connection rejected by user. Please try again.');
        } else if (error.message.includes('MetaMask is not installed')) {
          throw new Error('MetaMask is not installed. Please install MetaMask extension.');
        } else if (error.message.includes('locked')) {
          throw new Error('MetaMask is locked. Please unlock MetaMask and try again.');
        }
      }
      throw error;
    }
  }

  // Disconnect from MetaMask
  disconnect(): void {
    this.provider = null;
    this.signer = null;
  }

  // Get current wallet info
  async getWalletInfo(): Promise<WalletInfo | null> {
    if (!this.signer) {
      return null;
    }

    try {
      const address = await this.signer.getAddress();
      const balance = await this.signer.provider?.getBalance(address);
      const network = await this.signer.provider?.getNetwork();

      return {
        address,
        balance: balance ? ethers.formatEther(balance) : '0',
        chainId: network ? Number(network.chainId) : 0,
        networkName: network?.name || 'Unknown'
      };
    } catch (error) {
      console.error('Error getting wallet info:', error);
      return null;
    }
  }

  // Get signer for transactions
  async getSigner(): Promise<ethers.JsonRpcSigner | null> {
    if (!this.signer) {
      try {
        const provider = await this.getProvider();
        this.signer = await provider.getSigner();
      } catch (error) {
        console.error('Error getting signer:', error);
        return null;
      }
    }
    return this.signer;
  }

  // Listen for account changes
  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (this.isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', callback);
    }
  }

  // Listen for chain changes
  onChainChanged(callback: (chainId: string) => void): void {
    if (this.isMetaMaskInstalled()) {
      window.ethereum.on('chainChanged', callback);
    }
  }

  // Remove event listeners
  removeListeners(): void {
    if (this.isMetaMaskInstalled()) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }
  }
}

// Create singleton instance
export const metaMaskService = new MetaMaskService();

// Add TypeScript declarations for window.ethereum and other wallets
declare global {
  interface Window {
    ethereum?: any;
    cardano?: any;
  }
} 
/* eslint-disable no-unused-vars */
import { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

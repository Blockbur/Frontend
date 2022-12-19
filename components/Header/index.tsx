import { ethers } from 'ethers'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import logoImg from '../../assets/weirds-white-logo.png'

import { LoggedIn } from './components/LoggedIn'
import { Navigation } from './components/Navigation'
import { ConnecWalletButton } from '../ConnectedWalletButton'

export function Header() {
  const [walletAddress, setWalletAddress] = useState<string>('')

  async function verifyIfWalletIsConnected() {
    const { ethereum } = window

    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      console.log('accounts', accounts)

      if (accounts.length) {
        const address = accounts[0]

        setWalletAddress(address)
      }
    } else {
      alert("You don't have the metamask extension installed!")
    }
  }

  function refreshPage() {
    window.location.reload()
  }

  async function onConnectWallet() {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      await provider.send('eth_requestAccounts', [])

      const signer = provider.getSigner()
      const address = await signer.getAddress()

      refreshPage()
      setWalletAddress(address)
      console.log('walletAddress ==>', address)
    } else {
      alert("You don't have the metamask extension installed!")
    }
  }

  useEffect(() => {
    verifyIfWalletIsConnected()
  }, [])

  return (
    <header className="w-screen py-4">
      <div className="max-w-[1440px] w-full px-4 lg:px-8 flex justify-between items-center mx-auto">
        <Link href="/">
          <Image src={logoImg} alt="Logo da weirds" />
        </Link>

        <Navigation />

        {walletAddress ? (
          <LoggedIn walletAddress={walletAddress} />
        ) : (
          <ConnecWalletButton onConnect={onConnectWallet} />
        )}
      </div>
    </header>
  )
}

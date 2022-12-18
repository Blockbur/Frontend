import { ethers } from 'ethers'

import { useState } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import logoImg from '../../assets/weirds-white-logo.png'

import { ConnecWalletButton } from './components/ConnectWalletButton'

export function Header() {
  const [walletAddress, setWalletAddress] = useState<string>('')

  console.log('walletAddress ==>', walletAddress)

  const navigationItems = [
    { name: 'HOME', href: '/' },
    { name: 'MINT', href: '/mint' },
    { name: 'JOIN US', href: '/mint' },
  ]

  async function onConnectWallet() {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      await provider.send('eth_requestAccounts', [])

      const signer = provider.getSigner()
      const address = await signer.getAddress()

      setWalletAddress(address)
    } else {
      alert("You don't have the metamask extension installed!")
    }
  }

  return (
    <header className="w-screen py-4">
      <div className="max-w-[1280px] w-full px-4 lg:px-8 flex justify-between items-center mx-auto">
        <Link href="/">
          <Image src={logoImg} alt="Logo da weirds" />
        </Link>

        <ul className="flex items-center gap-11 text-lg font-semibold">
          {navigationItems.map((navItem) => {
            const isMintItem = navItem.name.includes('MINT')

            return (
              <li
                key={navItem.name}
                className={
                  isMintItem
                    ? `bg-clip-text bg-purple-gradient text-transparent`
                    : `text-white`
                }
              >
                <Link href={navItem.href}>{navItem.name}</Link>
              </li>
            )
          })}
        </ul>
        <ConnecWalletButton onConnect={onConnectWallet} />
      </div>
    </header>
  )
}

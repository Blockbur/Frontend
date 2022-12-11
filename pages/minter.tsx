import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

import Image from 'next/image'

import contractAbi from '../contractAbi.json'

export default function Minter() {
  const [walletAddress, setWalletAddress] = useState<string>('')

  const contractAddress = '0x6E1412c13B191F7Ce707631EdbfB330b11862815'

  async function verifyIfWalletIsConnected() {
    const { ethereum } = window

    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      const addressExists = accounts[0].length > 0

      if (addressExists) {
        const address = accounts[0]

        setWalletAddress(address)
      }
    } else {
      alert("You don't have the metamask extension installed!")
    }
  }

  async function handleMintNFT() {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      await provider.send('eth_requestAccounts', [])

      const signer = provider.getSigner()

      const contractInstace = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider,
      )
      console.log('contractInstace', contractInstace)

      const contractWithSigner = contractInstace.connect(signer)
      console.log('contractWithSigner', contractWithSigner)

      const mintNft = await contractWithSigner.mintNFT(1)

      console.log('mintNft', mintNft)
    } else {
      alert("You don't have the metamask extension installed!")
    }
  }

  async function handleConnectWallet() {
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

  useEffect(() => {
    verifyIfWalletIsConnected()
  }, [])

  return (
    <div className="w-screen h-screen bg-gray-900">
      <div className="max-w-[360px] lg:max-w-[1440px] w-full pt-32 mx-auto">
        <div className="w-[600px] h-[400px] bg-gray-500 shadow-xl rounded-2xl p-8 flex flex-col mx-auto">
          <h1 className="text-center text-4xl font-bold">Mint NFT</h1>

          <Image src="" alt="" />

          {walletAddress ? (
            <button
              onClick={handleMintNFT}
              className="mt-auto py-4 rounded-lg text-lg w-full bg-gradient-to-r text-white font-bold from-orange-500 to-yellow-500"
            >
              MINT
            </button>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="mt-auto py-4 rounded-lg text-lg w-full bg-gradient-to-r text-white font-bold from-orange-500 to-yellow-500"
            >
              CONNECT WALLET
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

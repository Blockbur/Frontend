import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Minter } from '../../components/Minter'
import contractAbi from '../../contractAbi.json'

export default function Mint() {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [contractIsEnabled, setContractEnabled] = useState<boolean>(true)

  const contractAddress = '0x27D3b6A879330F5f6f394492dE9417F59989F467'

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

      const contractWithSigner = await contractInstace.connect(signer)
      console.log('contractWithSigner', contractWithSigner)

      const isEnabled = await contractWithSigner.isEnabled()
      console.log('isEnabled =>', isEnabled)

      if (isEnabled) {
        console.log('ESTÁ ATIVO')
        const isWhitelistOn = await contractWithSigner.isWhitelistOn()
        console.log('isWhitelistOn =>', isWhitelistOn)

        if (isWhitelistOn) {
          const addressIsOnWhitelist = await contractWithSigner.addressToBoolWl(
            walletAddress,
          )
          console.log('addressIsOnWhitelist', addressIsOnWhitelist)

          if (addressIsOnWhitelist) {
            const mintNft = await contractWithSigner.mintNFT(1, {
              value: ethers.utils.parseUnits('0.01', 'ether'),
            })

            console.log('mintNftWithWhitelist', mintNft)
          }
        } else {
          const mintNft = await contractWithSigner.mintNFT(1, {
            value: ethers.utils.parseUnits('0.01', 'ether'),
          })
          console.log('mintNft', mintNft)
        }
      } else {
        setContractEnabled(false)
      }
    } else {
      alert("You don't have the metamask extension installed!")
    }
  }

  useEffect(() => {
    verifyIfWalletIsConnected()
  }, [])

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 mt-24">
      <Minter />
    </div>
  )
}

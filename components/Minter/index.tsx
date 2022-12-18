import testNftImg from '../../assets/test-nft.png'

import { CaretRight, CaretLeft } from 'phosphor-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import contractAbi from '../../contract/abi.json'
import {
  getMaxSupplyPerWallet,
  getTotalNFTsMinted,
  getTotalNFTsMintedByUser,
  getTotalSupply,
} from '../../contract/functions'

export function Minter() {
  const [totalSupply, setTotalSupply] = useState<number>(0)
  const [maxSupplyPerWallet, setMaxSupplyPerWallet] = useState<number>(0)
  const [userNftsMinted, setUserNftsMinted] = useState<number>(0)
  const [totalAmountOfNFTsMinted, setTotalAmountOfNFTsMinted] =
    useState<number>(0)
  const [amountOfNftsToBuy, setAmountOfNftsToBuy] = useState<number>(0)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [contractIsEnabled, setContractEnabled] = useState<boolean>(true)

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

  const nftPrice = 0.01

  const maxSupplyReached = totalAmountOfNFTsMinted === totalSupply
  const maxSupplyPerUserReached = userNftsMinted === maxSupplyPerWallet

  const disableMint =
    !contractIsEnabled || maxSupplyReached || maxSupplyPerUserReached

  function handleIncreaseBuyAmount() {
    setAmountOfNftsToBuy((prevAmount) => prevAmount + 1)
  }

  function handleDecreaseBuyAmount() {
    setAmountOfNftsToBuy((prevAmount) => prevAmount - 1)
  }

  async function handleMintNFT(amountToMint: number) {
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

      const contractWithSigner = await contractInstace.connect(signer)

      const isEnabled = await contractWithSigner.isEnabled()

      if (isEnabled) {
        const isWhitelistOn = await contractWithSigner.isWhitelistOn()

        if (isWhitelistOn) {
          const addressIsOnWhitelist = await contractWithSigner.addressToBoolWl(
            walletAddress,
          )

          if (addressIsOnWhitelist) {
            const mintNft = await contractWithSigner.mintNFT(amountToMint, {
              value: ethers.utils.parseUnits(
                String(amountToMint * nftPrice),
                'ether',
              ),
            })

            console.log('mintNftWithWhitelist', mintNft)
          }
        } else {
          const mintNft = await contractWithSigner.mintNFT(amountToMint, {
            value: ethers.utils.parseUnits(
              String(amountToMint * nftPrice),
              'ether',
            ),
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

  async function getNFTInitialData(walletAddress: string) {
    const totalSupply = await getTotalSupply()
    setTotalSupply(totalSupply as number)

    const maxSupplyPerWallet = await getMaxSupplyPerWallet()
    setMaxSupplyPerWallet(maxSupplyPerWallet as number)

    const totalNFTsMinted = await getTotalNFTsMinted()
    setTotalAmountOfNFTsMinted(totalNFTsMinted as number)

    const totalNFTsMintedByUser = await getTotalNFTsMintedByUser(walletAddress)
    setUserNftsMinted(totalNFTsMintedByUser as number)
  }

  useEffect(() => {
    ;(async () => {
      await verifyIfWalletIsConnected()
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      await getNFTInitialData(walletAddress)
    })()
  }, [walletAddress])

  return (
    <div className="max-w-[800px] w-full bg-gray800 rounded-[24px] py-12 px-9 flex items-stretch justify-between mx-auto shadow-xl">
      <div className="max-w-[328px] w-full flex flex-col gap-14">
        <div className="flex flex-col gap-2">
          <h1 className="text-[42px] font-bold">NFT NAME</h1>
          <p className="text-gray100 font-medium">
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industrys standard dummy
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">AMOUNT: </h2>
          <div className="flex item-center gap-4">
            <CaretLeft
              onClick={handleDecreaseBuyAmount}
              className="text-white cursor-pointer"
              size={48}
              weight="fill"
            />

            <span className="font-bold text-[32px]">{amountOfNftsToBuy}</span>

            <CaretRight
              onClick={handleIncreaseBuyAmount}
              className="text-white cursor-pointer"
              size={48}
              weight="fill"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 font-medium">
          <span className="text-gray100 text-lg">
            Total supply: {totalAmountOfNFTsMinted} / {totalSupply}
          </span>
          <button
            disabled={disableMint}
            onClick={() => handleMintNFT(amountOfNftsToBuy)}
            className="w-full py-4 bg-purple-gradient rounded-xl text-lg text-white font-bold shadow-lg"
          >
            {walletAddress
              ? `MINT (Minted: ${userNftsMinted} / ${maxSupplyPerWallet})`
              : 'CONNECT WALLET'}
          </button>
        </div>
      </div>
      <div className="max-w-[328px] w-full flex flex-col">
        <h1 className="text-5xl font-bold text-end">0.01 MATIC</h1>
        <Image className="mt-auto" src={testNftImg} alt="NFT image" />
      </div>
    </div>
  )
}

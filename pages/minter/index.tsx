import logoImg from '../../assets/weirds-white-logo.png'
import logoImgLg from '../../assets/weirds-white-logo-lg.png'
import testNftImg from '../../assets/test-nft.png'

import twitterLogo from '../../assets/social-medias/twitter.svg'
import linkedinLogo from '../../assets/social-medias/linkedin.svg'
import discordLogo from '../../assets/social-medias/discord.svg'

import Image from 'next/image'

import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import contractAbi from '../../contractAbi.json'

import { CaretRight, CaretLeft } from 'phosphor-react'

export default function Minter() {
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
    <div className="w-screen min-h-screen">
      <header className="w-screen py-4">
        <div className="max-w-[1280px] w-full px-4 lg:px-8 flex justify-between items-center mx-auto">
          <Image src={logoImg} alt="Logo da weirds" />
          <ul className="flex items-center gap-11 text-lg">
            <li>HOME</li>
            <li className="bg-clip-text bg-purple-gradient text-transparent">
              MINT
            </li>
            <li>JOIN US</li>
          </ul>
          <button className="py-4 px-9 text-xl font-bold bg-purple-gradient rounded-xl">
            Connect wallet
          </button>
        </div>
      </header>
      <main className="w-screen">
        <div className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 mt-24">
          <div className="bg-gray800 rounded-[24px] py-12 px-9 flex justify-between">
            <div className="max-w-[328px] w-full flex flex-col gap-14">
              <div className="flex flex-col gap-2">
                <h1 className="text-[42px] font-bold">NFT NAME</h1>
                <p className="text-gray100 font-medium">
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industrys standard dummy
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">AMOUNT: </h2>
                <div className="flex item-center gap-4">
                  <CaretLeft className="text-white" size={48} weight="fill" />

                  <span className="font-bold text-[32px]">1</span>

                  <CaretRight className="text-white" size={48} weight="fill" />
                </div>
              </div>
              <div className="flex flex-col gap-4 font-medium">
                <span className="text-gray100 text-lg">
                  Total supply: 12/45
                </span>
                <button className="w-full bg-purple-gradient rounded-xl text-lg text-white font-extrabold">
                  MINT (Minted: 1/5)
                </button>
              </div>
            </div>
            <div>
              <h1>0.01 MATIC</h1>
              <Image src={testNftImg} alt="NFT image" />
            </div>
          </div>
        </div>
      </main>
      <footer className="w-screen">
        <div className="max-w-[1280px] w-full bg-gray700 py-10 px-4 lg:px-8">
          <Image src={logoImgLg} alt="Logo da Weirds" />
          <div>
            <strong>FALE CONOSCO</strong>
            <input type="text" placeholder="E-mail" />
            <button>ENVIAR</button>
          </div>
          <div>
            <ul>
              <li>
                <a href="">
                  <Image src={linkedinLogo} alt="Logo do Linkedin" />
                </a>
              </li>
              <li>
                <a href="">
                  <Image src={twitterLogo} alt="Logo do Twitter" />
                </a>
              </li>
              <li>
                <a href="">
                  <Image src={discordLogo} alt="Logo do Discord" />
                </a>
              </li>
            </ul>
            <span>@WEIRDBAND | All Rigths Reserverd </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

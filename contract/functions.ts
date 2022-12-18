import { BigNumber, ethers } from 'ethers'
import contractAbi from '../contract/abi.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export async function getTotalSupply() {
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

    const contractWithSigner = contractInstace.connect(signer)

    const totalSupply = await contractWithSigner.maxSupply()

    const bigNumberReturn = BigNumber.from(totalSupply._hex)

    const formattedTotalSupply = bigNumberReturn.toNumber()

    return formattedTotalSupply
  }
}

export async function getTotalNFTsMinted() {
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

    const contractWithSigner = contractInstace.connect(signer)

    const totalNFTsMinted = await contractWithSigner._tokenIds()

    const bigNumberReturn = BigNumber.from(totalNFTsMinted._hex)

    const formattedTotalNFTsMinted = bigNumberReturn.toNumber()

    return formattedTotalNFTsMinted
  }
}

export async function getTotalNFTsMintedByUser(walletAddress: string) {
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

    const contractWithSigner = contractInstace.connect(signer)

    const totalNFTsMintedByUser = await contractWithSigner.nftsMintedPerWallet(
      walletAddress,
    )

    const bigNumberReturn = BigNumber.from(totalNFTsMintedByUser._hex)

    const formattedTotalNFTsMintedByUser = bigNumberReturn.toNumber()

    return formattedTotalNFTsMintedByUser
  }
}

export async function getMaxSupplyPerWallet() {
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

    const contractWithSigner = contractInstace.connect(signer)

    const maxSupplyPerWallet = await contractWithSigner.maxNFTsPerWallet()

    const bigNumberReturn = BigNumber.from(maxSupplyPerWallet._hex)

    const formattedMaxSupplyPerWallet = bigNumberReturn.toNumber()

    return formattedMaxSupplyPerWallet
  }
}

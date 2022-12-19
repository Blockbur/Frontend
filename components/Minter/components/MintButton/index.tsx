import { CircleNotch } from 'phosphor-react'

interface MintButtonProps {
  disableMint: boolean
  mintedByUserAmount: number
  maxSupplyPerUser: number
  walletAddress: string
  isMinting: boolean

  onMint: () => void
}

export function MintButton({
  disableMint,
  onMint,
  walletAddress,
  maxSupplyPerUser,
  mintedByUserAmount,
  isMinting,
}: MintButtonProps) {
  async function handleMintNft() {
    onMint()
  }

  return (
    <button
      disabled={disableMint || !walletAddress}
      onClick={handleMintNft}
      className="w-full py-4 not:disabled:bg-purple-gradient rounded-xl text-lg text-white font-bold shadow-lg disabled:cursor-not-allowed disabled:bg-gray500"
    >
      {isMinting ? (
        <div className="flex items-center gap-3 justify-center">
          <span>Minting...</span>
          <CircleNotch
            size={24}
            className="text-white animate-spin"
            weight="bold"
          />
        </div>
      ) : (
        <span>
          MINT (Minted: {mintedByUserAmount} / {maxSupplyPerUser})
        </span>
      )}
    </button>
  )
}

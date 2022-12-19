import { CircleNotch } from 'phosphor-react'
import { useState } from 'react'

interface ConnecWalletButtonProps {
  onConnect: () => Promise<void>
}

export function ConnecWalletButton({ onConnect }: ConnecWalletButtonProps) {
  const [isConnecting, setIsConnecting] = useState<boolean>(false)

  async function handleConnectWallet() {
    try {
      setIsConnecting(true)
      await onConnect()
      setIsConnecting(false)
    } catch (err) {
      setIsConnecting(false)
    }
  }

  return (
    <button
      onClick={handleConnectWallet}
      className="uppercase py-3 px-9 w-[262px] font-bold bg-purple-gradient rounded-xl shadow-lg"
    >
      {isConnecting ? (
        <div className="flex items-center gap-3">
          <span>Connecting...</span>
          <CircleNotch
            size={24}
            className="text-white animate-spin"
            weight="bold"
          />
        </div>
      ) : (
        <span>Connect wallet</span>
      )}
    </button>
  )
}

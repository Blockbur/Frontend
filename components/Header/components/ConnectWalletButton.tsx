interface ConnecWalletButtonProps {
  onConnect: () => Promise<void>
}

export function ConnecWalletButton({ onConnect }: ConnecWalletButtonProps) {
  async function handleConnectWallet() {
    onConnect()
  }

  return (
    <button
      onClick={handleConnectWallet}
      className="uppercase py-4 px-9 w-[262px] text-lg font-bold bg-purple-gradient rounded-xl shadow-lg"
    >
      Connect wallet
    </button>
  )
}

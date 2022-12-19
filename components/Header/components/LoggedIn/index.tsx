interface LoggedInProps {
  walletAddress: string
}

export function LoggedIn({ walletAddress }: LoggedInProps) {
  return (
    <div className="flex items-center gap-3 font-medium">
      <span className="text-xl text-white">wallet connected:</span>
      <strong className="text-xl text-transparent bg-purple-gradient bg-clip-text font-bold">
        {walletAddress.slice(0, 5) +
          '...' +
          walletAddress.slice(walletAddress.length - 4, walletAddress.length)}
      </strong>
    </div>
  )
}

import testNftImg from '../../assets/test-nft.png'

import { CaretRight, CaretLeft } from 'phosphor-react'
import Image from 'next/image'
import { useState } from 'react'

export function Minter() {
  const [totalSupply, setTotalSupply] = useState<number>(0)
  const [userNftsMinted, setUserNftsMinted] = useState<number>(0)
  const [amountOfNftsToBuy, setAmountOfNftsToBuy] = useState<number>(0)

  function handleIncreaseBuyAmount() {
    setAmountOfNftsToBuy((prevAmount) => prevAmount + 1)
  }

  function handleDecreaseBuyAmount() {
    setAmountOfNftsToBuy((prevAmount) => prevAmount - 1)
  }

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
            <CaretLeft className="text-white" size={48} weight="fill" />

            <span className="font-bold text-[32px]">{amountOfNftsToBuy}</span>

            <CaretRight className="text-white" size={48} weight="fill" />
          </div>
        </div>
        <div className="flex flex-col gap-4 font-medium">
          <span className="text-gray100 text-lg">Total supply: 12/45</span>
          <button className="w-full py-4 bg-purple-gradient rounded-xl text-lg text-white font-bold">
            MINT (Minted: 1/5)
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

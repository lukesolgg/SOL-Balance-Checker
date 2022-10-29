import type { NextPage } from 'next'
import { useState } from 'react'

import AddressForm from '../components/AddressForm'

import * as Web3 from '@solana/web3.js'

import Image from 'next/image'
import solprojects from '../public/solprojects.png'

import planet1 from '../public/planet1.png'
import planet2 from '../public/planet2.png'
import planet3 from '../public/planet3.png'

import shapes1 from '../public/shapes1.png'
import shapes2 from '../public/shapes2.png'
import shapes3 from '../public/shapes3.png'
import Link from 'next/link'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setIsExecutable] = useState(false);

  const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address)
      const key = new Web3.PublicKey(address)
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
      
      connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL)
      })

      connection.getAccountInfo(key).then(info => {
        setIsExecutable(info?.executable ?? false);
      })
    } catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }

  return (
    <div className='bg-[#17043E] h-screen w-full py-8 overflow-x-hidden relative flex flex-col text-center items-center justify-center text-white'>
      <header className='space-y-5 z-20 pt-[100px] lg:pt-0 px-5 lg:px-0'>
        
        <div className='mx-auto mb-10 z-20 w-[50%] lg:w-[100%]'>
          <Image src={solprojects} alt="sol projects image"/>
        </div>

        <div>
        <p className='text-3xl lg:text-5xl font-bold mb-5'>
          Check your <span className='bg-gradient-to-br from-[#9945FF] to-[#14F195] text-transparent bg-clip-text'>SOL</span> wallet balance
        </p>
        <p className='test-sm lg:text-xl font-bold mb-10'>Enter any SPL public address below to check the current balance</p>
        </div>

        <AddressForm handler={addressSubmittedHandler} />

        <p className='text-2xl font-bold'>Results:</p>
        <div className='bg-black/20 z-20 flex flex-row justify-evenly rounded-xl h-[300px]'>
        <div className='flex flex-col text-start my-auto font-bold space-y-4 text-sm lg:text-xl'>
        <p>{`Address:`}</p>
        <p>{`Balance:`}</p>
        <p>{`Is this account executable:`}</p>
        </div>
        <div className='flex flex-col text-end my-auto space-y-4'>
        <p>{`${address}`}</p>
        <p>{`${balance} SOL`}</p>
        <p>{`${isExecutable ? 'Yes' : 'No'}`}</p>
        </div>
        </div>
        <Link href="https://github.com/lukesolgg/SOL-Balance-Checker"><p className='text-2xl font-bold cursor-pointer pt-5'>
          Check out the source code <span className='bg-gradient-to-br from-[#9945FF] to-[#14F195] text-transparent bg-clip-text'>here</span>
        </p></Link>
      </header>
      <Image src={planet1} alt="top left planet" className='absolute top-0 left-[-150px] lg:left-[-50px] z-10' />
      <Image src={planet2} alt="bottom right planet" className='absolute bottom-0 right-[-150px] lg:right-[-50px] z-10' />
      <Image src={planet3} alt="top right planet" className='absolute top-0 right-[-100px] lg:right-[-50px] z-10' />
      
      <Image src={shapes1} alt="top left planet" className='absolute top-[-50px] left-[50px] z-0 hidden lg:flex' />
      <Image src={shapes2} alt="top left planet" className='absolute top-[50px] left-[-150px] z-0 hidden lg:flex' />
      <Image src={shapes3} alt="top left planet" className='absolute top-[100px] right-[-100px] z-0 hidden lg:flex' />
    </div>
  )
}

export default Home
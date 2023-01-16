import React from 'react'

import {signOut,useSession} from "next-auth/react"

function MiniProfile() {

    const {data:session} = useSession();

    console.log(session)


  return (
    <div className="flex items-center justify-between mt-19 ml-1">
        <img className='w-17 h-16 rounded-full border p-[2px]  mt-14 ml-10 'src={session?.user?.image} alt="" />

        <div >
            <h2 className='font-bold'>{session?.user?.username}</h2>
            <h3 className='text-sm text-gray-400'>Welcome to Insta!</h3>
        </div>

        <button onClick={signOut} className='text-blue-400 text-sm font-semibold'>
            Sign Out!
        </button>
    </div>
  )
}

export default MiniProfile

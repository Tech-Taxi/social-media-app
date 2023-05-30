import React from 'react'
import Feed from './Feed.jsx'

function Home() {
  return (
    <div className="flex m-4">
      <div className="w-1/3 bg--200"></div>
      <div className="w-1/3">
        <Feed />
      </div>
      <div className="w-1/3 bg--200"></div>
    </div>
  )
}

export default Home
import React from 'react'
import Post from './Post'

function Home() {
  return (
    <div className="flex m-4">
      <div className="w-1/3 bg--200"></div>
      <div className="w-1/3 bg-blue-200">
        <Post />
        <Post />
        <Post />
      </div>
      <div className="w-1/3 bg--200"></div>
    </div>
  )
}

export default Home
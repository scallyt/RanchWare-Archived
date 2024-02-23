import React, { useState } from 'react'

const HomePage = () => {
    const [count, setCount] = useState(0);

  return (
    <>
    <h1>HomePage</h1>
    <p>{count}</p>
    </>
  )
}

export default HomePage
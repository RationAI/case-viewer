import React from 'react'

interface Album {
  userId: number,
  id: number,
  title: string,
}

const FileTree = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums")
  // const albums: Album[] = await res.json()
  return (
    <div>FileTree</div>
  )
}

export default FileTree
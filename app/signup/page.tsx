"use client"
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignUp />
    </div>
  )
}

export default page
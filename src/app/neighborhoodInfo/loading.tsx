import React from 'react'
import './styleLoading.css'

export default function Loading() {
  return (
    <div className="loading-container" style={{ minHeight: '100vh' }}>
      <div className="spinner"></div>
    </div>
  )
}

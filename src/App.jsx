import { useState } from 'react'
import './index.css'

function App() {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    )
    setFiles(prev => [...prev, ...droppedFiles])
    setError(null)
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      file => file.type === 'application/pdf'
    )
    setFiles(prev => [...prev, ...selectedFiles])
    setError(null)
  }

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleCompare = async () => {
    if (files.length === 0) {
      setError('Please upload at least one PDF file')
      return
    }

    setIsProcessing(true)
    setError(null)
    setResults(null)

    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })

      console.log('ðŸ“¤ POST to:', `${apiUrl}/upload`)
      console.log('ðŸ”— API URL:', import.meta.env.VITE_API_URL)

      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(`Server error: ${response.status}\n${text.substring(0, 200)}`)
      }

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`)
      }

      setResults(data)
    } catch (err) {
      console.error('âŒ Error:', err)
      setError(err.message || 'Failed to compare quotes')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Vendor Quote Compare</h1>
        <p className="text-center text-gray-600 mb-8">Upload PDF quotes to compare pricing</p>

        <div className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
          onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
          <input type="file" id="fileInput" multiple accept="application/pdf" onChange={handleFileSelect} className="hidden" />
          <label htmlFor="fileInput" className="cursor-pointer block">
            <p className="text-lg text-gray-700 mb-2">Drag and drop PDF files here, or click to select</p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Uploaded Files ({files.length})</h2>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>{file.name}</span>
                  <button onClick={() => handleRemoveFile(index)} className="text-red-500">Remove</button>
                </li>
              ))}
            </ul>
            <button onClick={handleCompare} disabled={isProcessing}
              className={`mt-4 w-full py-3 px-6 rounded-lg font-semibold ${isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              {isProcessing ? 'Processing...' : 'Compare Quotes'}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-semibold">Error:</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {results && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Comparison Results</h2>
            {results.bestDeal && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-2xl font-bold text-green-800">
                  {results.bestDeal.vendorName} - ${results.bestDeal.totalPrice.toLocaleString()}
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">Lowest</p>
                <p className="text-xl font-bold">${results.lowestPrice?.toLocaleString() || 'N/A'}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-700">Average</p>
                <p className="text-xl font-bold">${results.averagePrice?.toLocaleString() || 'N/A'}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-700">Highest</p>
                <p className="text-xl font-bold">${results.highestPrice?.toLocaleString() || 'N/A'}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">Quotes</p>
                <p className="text-xl font-bold">{results.quotes?.length || 0}</p>
              </div>
            </div>
            {results.quotes?.map((quote, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg mb-2">
                <div className="flex justify-between">
                  <h4 className="text-lg font-semibold">{quote.vendorName || `Quote ${index + 1}`}</h4>
                  <span className="text-xl font-bold text-blue-600">${quote.totalPrice?.toLocaleString() || 'N/A'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 text-center">
          API: {apiUrl}
          {!import.meta.env.VITE_API_URL && <span className="text-red-500 ml-2">âš ï¸ Set VITE_API_URL in Vercel!</span>}
        </div>
      </div>
    </div>
  )
}

export default App

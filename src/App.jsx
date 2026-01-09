import { useState, useRef } from 'react'

function App() {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  // Get API URL from environment variable
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    )
    if (droppedFiles.length === 0 && e.dataTransfer.files.length > 0) {
      setError('Please upload PDF files only')
      return
    }
    addFiles(droppedFiles)
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      file => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    )
    if (selectedFiles.length === 0 && e.target.files.length > 0) {
      setError('Please upload PDF files only')
      return
    }
    addFiles(selectedFiles)
    // Reset input so same file can be selected again
    e.target.value = ''
  }

  const addFiles = (newFiles) => {
    if (newFiles.length === 0) return
    
    if (files.length + newFiles.length > 10) {
      setError('Maximum 10 files allowed')
      return
    }

    try {
      const filesWithIds = newFiles.map(file => ({
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB'
      }))

      setFiles(prev => [...prev, ...filesWithIds])
      setError(null)
      setResults(null)
    } catch (err) {
      console.error('Error adding files:', err)
      setError('Failed to add files. Please try again.')
    }
  }

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id))
    setError(null)
    setResults(null)
  }

  const handleCompare = async () => {
    if (files.length < 1) {
      setError('Please upload at least one PDF file')
      return
    }
    
    setIsProcessing(true)
    setError(null)
    setResults(null)
    
    try {
      const formData = new FormData()
      files.forEach(f => formData.append('files', f.file))

      console.log('📤 POST to:', `${apiUrl}/upload`)

      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
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
      console.error('❌ Error:', err)
      setError(err.message || 'Failed to compare quotes. Please check your connection.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">VendorCompare</h1>
            <p className="text-sm text-gray-600">AI-Powered Quote Comparison</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Compare Vendor Quotes <span className="text-blue-600">In Seconds</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Upload quotes in any format. AI extracts pricing automatically.
          </p>
          <div className="flex justify-center gap-3">
            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm">📄 PDF</span>
            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm">⚡ Fast</span>
            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm">🤖 AI-Powered</span>
          </div>
        </div>

        {/* Upload Box */}
        <div
          className={`border-2 border-dashed rounded-2xl p-12 mb-6 transition-all ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isDragging ? 'Drop Files Here' : 'Upload Vendor Quotes'}
            </h3>
            <p className="text-gray-600 mb-4">Drag files or click button below</p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors"
            >
              Choose Files
            </button>

            <p className="text-sm text-gray-500 mt-4">PDF files only • Max 10 files</p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Files ({files.length}/10)</h3>
              <button onClick={() => { setFiles([]); setResults(null); setError(null); }} className="text-sm text-red-600 hover:underline">
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {files.map(file => (
                <div key={file.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900 font-medium truncate flex-1">{file.name}</span>
                  <span className="text-gray-500 text-sm mr-3">{file.size}</span>
                  <button onClick={() => removeFile(file.id)} className="text-red-600 hover:text-red-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800 font-semibold">Error:</p>
            <p className="text-red-600 text-sm mt-1 whitespace-pre-wrap">{error}</p>
          </div>
        )}

        {/* Compare Button */}
        {files.length > 0 && !results && (
          <div className="text-center">
            <button
              onClick={handleCompare}
              disabled={isProcessing}
              className={`px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all ${
                !isProcessing
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isProcessing ? 'Processing...' : `Compare ${files.length} Quote${files.length > 1 ? 's' : ''}`}
            </button>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Comparison Results</h3>
            
            {results.bestDeal && (
              <div className="mb-6 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                <p className="text-sm text-green-700 font-semibold mb-2">🏆 Best Deal</p>
                <p className="text-3xl font-bold text-green-800">
                  {results.bestDeal.vendorName} - ${results.bestDeal.totalPrice.toLocaleString()}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <p className="text-sm text-blue-700 mb-1">Lowest Price</p>
                <p className="text-2xl font-bold text-blue-800">
                  ${results.lowestPrice?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl text-center">
                <p className="text-sm text-purple-700 mb-1">Average Price</p>
                <p className="text-2xl font-bold text-purple-800">
                  ${results.averagePrice?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <p className="text-sm text-orange-700 mb-1">Highest Price</p>
                <p className="text-2xl font-bold text-orange-800">
                  ${results.highestPrice?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-700 mb-1">Total Quotes</p>
                <p className="text-2xl font-bold text-gray-800">
                  {results.quotes?.length || 0}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Individual Quotes</h4>
              {results.quotes?.map((quote, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-lg font-semibold text-gray-900">{quote.vendorName || `Quote ${index + 1}`}</h5>
                    <span className="text-2xl font-bold text-blue-600">
                      ${quote.totalPrice?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  {quote.items && quote.items.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {quote.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between text-sm text-gray-600">
                          <span>{item.description || item.name || 'Item'}</span>
                          <span>${item.price?.toLocaleString() || 'N/A'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {!results && (
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">10x</div>
              <div className="text-gray-600 text-sm">Faster</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
              <div className="text-gray-600 text-sm">Accurate</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">AI</div>
              <div className="text-gray-600 text-sm">Powered</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

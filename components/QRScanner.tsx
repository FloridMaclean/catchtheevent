'use client'

import { useState, useRef, useEffect } from 'react'
import { QrCode, CheckCircle, XCircle, AlertCircle, Camera, RefreshCw, Lock, Shield, Eye, EyeOff } from 'lucide-react'

interface QRScannerProps {
  onClose: () => void
}

interface VerificationResult {
  success: boolean
  message: string
  data?: any
  error?: string
  code?: string
}

interface StaffCredentials {
  username: string
  password: string
}

export default function QRScanner({ onClose }: QRScannerProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState<StaffCredentials>({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown')
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    // Check camera permission status on mount
    checkCameraPermission()
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const checkCameraPermission = async () => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const permission = await navigator.permissions.query({ name: 'camera' as PermissionName })
        setCameraPermission(permission.state)
        
        permission.onchange = () => {
          setCameraPermission(permission.state)
        }
      } else {
        // Fallback for browsers that don't support permissions API
        setCameraPermission('prompt')
      }
    } catch (error) {
      console.log('Permission API not supported, will prompt user')
      setCameraPermission('prompt')
    }
  }

  const requestCameraPermission = async () => {
    try {
      console.log('Requesting camera permission...')
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('getUserMedia not supported')
        return false
      }
      
      // Try to get a minimal camera stream to trigger permission request
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: false
      })
      
      console.log('Camera permission granted, stopping test stream...')
      stream.getTracks().forEach(track => track.stop()) // Stop immediately
      setCameraPermission('granted')
      return true
    } catch (error: any) {
      console.error('Camera permission request failed:', error)
      if (error.name === 'NotAllowedError') {
        setCameraPermission('denied')
      } else if (error.name === 'NotFoundError') {
        console.error('No camera found')
      } else if (error.name === 'NotSupportedError') {
        console.error('Camera not supported')
      }
      return false
    }
  }

  const testCameraAccess = async () => {
    try {
      console.log('Testing camera access...')
      
      // First, enumerate available devices
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices()
          const videoDevices = devices.filter(device => device.kind === 'videoinput')
          console.log('Available video devices:', videoDevices)
          
          if (videoDevices.length === 0) {
            setResult({
              success: false,
              message: 'No cameras found',
              error: 'No camera devices detected on this system.'
            })
            return
          }
        } catch (enumerateError) {
          console.log('Could not enumerate devices:', enumerateError)
        }
      }
      
      const hasPermission = await requestCameraPermission()
      if (hasPermission) {
        console.log('Camera test successful')
        setResult({
          success: true,
          message: 'Camera access test successful!',
          data: { test: true }
        })
      } else {
        console.log('Camera test failed')
        setResult({
          success: false,
          message: 'Camera test failed',
          error: 'Could not access camera. Please check permissions and try again.'
        })
      }
    } catch (error) {
      console.error('Camera test error:', error)
    }
  }

  const listAvailableCameras = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(device => device.kind === 'videoinput')
        
        console.log('Available cameras:', videoDevices)
        
        if (videoDevices.length > 0) {
          setResult({
            success: true,
            message: `Found ${videoDevices.length} camera(s)`,
            data: { 
              cameras: videoDevices.map(device => ({
                deviceId: device.deviceId,
                label: device.label || 'Unknown Camera',
                groupId: device.groupId
              }))
            }
          })
        } else {
          setResult({
            success: false,
            message: 'No cameras found',
            error: 'No camera devices detected on this system.'
          })
        }
      } else {
        setResult({
          success: false,
          message: 'Device enumeration not supported',
          error: 'Your browser does not support device enumeration.'
        })
      }
    } catch (error) {
      console.error('Error listing cameras:', error)
      setResult({
        success: false,
        message: 'Failed to list cameras',
        error: 'Error occurred while checking available cameras.'
      })
    }
  }

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthenticating(true)
    setAuthError('')
    
    try {
      // Simple authentication - in production, this should call an API
      if (credentials.username === 'staff' && credentials.password === 'event2025') {
        setIsAuthenticated(true)
        setAuthError('')
      } else {
        setAuthError('Invalid credentials. Please try again.')
      }
    } catch (error) {
      setAuthError('Authentication failed. Please try again.')
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCredentials({ username: '', password: '' })
    setAuthError('')
    if (isScanning) {
      stopScanning()
    }
  }

  const startScanning = async () => {
    try {
      setIsScanning(true)
      setResult(null)
      
      console.log('Starting camera access...')
      console.log('Camera permission status:', cameraPermission)
      console.log('User agent:', navigator.userAgent)
      console.log('HTTPS:', window.location.protocol === 'https:')
      
      // Check if we're on HTTPS (required for camera access in most browsers)
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        throw new Error('Camera access requires HTTPS or localhost')
      }
      
      // Check if camera permission is already denied
      if (cameraPermission === 'denied') {
        throw new Error('Camera access denied. Please enable camera permissions in your browser settings.')
      }
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser')
      }
      
      console.log('Requesting camera access...')
      
      // Try multiple camera access strategies
      let stream = null
      let lastError = null
      
      // Strategy 1: Basic video access
      try {
        console.log('Trying basic video access...')
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false
        })
        console.log('Basic camera access successful')
      } catch (error: any) {
        console.log('Basic camera access failed:', error?.name || 'Unknown', error?.message || 'Unknown error')
        lastError = error
      }
      
      // Strategy 2: Specific constraints
      if (!stream) {
        try {
          console.log('Trying constrained video access...')
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
              width: { ideal: 640 },
              height: { ideal: 480 }
            },
            audio: false
          })
          console.log('Constrained camera access successful')
        } catch (error: any) {
          console.log('Constrained camera access failed:', error?.name || 'Unknown', error?.message || 'Unknown error')
          lastError = error
        }
      }
      
      // Strategy 3: Environment-facing camera
      if (!stream) {
        try {
          console.log('Trying environment-facing camera...')
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
              facingMode: 'environment'
            },
            audio: false
          })
          console.log('Environment camera access successful')
        } catch (error: any) {
          console.log('Environment camera access failed:', error?.name || 'Unknown', error?.message || 'Unknown error')
          lastError = error
        }
      }
      
      // Strategy 4: User-facing camera
      if (!stream) {
        try {
          console.log('Trying user-facing camera...')
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
              facingMode: 'user'
            },
            audio: false
          })
          console.log('User camera access successful')
        } catch (error: any) {
          console.log('User camera access failed:', error?.name || 'Unknown', error?.message || 'Unknown error')
          lastError = error
        }
      }
      
      if (!stream) {
        throw lastError || new Error('All camera access strategies failed')
      }
      
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraPermission('granted')
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          console.log('Camera stream ready, video dimensions:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight)
          console.log('Video ready state:', videoRef.current?.readyState)
        }
        
        videoRef.current.onerror = (e) => {
          console.error('Video error:', e)
        }
        
        videoRef.current.oncanplay = () => {
          console.log('Video can play')
        }
        
        videoRef.current.oncanplaythrough = () => {
          console.log('Video can play through')
        }
        
        console.log('Camera stream set successfully')
        console.log('Stream tracks:', stream.getTracks().map(track => ({ kind: track.kind, enabled: track.enabled, readyState: track.readyState })))
      } else {
        throw new Error('Failed to set video stream')
      }
    } catch (error: any) {
      console.error('Error accessing camera:', error)
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      
      let errorMessage = 'Failed to access camera'
      let errorDetails = 'Camera access denied or not available'
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Camera access denied'
        errorDetails = 'Please allow camera access to scan QR codes. Look for a camera icon in your browser address bar and click "Allow".'
        setCameraPermission('denied')
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No camera found'
        errorDetails = 'No camera device detected on this device. Please check if your device has a camera.'
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Camera in use'
        errorDetails = 'Camera is being used by another application. Please close other apps using the camera (Zoom, Teams, etc.).'
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Camera not supported'
        errorDetails = 'Your browser does not support camera access. Please try Chrome, Firefox, or Safari.'
      } else if (error.name === 'AbortError') {
        errorMessage = 'Camera access aborted'
        errorDetails = 'Camera access was interrupted. Please try again.'
      } else if (error.name === 'SecurityError') {
        errorMessage = 'Security error'
        errorDetails = 'Camera access blocked due to security restrictions. Please check your browser security settings.'
      } else if (error.message.includes('Permission')) {
        errorMessage = 'Permission required'
        errorDetails = 'Camera permission is required. Please allow camera access when prompted.'
      } else if (error.message.includes('HTTPS')) {
        errorMessage = 'HTTPS required'
        errorDetails = 'Camera access requires a secure connection (HTTPS) or localhost.'
      }
      
      setResult({
        success: false,
        message: errorMessage,
        error: errorDetails
      })
      setIsScanning(false)
    }
  }

  const stopScanning = () => {
    setIsScanning(false)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const verifyQRCode = async (qrData: string) => {
    setIsVerifying(true)
    try {
      const response = await fetch('/api/verify-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrData }),
      })

      const result = await response.json()
      setResult(result)
      
      if (result.success) {
        stopScanning()
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Verification failed',
        error: 'Network error occurred'
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleManualInput = () => {
    const qrData = prompt('Enter QR code data manually:')
    if (qrData) {
      verifyQRCode(qrData)
    }
  }

  const resetScanner = () => {
    setResult(null)
    if (isScanning) {
      stopScanning()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <QrCode className="w-6 h-6 mr-2" />
              {isAuthenticated ? 'Staff QR Scanner' : 'QR Code Scanner'}
            </h2>
            <div className="flex items-center space-x-2">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-200 transition-colors p-2"
                  title="Logout"
                >
                  <Shield className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
          <p className="text-primary-100 mt-2">
            {isAuthenticated ? 'Authenticated staff access' : 'Staff authentication required'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Authentication Screen */}
          {!isAuthenticated && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Staff Authentication</h3>
              <p className="text-gray-600 mb-6">
                Please enter your staff credentials to access the QR scanner
              </p>
              
              <form onSubmit={handleAuthentication} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-left mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter username"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                {authError && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {authError}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuthenticating ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
              
              <div className="mt-6 text-xs text-gray-500">
                <p>Demo Credentials:</p>
                <p><strong>Username:</strong> staff</p>
                <p><strong>Password:</strong> event2025</p>
              </div>
            </div>
          )}

          {/* Main Scanner Interface */}
          {isAuthenticated && !isScanning && !result && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Welcome, Staff Member!</h3>
              <p className="text-gray-600 mb-6">
                You are now authenticated. Ready to scan QR codes for ticket verification.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={startScanning}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <Camera className="w-5 h-5 mr-2 inline" />
                  Start Scanning
                </button>
                <button
                  onClick={handleManualInput}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Manual Input
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
              
              {/* Camera Permission Status */}
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Camera Permission Status:</p>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${
                    cameraPermission === 'granted' ? 'bg-green-500' :
                    cameraPermission === 'denied' ? 'bg-red-500' :
                    cameraPermission === 'prompt' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {cameraPermission === 'granted' ? 'Granted' :
                     cameraPermission === 'denied' ? 'Denied' :
                     cameraPermission === 'prompt' ? 'Prompt Required' : 'Unknown'}
                  </span>
                </div>
                
                {cameraPermission === 'denied' && (
                  <div className="text-center">
                    <p className="text-sm text-red-600 mb-2">
                      Camera access denied. Please enable camera permissions in your browser settings.
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={requestCameraPermission}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        Request Permission
                      </button>
                      <button
                        onClick={testCameraAccess}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors ml-2"
                      >
                        Test Camera
                      </button>
                      <button
                        onClick={listAvailableCameras}
                        className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors ml-2"
                      >
                        List Cameras
                      </button>
                    </div>
                  </div>
                )}
                
                {cameraPermission === 'prompt' && (
                  <div className="text-center">
                    <p className="text-sm text-yellow-600 mb-2">
                      Camera permission not yet requested. Click "Start Scanning" to request access.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {isScanning && (
            <div className="text-center">
              <div className="relative mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-gray-900 rounded-lg"
                />
                <div className="absolute inset-0 border-2 border-primary-500 rounded-lg pointer-events-none">
                  <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary-500"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-primary-500"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-primary-500"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary-500"></div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Position QR code within the frame
              </p>
              <button
                onClick={stopScanning}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Stop Scanning
              </button>
            </div>
          )}

          {result && (
            <div className="text-center">
              {result.success ? (
                <div className="text-green-600">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ticket Verified!</h3>
                  <div className="text-left bg-green-50 p-4 rounded-lg text-sm">
                    <p><strong>Customer:</strong> {result.data.customerName}</p>
                    <p><strong>Email:</strong> {result.data.customerEmail}</p>
                    <p><strong>Phone:</strong> {result.data.customerPhone}</p>
                    <p><strong>License Plate:</strong> {result.data.customerLicensePlate || 'Not provided'}</p>
                    <p><strong>Event:</strong> {result.data.eventName}</p>
                    <p><strong>Ticket Type:</strong> {result.data.ticketType}</p>
                    <p><strong>Quantity:</strong> {result.data.quantity}</p>
                    <p><strong>Verified At:</strong> {new Date(result.data.verifiedAt).toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="text-red-600">
                  <XCircle className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Verification Failed</h3>
                  <p className="text-gray-700 mb-4">{result.message}</p>
                  {result.error && (
                    <div className="bg-red-50 p-3 rounded-lg text-sm">
                      <p><strong>Details:</strong> {result.error}</p>
                      {result.message === 'Camera access denied' && (
                        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-blue-800 text-xs">
                            <strong>How to fix:</strong> Look for a camera icon in your browser's address bar. 
                            Click it and select "Allow" for camera access, then try scanning again.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={resetScanner}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Scan Another Ticket
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close Scanner
                </button>
              </div>
            </div>
          )}

          {isVerifying && (
            <div className="text-center">
              <RefreshCw className="w-16 h-16 text-primary-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Verifying ticket...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

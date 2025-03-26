import { useState, useRef } from 'react'
import PhoneMockup, { PhoneModel } from './components/PhoneMockup'
import ControlPanel from './components/ControlPanel'
import useImageExport from './hooks/useImageExport'
import './App.css'

// 渐变背景类型
interface GradientBackground {
  color1: string
  color2: string
  angle: number
}

function App() {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState('#e9c7c0')
  const [backgroundGradient, setBackgroundGradient] = useState<GradientBackground | undefined>(undefined)
  const [phoneModel, setPhoneModel] = useState<PhoneModel>('iphone14')
  const [frameWidth, setFrameWidth] = useState<number>(280)
  const [frameHeight, setFrameHeight] = useState<number>(560)
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined)
  const [containerHeight, setContainerHeight] = useState<number>(500)
  const [screenshotTopOffset, setScreenshotTopOffset] = useState<number>(0)
  const [frameMargin, setFrameMargin] = useState({
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  })
  
  const mockupRef = useRef<HTMLDivElement>(null)
  const { exportToPng, copyToClipboard } = useImageExport<HTMLDivElement>(mockupRef as any, {
    filename: `phone-mockup-${new Date().getTime()}.png`,
    pixelRatio: 3,
  })

  const handleScreenshotUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setScreenshot(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }
  
  const handleBackgroundGradientChange = (gradient: GradientBackground | undefined) => {
    setBackgroundGradient(gradient)
  }
  
  const handleFrameSizeChange = (width: number, height: number) => {
    setFrameWidth(width)
    setFrameHeight(height)
  }
  
  const handleContainerSizeChange = (width: number, height: number) => {
    setContainerWidth(width === 0 ? undefined : width)
    setContainerHeight(height)
  }

  const handleScreenshotTopOffsetChange = (offset: number) => {
    setScreenshotTopOffset(offset)
  }

  const handleFrameMarginChange = (margin: typeof frameMargin) => {
    setFrameMargin(margin)
  }

  return (
    <div className="app-container">
      <h1 className="app-title">手机截图美化器</h1>
      
      <div className="app-content">
        <div className="preview-container" >
          <PhoneMockup
            mockupRef={mockupRef}
            model={phoneModel}
            screenshot={screenshot}
            backgroundColor={backgroundColor}
            backgroundGradient={backgroundGradient}
            frameWidth={frameWidth}
            frameHeight={frameHeight}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            screenshotTopOffset={screenshotTopOffset}
            frameMargin={frameMargin}
          />
        </div>
        
        <ControlPanel
          onScreenshotUpload={handleScreenshotUpload}
          onBackgroundColorChange={setBackgroundColor}
          onBackgroundGradientChange={handleBackgroundGradientChange}
          onPhoneModelChange={setPhoneModel}
          onFrameSizeChange={handleFrameSizeChange}
          onContainerSizeChange={handleContainerSizeChange}
          onScreenshotTopOffsetChange={handleScreenshotTopOffsetChange}
          onFrameMarginChange={handleFrameMarginChange}
          onExport={exportToPng}
          onCopy={copyToClipboard}
          backgroundColor={backgroundColor}
          backgroundGradient={backgroundGradient}
          frameWidth={frameWidth}
          frameHeight={frameHeight}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          screenshotTopOffset={screenshotTopOffset}
          frameMargin={frameMargin}
          phoneModel={phoneModel}
        />
      </div>

      <footer className="app-footer">
        <p>上传您的手机截图，添加精美外壳，调整背景色，导出分享！</p>
      </footer>
    </div>
  )
}

export default App

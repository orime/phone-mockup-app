import { useState, useRef } from 'react'
import PhoneMockup, { PhoneModel } from './components/PhoneMockup'
import ControlPanel from './components/ControlPanel'
import useImageExport from './hooks/useImageExport'
import './App.css'

function App() {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState('#e9c7c0')
  const [phoneModel, setPhoneModel] = useState<PhoneModel>('iphone14')
  
  const mockupRef = useRef<HTMLDivElement>(null)
  const { exportToPng, copyToClipboard } = useImageExport(mockupRef, {
    filename: `phone-mockup-${new Date().getTime()}.png`
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

  return (
    <div className="app-container">
      <h1 className="app-title">手机截图美化器</h1>
      
      <div className="app-content">
        <div className="preview-container" ref={mockupRef}>
          <PhoneMockup
            model={phoneModel}
            screenshot={screenshot}
            backgroundColor={backgroundColor}
          />
        </div>
        
        <ControlPanel
          onScreenshotUpload={handleScreenshotUpload}
          onBackgroundColorChange={setBackgroundColor}
          onPhoneModelChange={setPhoneModel}
          onExport={exportToPng}
          onCopy={copyToClipboard}
          backgroundColor={backgroundColor}
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

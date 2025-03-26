import { ChangeEvent, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { PhoneModel } from './PhoneMockup';
import '../styles/ControlPanel.css';

// 预设颜色方案
const colorPresets = [
  '#e9c7c0', // 粉色
  '#c9daf8', // 浅蓝色
  '#d7f8c9', // 淡绿色
  '#f8e6c9', // 米色
  '#e8c9f8', // 淡紫色
  '#f3f3f3', // 浅灰色
];

// 预设渐变方案
const gradientPresets = [
  { color1: '#e9c7c0', color2: '#c3a1e1', angle: 135 }, // 粉紫渐变
  { color1: '#a1c4fd', color2: '#c2e9fb', angle: 120 }, // 蓝色渐变
  { color1: '#d4fc79', color2: '#96e6a1', angle: 90 },  // 绿色渐变
  { color1: '#fff1eb', color2: '#ace0f9', angle: 180 }, // 白蓝渐变
  { color1: '#fad0c4', color2: '#ffd1ff', angle: 105 }, // 粉色渐变
  { color1: '#ffecd2', color2: '#fcb69f', angle: 60 },  // 橙色渐变
];

interface ControlPanelProps {
  onScreenshotUpload: (file: File) => void;
  onBackgroundColorChange: (color: string) => void;
  onBackgroundGradientChange: (gradient: { color1: string; color2: string; angle: number }) => void;
  onPhoneModelChange: (model: PhoneModel) => void;
  onFrameSizeChange: (width: number, height: number) => void;
  onContainerSizeChange: (width: number, height: number) => void;
  onExport: () => void;
  onCopy: () => void;
  backgroundColor: string;
  backgroundGradient?: {
    color1: string;
    color2: string;
    angle: number;
  };
  frameWidth: number;
  frameHeight: number;
  containerWidth?: number;
  containerHeight: number;
  phoneModel: PhoneModel;
}

const ControlPanel = ({
  onScreenshotUpload,
  onBackgroundColorChange,
  onBackgroundGradientChange,
  onPhoneModelChange,
  onFrameSizeChange,
  onContainerSizeChange,
  onExport,
  onCopy,
  backgroundColor,
  backgroundGradient,
  frameWidth,
  frameHeight,
  containerWidth,
  containerHeight,
  phoneModel
}: ControlPanelProps) => {
  const [useGradient, setUseGradient] = useState<boolean>(!!backgroundGradient);
  const [activeColorPicker, setActiveColorPicker] = useState<'solid' | 'gradient1' | 'gradient2' | null>(null);
  const [showSizeControls, setShowSizeControls] = useState<boolean>(true); // 默认展开
  
  // 当前渐变设置
  const currentGradient = backgroundGradient || gradientPresets[0];
  
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onScreenshotUpload(files[0]);
    }
  };
  
  const handleGradientToggle = () => {
    const newUseGradient = !useGradient;
    setUseGradient(newUseGradient);
    
    if (newUseGradient) {
      // 启用渐变时，应用默认渐变或之前的渐变设置
      onBackgroundGradientChange(backgroundGradient || gradientPresets[0]);
    } else {
      // 禁用渐变时将渐变设置为undefined
      onBackgroundGradientChange(undefined as any);
    }
  };
  
  const handleGradientAngleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAngle = parseInt(e.target.value, 10) || 0;
    onBackgroundGradientChange({
      ...currentGradient,
      angle: newAngle
    });
  };
  
  const handleGradientColor1Change = (color: string) => {
    onBackgroundGradientChange({
      ...currentGradient,
      color1: color
    });
  };
  
  const handleGradientColor2Change = (color: string) => {
    onBackgroundGradientChange({
      ...currentGradient,
      color2: color
    });
  };
  
  const handleFrameWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value, 10) || frameWidth;
    onFrameSizeChange(width, frameHeight);
  };
  
  const handleFrameHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value, 10) || frameHeight;
    onFrameSizeChange(frameWidth, height);
  };
  
  const handleContainerWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value, 10) || 0;
    onContainerSizeChange(width, containerHeight);
  };
  
  const handleContainerHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value, 10) || containerHeight;
    onContainerSizeChange(containerWidth || 0, height);
  };
  
  const applyColorPreset = (color: string) => {
    onBackgroundColorChange(color);
  };
  
  const applyGradientPreset = (preset: typeof gradientPresets[0]) => {
    onBackgroundGradientChange(preset);
  };

  return (
    <div className="control-panel">
      <div className="control-section">
        <h3>上传截图</h3>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileUpload} 
          className="file-input"
        />
      </div>

      <div className="control-section">
        <h3>背景样式</h3>
        <div className="background-type-toggle">
          <button 
            className={`toggle-button ${!useGradient ? 'active' : ''}`}
            onClick={() => setUseGradient(false)}
          >
            纯色
          </button>
          <button 
            className={`toggle-button ${useGradient ? 'active' : ''}`}
            onClick={() => setUseGradient(true)}
          >
            渐变
          </button>
        </div>
        
        {!useGradient ? (
          // 纯色背景设置
          <div className="color-picker-container">
            <div className="color-preview-box" style={{ backgroundColor }} onClick={() => setActiveColorPicker('solid')} />
            <input 
              type="text" 
              value={backgroundColor} 
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="color-input"
            />
            
            {/* 预设颜色 */}
            <div className="color-presets">
              <h4>预设颜色</h4>
              <div className="preset-colors">
                {colorPresets.map((color, index) => (
                  <div 
                    key={index}
                    className={`preset-color ${backgroundColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => applyColorPreset(color)}
                  />
                ))}
              </div>
            </div>
            
            {activeColorPicker === 'solid' && (
              <div className="color-picker-popup">
                <div className="color-picker-close" onClick={() => setActiveColorPicker(null)}>×</div>
                <HexColorPicker color={backgroundColor} onChange={onBackgroundColorChange} />
              </div>
            )}
          </div>
        ) : (
          // 渐变背景设置
          <div className="gradient-controls">
            <div className="gradient-preview" style={{ 
              background: `linear-gradient(${currentGradient.angle}deg, ${currentGradient.color1}, ${currentGradient.color2})`
            }}></div>
            
            {/* 预设渐变 */}
            <div className="preset-gradients">
              <h4>预设渐变</h4>
              <div className="preset-gradients-container">
                {gradientPresets.map((preset, index) => (
                  <div 
                    key={index}
                    className="preset-gradient"
                    style={{ 
                      background: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})` 
                    }}
                    onClick={() => applyGradientPreset(preset)}
                  />
                ))}
              </div>
            </div>
            
            <div className="gradient-colors">
              <div className="color-picker-container">
                <label>颜色1</label>
                <div 
                  className="color-preview-box" 
                  style={{ backgroundColor: currentGradient.color1 }} 
                  onClick={() => setActiveColorPicker('gradient1')}
                />
                <input 
                  type="text" 
                  value={currentGradient.color1} 
                  onChange={(e) => handleGradientColor1Change(e.target.value)}
                  className="color-input small"
                />
                {activeColorPicker === 'gradient1' && (
                  <div className="color-picker-popup">
                    <div className="color-picker-close" onClick={() => setActiveColorPicker(null)}>×</div>
                    <HexColorPicker color={currentGradient.color1} onChange={handleGradientColor1Change} />
                  </div>
                )}
              </div>
              
              <div className="color-picker-container">
                <label>颜色2</label>
                <div 
                  className="color-preview-box" 
                  style={{ backgroundColor: currentGradient.color2 }} 
                  onClick={() => setActiveColorPicker('gradient2')}
                />
                <input 
                  type="text" 
                  value={currentGradient.color2} 
                  onChange={(e) => handleGradientColor2Change(e.target.value)}
                  className="color-input small"
                />
                {activeColorPicker === 'gradient2' && (
                  <div className="color-picker-popup">
                    <div className="color-picker-close" onClick={() => setActiveColorPicker(null)}>×</div>
                    <HexColorPicker color={currentGradient.color2} onChange={handleGradientColor2Change} />
                  </div>
                )}
              </div>
            </div>
            
            <div className="gradient-angle">
              <label>角度: {currentGradient.angle}°</label>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={currentGradient.angle} 
                onChange={handleGradientAngleChange}
                className="angle-slider"
              />
            </div>
          </div>
        )}
      </div>

      <div className="control-section">
        <div className="section-header">
          <h3>尺寸设置</h3>
          <button 
            className="toggle-section-button"
            onClick={() => setShowSizeControls(!showSizeControls)}
          >
            {showSizeControls ? '收起' : '展开'}
          </button>
        </div>
        
        {showSizeControls && (
          <div className="size-controls">
            <div className="size-control-group">
              <h4>手机外框尺寸</h4>
              <div className="size-inputs">
                <div className="size-input-container">
                  <label>宽度: {frameWidth}px</label>
                  <div className="size-input-with-controls">
                    <input 
                      type="range" 
                      min="200" 
                      max="500" 
                      value={frameWidth} 
                      onChange={handleFrameWidthChange}
                      className="size-slider"
                    />
                  </div>
                  <div className="size-input-number-controls">
                    <button 
                      className="size-adjust-button"
                      onClick={() => onFrameSizeChange(Math.max(200, frameWidth - 10), frameHeight)}
                    >-</button>
                    <input 
                      type="number" 
                      value={frameWidth} 
                      onChange={handleFrameWidthChange}
                      className="size-input"
                      min="200"
                      max="500"
                    />
                    <button 
                      className="size-adjust-button"
                      onClick={() => onFrameSizeChange(Math.min(500, frameWidth + 10), frameHeight)}
                    >+</button>
                  </div>
                </div>
                
                <div className="size-input-container">
                  <label>高度: {frameHeight}px</label>
                  <div className="size-input-with-controls">
                    <input 
                      type="range" 
                      min="400" 
                      max="900" 
                      value={frameHeight} 
                      onChange={handleFrameHeightChange}
                      className="size-slider"
                    />
                  </div>
                  <div className="size-input-number-controls">
                    <button 
                      className="size-adjust-button"
                      onClick={() => onFrameSizeChange(frameWidth, Math.max(400, frameHeight - 20))}
                    >-</button>
                    <input 
                      type="number" 
                      value={frameHeight} 
                      onChange={handleFrameHeightChange}
                      className="size-input"
                      min="400"
                      max="900"
                    />
                    <button 
                      className="size-adjust-button"
                      onClick={() => onFrameSizeChange(frameWidth, Math.min(900, frameHeight + 20))}
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="size-control-group">
              <h4>背景容器尺寸</h4>
              <div className="size-inputs">
                <div className="size-input-container">
                  <label>宽度: {containerWidth || '自适应'}px</label>
                  <div className="size-input-with-controls">
                    <input 
                      type="range" 
                      min="0" 
                      max="1200" 
                      value={containerWidth || 0} 
                      onChange={handleContainerWidthChange}
                      className="size-slider"
                    />
                  </div>
                  <div className="size-input-number-controls">
                    <button 
                      className="size-adjust-button"
                      onClick={() => onContainerSizeChange(Math.max(0, (containerWidth || 0) - 20), containerHeight)}
                    >-</button>
                    <input 
                      type="number" 
                      value={containerWidth || ''}
                      placeholder="自适应"
                      onChange={handleContainerWidthChange}
                      className="size-input"
                      min="0"
                      max="1200"
                    />
                    <button 
                      className="size-adjust-button"
                      onClick={() => onContainerSizeChange(Math.min(1200, (containerWidth || 0) + 20), containerHeight)}
                    >+</button>
                  </div>
                </div>
                
                <div className="size-input-container">
                  <label>高度: {containerHeight}px</label>
                  <div className="size-input-with-controls">
                    <input 
                      type="range" 
                      min="300" 
                      max="1000" 
                      value={containerHeight} 
                      onChange={handleContainerHeightChange}
                      className="size-slider"
                    />
                  </div>
                  <div className="size-input-number-controls">
                    <button 
                      className="size-adjust-button"
                      onClick={() => onContainerSizeChange(containerWidth || 0, Math.max(300, containerHeight - 20))}
                    >-</button>
                    <input 
                      type="number" 
                      value={containerHeight} 
                      onChange={handleContainerHeightChange}
                      className="size-input"
                      min="300"
                      max="1000"
                    />
                    <button 
                      className="size-adjust-button"
                      onClick={() => onContainerSizeChange(containerWidth || 0, Math.min(1000, containerHeight + 20))}
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="control-section">
        <h3>手机型号</h3>
        <div className="phone-model-selector">
          <button 
            className={`model-button ${phoneModel === 'iphone14' ? 'active' : ''}`}
            onClick={() => onPhoneModelChange('iphone14')}
          >
            iPhone 14
          </button>
          <button 
            className={`model-button ${phoneModel === 'iphone15' ? 'active' : ''}`}
            onClick={() => onPhoneModelChange('iphone15')}
          >
            iPhone 15
          </button>
          <button 
            className={`model-button ${phoneModel === 'android' ? 'active' : ''}`}
            onClick={() => onPhoneModelChange('android')}
          >
            安卓
          </button>
        </div>
      </div>

      <div className="control-section">
        <h3>导出选项</h3>
        <div className="export-buttons">
          <button className="export-button" onClick={onExport}>
            下载图片
          </button>
          <button className="export-button" onClick={onCopy}>
            复制到剪贴板
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel; 
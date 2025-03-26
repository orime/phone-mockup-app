import { ChangeEvent, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { PhoneModel } from './PhoneMockup';
import '../styles/ControlPanel.css';

// 预设颜色方案
const colorPresets = [
  // 柔和系列
  '#e9c7c0', // 柔和粉色
  '#c9daf8', // 柔和蓝色
  '#d7f8c9', // 柔和绿色
  '#f8e6c9', // 温暖米色
  '#e8c9f8', // 柔和紫色
  '#f3f3f3', // 浅灰色
  
  // 清新系列
  '#a8e6cf', // 薄荷绿
  '#dcedc1', // 嫩芽绿
  '#ffd3b6', // 蜜桃橙
  '#ffaaa5', // 珊瑚粉
  '#ff8b94', // 草莓粉
  
  // 高级系列
  '#d4e4bc', // 抹茶绿
  '#f6c5af', // 珊瑚橙
  '#b6c9f0', // 星空蓝
  '#e2b6cf', // 藕荷粉
  '#f2d5f8', // 梦幻紫
  
  // 温暖系列
  '#ffe5d9', // 奶油色
  '#ffd7ba', // 杏色
  '#fec89a', // 蜜糖色
  '#fec5bb', // 蜜桃色
  '#fcd5ce', // 珊瑚色
  
  // 冷色系列
  '#bde0fe', // 天空蓝
  '#a2d2ff', // 海洋蓝
  '#caf0f8', // 冰川蓝
  '#b8f2e6', // 薄荷绿
  '#aed9e0', // 湖水蓝
];

// 预设渐变方案
const gradientPresets = [
  // 温柔渐变
  { color1: '#e9c7c0', color2: '#c3a1e1', angle: 135 }, // 粉紫渐变
  { color1: '#a1c4fd', color2: '#c2e9fb', angle: 120 }, // 蓝色渐变
  { color1: '#d4fc79', color2: '#96e6a1', angle: 90 },  // 绿色渐变
  { color1: '#fff1eb', color2: '#ace0f9', angle: 180 }, // 白蓝渐变
  { color1: '#fad0c4', color2: '#ffd1ff', angle: 105 }, // 粉色渐变
  { color1: '#ffecd2', color2: '#fcb69f', angle: 60 },  // 橙色渐变
  
  // 梦幻渐变
  { color1: '#a8edea', color2: '#fed6e3', angle: 45 },  // 薄荷粉
  { color1: '#d299c2', color2: '#fef9d7', angle: 135 }, // 紫金
  { color1: '#f5efef', color2: '#feada6', angle: 180 }, // 奶油橙
  { color1: '#a1c4fd', color2: '#c2e9fb', angle: 160 }, // 天空蓝
  { color1: '#f6d5f7', color2: '#fbe9d7', angle: 90 },  // 梦幻粉
  
  // 高级渐变
  { color1: '#e6dee9', color2: '#bdc2e8', angle: 150 }, // 高级紫
  { color1: '#e3fdf5', color2: '#ffe6fa', angle: 120 }, // 薄荷粉
  { color1: '#fff1eb', color2: '#ace0f9', angle: 45 },  // 奶油蓝
  { color1: '#ffe5d9', color2: '#ffd7ba', angle: 70 },  // 温暖橙
  { color1: '#dbdcd7', color2: '#dddcd7', angle: 30 },  // 高级灰
  
  // 自然渐变
  { color1: '#96fbc4', color2: '#f9f586', angle: 135 }, // 春日青
  { color1: '#fbc2eb', color2: '#a6c1ee', angle: 180 }, // 晚霞紫
  { color1: '#a8edea', color2: '#fed6e3', angle: 90 },  // 海洋粉
  { color1: '#d4fc79', color2: '#96e6a1', angle: 60 },  // 青草绿
  { color1: '#84fab0', color2: '#8fd3f4', angle: 120 }, // 清晨蓝
];

interface ControlPanelProps {
  onScreenshotUpload: (file: File) => void;
  onBackgroundColorChange: (color: string) => void;
  onBackgroundGradientChange: (gradient: { color1: string; color2: string; angle: number }) => void;
  onPhoneModelChange: (model: PhoneModel) => void;
  onFrameSizeChange: (width: number, height: number) => void;
  onContainerSizeChange: (width: number, height: number) => void;
  onScreenshotTopOffsetChange: (offset: number) => void;
  onFrameMarginChange: (margin: { top: number; right: number; bottom: number; left: number }) => void;
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
  screenshotTopOffset: number;
  frameMargin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  phoneModel: PhoneModel;
}

const ControlPanel = ({
  onScreenshotUpload,
  onBackgroundColorChange,
  onBackgroundGradientChange,
  onPhoneModelChange,
  onFrameSizeChange,
  onContainerSizeChange,
  onScreenshotTopOffsetChange,
  onFrameMarginChange,
  onExport,
  onCopy,
  backgroundColor,
  backgroundGradient,
  frameWidth,
  frameHeight,
  containerWidth,
  containerHeight,
  screenshotTopOffset,
  frameMargin,
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
  
  // const handleGradientToggle = () => {
  //   const newUseGradient = !useGradient;
  //   setUseGradient(newUseGradient);
    
  //   if (newUseGradient) {
  //     // 启用渐变时，应用默认渐变或之前的渐变设置
  //     onBackgroundGradientChange(backgroundGradient || gradientPresets[0]);
  //   } else {
  //     // 禁用渐变时将渐变设置为undefined
  //     onBackgroundGradientChange(undefined as any);
  //   }
  // };
  
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
  
  const handleTopOffsetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const offset = parseInt(e.target.value, 10) || 0;
    onScreenshotTopOffsetChange(Math.max(0, offset));
  };
  
  const handleMarginChange = (type: 'top-bottom' | 'left-right', value: number) => {
    if (type === 'top-bottom') {
      onFrameMarginChange({
        ...frameMargin,
        top: Math.max(0, value),
        bottom: Math.max(0, value)
      });
    } else {
      onFrameMarginChange({
        ...frameMargin,
        left: Math.max(0, value),
        right: Math.max(0, value)
      });
    }
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
              
              {/* 柔和系列 */}
              <div className="color-presets-group">
                <div className="color-category">柔和系列</div>
                <div className="preset-colors">
                  {colorPresets.slice(0, 6).map((color, index) => (
                    <div 
                      key={index}
                      className={`preset-color ${backgroundColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => applyColorPreset(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              {/* 清新系列 */}
              <div className="color-presets-group">
                <div className="color-category">清新系列</div>
                <div className="preset-colors">
                  {colorPresets.slice(6, 11).map((color, index) => (
                    <div 
                      key={index + 6}
                      className={`preset-color ${backgroundColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => applyColorPreset(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              {/* 高级系列 */}
              <div className="color-presets-group">
                <div className="color-category">高级系列</div>
                <div className="preset-colors">
                  {colorPresets.slice(11, 16).map((color, index) => (
                    <div 
                      key={index + 11}
                      className={`preset-color ${backgroundColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => applyColorPreset(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              {/* 温暖系列 */}
              <div className="color-presets-group">
                <div className="color-category">温暖系列</div>
                <div className="preset-colors">
                  {colorPresets.slice(16, 21).map((color, index) => (
                    <div 
                      key={index + 16}
                      className={`preset-color ${backgroundColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => applyColorPreset(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              {/* 冷色系列 */}
              <div className="color-presets-group">
                <div className="color-category">冷色系列</div>
                <div className="preset-colors">
                  {colorPresets.slice(21).map((color, index) => (
                    <div 
                      key={index + 21}
                      className={`preset-color ${backgroundColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => applyColorPreset(color)}
                      title={color}
                    />
                  ))}
                </div>
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
              
              {/* 温柔渐变 */}
              <div className="color-presets-group">
                <div className="color-category">温柔渐变</div>
                <div className="preset-gradients-container">
                  {gradientPresets.slice(0, 6).map((preset, index) => (
                    <div 
                      key={index}
                      className="preset-gradient"
                      style={{ 
                        background: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})` 
                      }}
                      onClick={() => applyGradientPreset(preset)}
                      title={`从 ${preset.color1} 到 ${preset.color2}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* 梦幻渐变 */}
              <div className="color-presets-group">
                <div className="color-category">梦幻渐变</div>
                <div className="preset-gradients-container">
                  {gradientPresets.slice(6, 11).map((preset, index) => (
                    <div 
                      key={index + 6}
                      className="preset-gradient"
                      style={{ 
                        background: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})` 
                      }}
                      onClick={() => applyGradientPreset(preset)}
                      title={`从 ${preset.color1} 到 ${preset.color2}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* 高级渐变 */}
              <div className="color-presets-group">
                <div className="color-category">高级渐变</div>
                <div className="preset-gradients-container">
                  {gradientPresets.slice(11, 16).map((preset, index) => (
                    <div 
                      key={index + 11}
                      className="preset-gradient"
                      style={{ 
                        background: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})` 
                      }}
                      onClick={() => applyGradientPreset(preset)}
                      title={`从 ${preset.color1} 到 ${preset.color2}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* 自然渐变 */}
              <div className="color-presets-group">
                <div className="color-category">自然渐变</div>
                <div className="preset-gradients-container">
                  {gradientPresets.slice(16).map((preset, index) => (
                    <div 
                      key={index + 16}
                      className="preset-gradient"
                      style={{ 
                        background: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})` 
                      }}
                      onClick={() => applyGradientPreset(preset)}
                      title={`从 ${preset.color1} 到 ${preset.color2}`}
                    />
                  ))}
                </div>
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
              <h4>截图位置</h4>
              <div className="size-inputs">
                <div className="size-input-container">
                  <label>顶部距离: {screenshotTopOffset}px</label>
                  <div className="size-input-with-controls">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={screenshotTopOffset} 
                      onChange={handleTopOffsetChange}
                      className="size-slider"
                    />
                  </div>
                  <div className="size-input-number-controls">
                    <button 
                      className="size-adjust-button"
                      onClick={() => onScreenshotTopOffsetChange(Math.max(0, screenshotTopOffset - 5))}
                    >-</button>
                    <input 
                      type="number" 
                      value={screenshotTopOffset} 
                      onChange={handleTopOffsetChange}
                      className="size-input"
                      min="0"
                      max="100"
                    />
                    <button 
                      className="size-adjust-button"
                      onClick={() => onScreenshotTopOffsetChange(Math.min(100, screenshotTopOffset + 5))}
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

            <div className="size-control-group">
              <h4>外框边距</h4>
              <div className="size-inputs">
                
                <div className="size-input-container">
                  <label>上下边距: {frameMargin.bottom}px</label>
                  <div className="size-input-with-controls">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={frameMargin.bottom} 
                      onChange={(e) => handleMarginChange('top-bottom', parseInt(e.target.value))}
                      className="size-slider"
                    />
                  </div>
                </div>
                
                <div className="size-input-container">
                  <label>左右边距: {frameMargin.left}px</label>
                  <div className="size-input-with-controls">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={frameMargin.left} 
                      onChange={(e) => handleMarginChange('left-right', parseInt(e.target.value))}
                      className="size-slider"
                    />
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
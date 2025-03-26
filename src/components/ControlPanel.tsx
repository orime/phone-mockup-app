import { ChangeEvent } from 'react';
import { HexColorPicker } from 'react-colorful';
import { PhoneModel } from './PhoneMockup';
import '../styles/ControlPanel.css';

interface ControlPanelProps {
  onScreenshotUpload: (file: File) => void;
  onBackgroundColorChange: (color: string) => void;
  onPhoneModelChange: (model: PhoneModel) => void;
  onExport: () => void;
  onCopy: () => void;
  backgroundColor: string;
  phoneModel: PhoneModel;
}

const ControlPanel = ({
  onScreenshotUpload,
  onBackgroundColorChange,
  onPhoneModelChange,
  onExport,
  onCopy,
  backgroundColor,
  phoneModel
}: ControlPanelProps) => {
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onScreenshotUpload(files[0]);
    }
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
        <h3>背景颜色</h3>
        <HexColorPicker color={backgroundColor} onChange={onBackgroundColorChange} />
        <input 
          type="text" 
          value={backgroundColor} 
          onChange={(e) => onBackgroundColorChange(e.target.value)}
          className="color-input"
        />
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
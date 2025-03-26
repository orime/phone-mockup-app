import { ReactNode, useRef, useState, useEffect } from 'react';
import PhoneNotch from './PhoneNotch';
import PhoneStatusBar from './PhoneStatusBar';
import '../styles/PhoneMockup.css';

export type PhoneModel = 'iphone14' | 'iphone15' | 'android';

interface PhoneMockupProps {
  model: PhoneModel;
  screenshot: string | null;
  backgroundColor: string;
  backgroundGradient?: {
    color1: string;
    color2: string;
    angle: number;
  };
  frameWidth?: number;
  frameHeight?: number;
  containerWidth?: number;
  containerHeight?: number;
  children?: ReactNode;
}

const PhoneMockup = ({ 
  model, 
  screenshot, 
  backgroundColor,
  backgroundGradient,
  frameWidth = 280,
  frameHeight = 560,
  containerWidth,
  containerHeight = 500,
  children 
}: PhoneMockupProps) => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // 背景样式，支持纯色或渐变
  const backgroundStyle = backgroundGradient 
    ? { 
        background: `linear-gradient(${backgroundGradient.angle}deg, ${backgroundGradient.color1}, ${backgroundGradient.color2})`,
        width: containerWidth ? `${containerWidth}px` : '100%',
        minHeight: `${containerHeight}px`
      }
    : { 
        background: backgroundColor,
        width: containerWidth ? `${containerWidth}px` : '100%',
        minHeight: `${containerHeight}px`
      };
  
  // 手机框样式
  const phoneFrameStyle = {
    width: `${frameWidth}px`,
    height: `${frameHeight}px`
  };
  
  // 处理高度调整的拖拽事件
  const handleHeightDragStart = () => {
    setIsDragging(true);
  };
  
  const handleHeightDragEnd = () => {
    setIsDragging(false);
  };
  
  const handleHeightDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      // 根据鼠标移动位置调整内容显示比例
      const newHeight = Math.max(40, Math.min(100, contentHeight + e.movementY * 0.2));
      setContentHeight(newHeight);
    }
  };
  
  // 监听全局鼠标事件，确保拖拽时也能捕获移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newHeight = Math.max(40, Math.min(100, contentHeight + e.movementY * 0.2));
        setContentHeight(newHeight);
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, contentHeight]);
  
  return (
    <div 
      ref={mockupRef}
      className="phone-mockup-container"
      style={backgroundStyle}
    >
      <div 
        className={`phone-frame ${model}`}
        style={phoneFrameStyle}
      >
        <div className="phone-screen">
          <PhoneStatusBar model={model} />
          
          {screenshot && (
            <div 
              className="screenshot-container" 
              style={{ height: `${contentHeight}%` }}
            >
              <img 
                src={screenshot} 
                alt="Phone screenshot" 
                className="phone-screenshot"
              />
            </div>
          )}
          
          {!screenshot && (
            <div className="placeholder-text">
              请上传手机截图
            </div>
          )}
          
          <PhoneNotch model={model} />
          
          {screenshot && (
            <div 
              className={`height-adjuster ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleHeightDragStart}
              onMouseUp={handleHeightDragEnd}
              onMouseMove={handleHeightDrag}
            >
              <div className="handle-indicator"></div>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PhoneMockup; 
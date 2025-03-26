import { ReactNode, useRef } from 'react';
import PhoneNotch from './PhoneNotch';
import '../styles/PhoneMockup.css';

export type PhoneModel = 'iphone14' | 'iphone15' | 'android';

interface PhoneMockupProps {
  model: PhoneModel;
  screenshot: string | null;
  backgroundColor: string;
  children?: ReactNode;
}

const PhoneMockup = ({ 
  model, 
  screenshot, 
  backgroundColor,
  children 
}: PhoneMockupProps) => {
  const mockupRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={mockupRef}
      className="phone-mockup-container"
      style={{ background: backgroundColor }}
    >
      <div className={`phone-frame ${model}`}>
        <div className="phone-screen">
          {screenshot && (
            <img 
              src={screenshot} 
              alt="Phone screenshot" 
              className="phone-screenshot"
            />
          )}
          {!screenshot && (
            <div className="placeholder-text">
              请上传手机截图
            </div>
          )}
          <PhoneNotch model={model} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default PhoneMockup; 
import { useState, useEffect } from 'react';
import { PhoneModel } from './PhoneMockup';
import '../styles/PhoneStatusBar.css';

interface PhoneStatusBarProps {
  model: PhoneModel;
  initialBattery?: number; // 电池百分比，0-100
  initialSignal?: number; // 信号强度，0-4
}

const PhoneStatusBar = ({
  model,
  initialBattery = 48,
  initialSignal = 4
}: PhoneStatusBarProps) => {
  const [time, setTime] = useState<string>('');
  const [battery] = useState<number>(initialBattery);
  const [signal] = useState<number>(initialSignal);
  
  // 设置当前时间
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime(); // 立即执行一次
    const interval = setInterval(updateTime, 60000); // 每分钟更新一次

    return () => clearInterval(interval);
  }, []);

  // 根据手机型号决定状态栏样式
  const isIOS = model === 'iphone14' || model === 'iphone15';

  return (
    <div className={`phone-status-bar ${model}`}>
      {isIOS ? (
        // iOS 样式状态栏
        <>
          <div className="status-bar-left">
            <span className="status-time">{time}</span>
          </div>
          
          <div className="status-bar-right">
            <div className="signal-icon ios">
              <div className="signal-bars">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`signal-bar ${i < signal ? 'active' : ''}`} />
                ))}
              </div>
            </div>
            
            {/* <div className="wifi-icon ios">
              <div className="wifi-wave"></div>
              <div className="wifi-wave"></div>
              <div className="wifi-wave"></div>
            </div> */}
            
            <div className="battery-icon ios">
              <div className="battery-body">
                <div className="battery-level" style={{ width: `${battery}%` }}></div>
              </div>
              <div className="battery-cap"></div>
            </div>
          </div>
        </>
      ) : (
        // Android 样式状态栏
        <>
          <div className="status-bar-left">
            <span className="status-time">{time}</span>
          </div>
          
          <div className="status-bar-right">
            <div className="signal-icon android">
              <div className="signal-triangle"></div>
              <div className="signal-triangle"></div>
            </div>
            
            <div className="wifi-icon android">
              <div className="wifi-arc"></div>
              <div className="wifi-arc"></div>
              <div className="wifi-arc"></div>
            </div>
            
            <div className="battery-icon android">
              <div className="battery-body">
                <div className="battery-level" style={{ width: `${battery}%` }}></div>
              </div>
            </div>
            <span className="battery-percentage">{battery}%</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneStatusBar; 
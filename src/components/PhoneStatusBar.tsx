import { useState, useEffect } from 'react';
import '../styles/PhoneStatusBar.css';

interface PhoneStatusBarProps {
  initialBattery?: number; // 电池百分比，0-100
  initialSignal?: number; // 信号强度，0-4
  initialWifi?: boolean; // 是否显示WiFi图标
}

const PhoneStatusBar = ({
  initialBattery = 48,
  initialSignal = 4,
  initialWifi = true
}: PhoneStatusBarProps) => {
  const [time, setTime] = useState<string>('');
  const [battery, setBattery] = useState<number>(initialBattery);
  const [signal, setSignal] = useState<number>(initialSignal);
  const [wifi, setWifi] = useState<boolean>(initialWifi);

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

  return (
    <div className="phone-status-bar">
      <div className="status-bar-left">
        <span className="status-time">{time}</span>
      </div>
      <div className="status-bar-right">
        {/* {wifi && <span className="status-wifi">📶</span>} */}
        <span className="status-signal">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`signal-bar ${i < signal ? 'active' : ''}`}
            />
          ))}
        </span>
        <span className="status-battery">
          <div className="battery-icon">
            <div 
              className="battery-level" 
              style={{width: `${battery}%`}}
            />
          </div>
          <span className="battery-percentage">{battery}%</span>
        </span>
      </div>
    </div>
  );
};

export default PhoneStatusBar; 
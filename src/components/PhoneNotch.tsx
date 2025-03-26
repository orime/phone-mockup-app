import { PhoneModel } from './PhoneMockup';
import '../styles/PhoneNotch.css';

interface PhoneNotchProps {
  model: PhoneModel;
}

const PhoneNotch = ({ model }: PhoneNotchProps) => {
  // 只为iPhone型号渲染刘海
  if (model === 'android') {
    return (
      <div className="phone-android-camera">
        <div className="camera-dot" />
      </div>
    );
  }

  return (
    <div className={`phone-notch ${model}`}>
      <div className="notch-content">
        <div className="notch-speaker" />
        <div className="notch-camera" />
      </div>
    </div>
  );
};

export default PhoneNotch; 
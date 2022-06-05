import { useMemo } from 'react';
import './ChartBar.css';

const ChartBar = (props) => {
  const barFillHeight = useMemo(() => {
    if (props.maxValue > 0) {
      return Math.round((props.value / props.maxValue) * 100) + '%';
    }
    return '0%';
  }, [props]);

  return (
    <div className='chart-bar'>
      <div className='chart-bar__inner'>
        <div
          className='chart-bar__fill'
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className='chart-bar__label'>{props.label}</div>
    </div>
  );
};

export default ChartBar;

import { useMemo } from 'react';
import ChartBar from './ChartBar';
import './Chart.css';

const Chart = (props) => {
  const dataPointValues = useMemo(() => {
    return props.dataPoints.map((dataPoint) => dataPoint.value);
  }, [props]);

  const totalMax = useMemo(() => {
    return Math.max(...dataPointValues);
  }, [dataPointValues]);

  return (
    <div className='chart'>
      {props.dataPoints.map((dataPoint) => {
        return (
          <ChartBar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={totalMax}
            label={dataPoint.label}
          />
        );
      })}
    </div>
  );
};

export default Chart;

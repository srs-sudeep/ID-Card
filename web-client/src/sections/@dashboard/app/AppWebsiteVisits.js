import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { useChart } from '../../../components/chart';

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {
  // Generate labels for the last seven days
  const currentDate = new Date();
  const labels = [];
  for (let i = 6; i >= 0; i-=1) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString()); // You can format the date as needed
  }
  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: '50%', // Adjust columnWidth as needed
      },
    },
    fill: {
      type: chartData.map((i) => i.fill),
    },
    labels, // Use the generated labels
    xaxis: {
      type: 'datetime',
    },
    dataLabels: {
      enabled: true,
      formatter: (val
       ) => (val === 0 ? 'NO DATA' : val),

    },
  });
  

  return (
    <Card {...other} sx={{ width: '100%' }}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="bar" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

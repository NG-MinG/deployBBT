import React, { useEffect, useState } from 'react';

import classes from './Dashboard.module.css';
import Calendar from '../Calendar';
import {toDateFormat, toPriceFormat} from '../../utils/format'
import AnalystCard from './AnalystCard';
import Activities from './Activities';
import Chart from 'react-apexcharts'
import axios from 'axios';

const Dashboard = () => {

  const [currentChart, setCurrentChart] = useState('price');

  const [series, setSeries] = useState([
    {
      name: 'series1',
      data: []
    }
  ]);
  
  const [options, setOption] = useState({
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'date',
      categories: []
    },
    tooltip: {
      x: {
        format: 'dd/MM/yyyy'
      },
    }
  });

  const [analystData, setAnalystData] = useState({
    total_price: 0,
    total_bus_type: 0,
    total_customer: 0,
    total_ticket: 0
  });

  const [queryDate, setQueryDate] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/admin/analyst?q=${queryDate}`)
    .then (res => {
      setAnalystData(res.data);
    })
    .catch(err => console.log(err));
  }, [queryDate]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/admin/ticket-history/ticketHistory`)
    .then (res => {
      const date = new Date();
      const startDate = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().split('T')[0].split('-').reverse().join('/');
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0].split('-').reverse().join('/');

      const count = {};
      
      count[startDate] = 0;
      count[endDate] = 0

      const listHistory = res.data.data.ticketHistory.filter(el => el.stage !== 'Đã huỷ');
      listHistory.forEach(el => {
        const cdate = toDateFormat(new Date(el.date.split('/').reverse().join('-')), '/');
        if (currentChart === 'price')
          count[cdate] = count[cdate] ? count[cdate] + el.total_price : el.total_price;

        if (currentChart === 'ticket') {
          count[cdate] = count[cdate] ? count[cdate] + el.number_of_seats : el.number_of_seats;
        }
      });

      const ordered = Object.keys(count).sort().reduce(
        (obj, key) => { 
          obj[key] = count[key];

          return obj;
        }, 
        {}
      );

      setOption(prev => ({...prev, xaxis: {
          type: 'date',
          categories: [...Object.keys(ordered)]
        }
      }));

      let title = '';
      if (currentChart === 'price')
        title = 'Tổng doanh thu'

      if (currentChart === 'ticket')
        title = 'Tổng số vé bán ra'

      setSeries([{name: title, data: Object.values(ordered)}]);
    
    })
    .catch(err => console.log(err));
  }, [currentChart]);

  // console.log(queryDate);

    return <div className={classes.main_content} style={{padding: '0rem 1rem'}}>
      {/* <h1 className={classes.dashboard_title}>Dashboard</h1> */}
      <div className={classes.dashboard_section} style={{ justifyContent: 'space-between' }}>
        <Calendar onChange={setQueryDate} />
        <div className={classes.dashboard_analyst}>
          <div className={classes.dashboard_analyst_container}>
            <AnalystCard style={{cursor: 'pointer'}} onClick={() => setCurrentChart('price')} title={'Doanh thu'} value={`${toPriceFormat(analystData.total_price)}đ`} yellow />
            <AnalystCard title={'Loại xe'} value={`${analystData.total_bus_type}`} blue />
          </div>
          <div className={classes.dashboard_analyst_container}>
            <AnalystCard title={'Khách hàng'} value={`${analystData.total_customer}`} green />
            <AnalystCard style={{cursor: 'pointer'}} onClick={() => setCurrentChart('ticket')} title={'Số vé bán ra'} value={`${analystData.total_ticket}`} red />
          </div>
        </div>
      </div>
      <div className={classes.dashboard_section} style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <Activities />
        <Chart options={options} series={series} type="area" height={350} width={710} />
      </div>
    </div>;
  };
  
  export default Dashboard;
  
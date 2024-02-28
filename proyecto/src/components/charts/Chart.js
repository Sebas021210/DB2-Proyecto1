import React, { useEffect, useState, useRef } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

import { useUser } from '../../global/id_rol.js';



const chartUser = {
  embedUrl: 'https://charts.mongodb.com/charts-project-0-zgxqe',
  id: '65db92a1-096d-4e6e-846b-3051f14d663b',
  load: (chart) => {
    console.log('Chart is loaded');
  }
};

const chartOwner = {
  embedUrl: 'https://charts.mongodb.com/charts-project-0-zgxqe',
  id: 'fd2c9b41-af67-4135-9dcb-319969a58c29',
  load: (chart) => {
    console.log('Chart is loaded');
  }
};

export function Chart() {
  const { id, rol } = useUser();
  const div = useRef(null);
  const [dashboardInstance, setDashboardInstance] = useState(null);
  console.log('Rol:', rol);
  useEffect(() => {
    const fetchData = async () => {
      let dashboard;
      
      if (rol === 0 || rol === 1) {
        console.log(rol, id);
        const sdk = new ChartsEmbedSDK({
          baseUrl: chartOwner.embedUrl
        });
        dashboard = sdk.createDashboard({
          dashboardId: chartOwner.id,
          container: div
        });
        console.log('Dashboard:', dashboard);
      } else if (rol === 2) {
        const sdk = new ChartsEmbedSDK({
          baseUrl: chartUser.embedUrl
        });
        dashboard = sdk.createDashboard({
          dashboardId: chartUser.id,
          container: div
        });
      }
      console.log("pre dashboard");
      if (dashboard) {
        console.log('Dashboard:', dashboard);
        await dashboard.render(div);
        setDashboardInstance(dashboard);
        dashboard.refresh();
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (dashboardInstance) {
        dashboardInstance.remove();
      }
    };
  }, []);

  return (
    <div id='dashboard'></div>
  );
}export default Chart;  
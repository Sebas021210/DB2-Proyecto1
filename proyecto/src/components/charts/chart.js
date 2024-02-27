import React, { useEffect, useState } from 'react';

import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

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


export default function chart(props) {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    let dashboard;

    if (props.rol === 0 || props.rol === 1) {
      const sdk = new ChartsEmbedSDK({
        baseUrl: chartOwner.embedUrl
      });
      const dashboard = sdk.createDashboard({
        dashboardId: chartOwner.id
      });
      dashboard.render(document.getElementById('dashboard'));
      setDashboard(dashboard);

      const filterManager = dashboard.getFilterManager();
      filterManager.removeFilter('_id');
      filterManager.removeFilter('id_usuario');
  
      filterManager.addFilter({
        name: '_id',
        operator: 'equals',
        value: props.id
      });
  
      filterManager.addFilter({
        name: 'id_usuario',
        operator: 'equals',
        value: props.id
      });
  
      filterManager.apply();
      dashboard.refresh();


    }else if(props.rol === 2){
      const sdk = new ChartsEmbedSDK({
        baseUrl: chartUser.embedUrl
      });
      const dashboard = sdk.createDashboard({
        dashboardId: chartUser.id
      });
      dashboard.render(document.getElementById('dashboard'));
      setDashboard(dashboard);

      const filterManager = dashboard.getFilterManager();
      
      filterManager.removeFilter('id_usuario');
  
      filterManager.addFilter({
        name: 'id_usuario',
        operator: 'equals',
        value: props.id
      });
  
      filterManager.apply();
      dashboard.refresh();
    }

    return () => {
      if (dashboard) {
        dashboard.remove();
      }
    };
  }, []);

  return (
    <div id="dashboard"></div>
  );
}

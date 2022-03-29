import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import CustomDateComponent from './customDateComponent.js';
import CustomEditorComponent from './customEditorComponent.js';

const App = () => {
  const [rowData, setRowData] = useState(null);

  const filterParams = {
    comparator: function(filterLocalDateAtMidnight, cellValue) {
      var dateAsString = cellValue;
      var dateParts = dateAsString.split('/');
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    }
  };

  const frameworkComponents = {
    agDateInput: CustomDateComponent,
    customEditor: CustomEditorComponent
  };
  const defaultColDef = {
    editable: true,
    filter: true,
    flex: 1,
    floatingFilter: true
  };

  const onGridReady = params => {
    setRowData([
      { date: '24/08/2008' },
      { date: '24/08/2020' },
      { date: '09/07/2020' }
    ]);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        defaultColDef={defaultColDef}
        frameworkComponents={frameworkComponents}
        onGridReady={onGridReady}
        popupParent={document.body}
      >
        <AgGridColumn
          field="date"
          filter={'agDateColumnFilter'}
          cellEditor={'customEditor'}
          filterParams={filterParams}
        />
      </AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById('root'));

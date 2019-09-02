import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';

export default class SimpleAction extends React.Component {
    render() {
        const { columns, data, handleAgregar } = this.props
      return (
        <MaterialTable
        title=""
        columns={columns}
        data={data}       
        actions={[
          {
            icon: 'add',
            tooltip: 'Agregar',
            isFreeAction: true,
            onClick: (event) => handleAgregar
          }
        ]}
      />
        
      )
    }
  }
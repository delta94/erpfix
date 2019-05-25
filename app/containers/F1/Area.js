import React from 'react';
import CRUD from './data/CRUD';
import { defaultDate } from '../../service';

class CRUD_Master extends React.Component 
{
  render() 
  {
    const params = {
      source: 'area',
      primaryKey: 'akode',
    
      dataColumn: [
        { name: 'no', label: 'No', initialValue: '', width: '80', hidden: false }, 
        { name: 'akode', label: 'Kode', initialValue: '', width: '80', hidden: false }, 
        { name: 'anama', label: 'Nama', initialValue: '', width: '80', hidden: false }, 
        { name: 'acatatan', label: 'Catatan', initialValue: '', width: 'auto', hidden: false }, 
        { name: 'aaktif', label: 'Aktif', initialValue: '', width: 'auto', hidden: false },
        { name: 'ainputuser', label: '', initialValue: '0', width: '', hidden: true },
        { name: 'ainputtgl', label: '', initialValue: defaultDate, width: '', hidden: true },
        { name: 'amodifikasiuser', label: '', initialValue: '0', width: '', hidden: true },
        { name: 'amodifikasitgl', label: '', initialValue: defaultDate, width: '', hidden: true },
      ],

      dataFormatDate: ['ainputtgl', 'amodifikasitgl'],
    
      inputForm: [
        {id: 'akode', type: 'text', width: 100, label: 'Kode', placeholder: 'Kode',},
        {id: 'anama', type: 'text', width: 100, label: 'nama', placeholder: 'Nama'},
        {id: 'acatatan', type: 'text', width: 200, label: 'Catatan', placeholder: 'Catatan'},
        {id: 'aaktif', type: 'text',width: 200,label: 'Aktif', placeholder: 'Aktif'},
      ],
    
      inputFilter: [
        {id: 'akode', type: 'text', width: 100, label: 'Kode', placeholder: 'Kode'},
        {id: 'anama', type: 'text', width: 100, label: 'nama', placeholder: 'Nama'},
        {id: 'acatatan', type: 'text', width: 200, label: 'Catatan', placeholder: 'Catatan'},
      ],
    
      // Pagging
      paramFilterGlobal: (val) => `akode LIKE "%${val}%" OR anama LIKE "%${val}%" OR acatatan LIKE "%${val}%"`,
      sort: `akode ASC`,
      limit: 4,
    }

    return (<CRUD params={params} />);
  }
}

export default CRUD_Master;
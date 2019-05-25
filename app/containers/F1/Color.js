import React from 'react';
import CRUD from './data/CRUD';
import { defaultDate } from '../../service';

class CRUD_Master extends React.Component 
{
  render() 
  {
    const params = {
      source: 'color',
      primaryKey: 'ckode',
    
      dataColumn: [
        { name: 'no', label: 'No', initialValue: '', width: '80', hidden: false }, 
        { name: 'ckode', label: 'Kode', initialValue: '', width: '80', hidden: false }, 
        { name: 'cnama', label: 'Nama', initialValue: '', width: '80', hidden: false }, 
        { name: 'ccatatan', label: 'Catatan', initialValue: '', width: 'auto', hidden: false }, 
        { name: 'caktif', label: 'Aktif', initialValue: '', width: 'auto', hidden: false },
        { name: 'cinputtgl', label: '', initialValue: defaultDate, width: '', hidden: true },
        { name: 'cmodifikasiuser', label: '', initialValue: '0', width: '', hidden: true },
        { name: 'cmodifikasitgl', label: '', initialValue: defaultDate, width: '', hidden: true },
      ],

      dataFormatDate: ['cinputtgl', 'cmodifikasitgl'],
    
      inputForm: [
        {id: 'ckode', type: 'text', width: 100, label: 'Kode', placeholder: 'Kode',},
        {id: 'cnama', type: 'text', width: 100, label: 'nama', placeholder: 'Nama'},
        {id: 'ccatatan', type: 'text', width: 200, label: 'Catatan', placeholder: 'Catatan'},
        {id: 'caktif', type: 'text',width: 200,label: 'Aktif',placeholder: 'Catatan'},
      ],
    
      inputFilter: [
        {id: 'ckode', type: 'text', width: 100, label: 'Kode', placeholder: 'Kode'},
        {id: 'cnama', type: 'text', width: 100, label: 'nama', placeholder: 'Nama'},
        {id: 'ccatatan', type: 'text', width: 200, label: 'Catatan', placeholder: 'Catatan'},
      ],
    
      // Pagging
      paramFilterGlobal: (val) => `ckode LIKE "%${val}%" OR cnama LIKE "%${val}%" OR ccatatan LIKE "%${val}%"`,
      sort: `ckode ASC`,
      limit: 4,
    }

    return (<CRUD params={params} />);
  }
}

export default CRUD_Master;
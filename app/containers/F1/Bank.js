import React from 'react';
import CRUD from './data/CRUD';
import { defaultDate } from '../../service';

class CRUD_Master extends React.Component 
{
  render() 
  {
    const params = {
      source: 'bank',
      primaryKey: 'bkode',
    
      dataColumn: [
        { name: 'no', label: 'No', initialValue: '', width: '80', hidden: false }, 
        { name: 'bkode', label: 'Kode', initialValue: '', width: '80', hidden: false }, 
        { name: 'bnama', label: 'Nama', initialValue: '', width: '80', hidden: false }, 
        { name: 'bcatatan', label: 'Catatan', initialValue: '', width: 'auto', hidden: false }, 
        { name: 'baktif', label: 'Aktif', initialValue: '', width: 'auto', hidden: false },
        { name: 'binputuser', label: '', initialValue: '0', width: '', hidden: true },
        { name: 'binputtgl', label: '', initialValue: defaultDate, width: '', hidden: true },
        { name: 'bmodifikasiuser', label: '', initialValue: '0', width: '', hidden: true },
        { name: 'bmodifikasitgl', label: '', initialValue: defaultDate, width: '', hidden: true },
      ],

      dataFormatDate: ['binputtgl', 'bmodifikasitgl'],
    
      inputForm: [
        {id: 'bkode', type: 'text', width: 100, label: 'Kode', placeholder: 'Kode',},
        {id: 'bnama', type: 'text', width: 100, label: 'nama', placeholder: 'Nama'},
        {id: 'bcatatan', type: 'text', width: 200, label: 'Catatan', placeholder: 'Catatan'},
        {id: 'baktif', type: 'text', width: 200, label: 'Aktif', placeholder: 'Aktif'},
      ],
    
      inputFilter: [
        {id: 'bkode', type: 'text', width: 100, label: 'Kode', placeholder: 'Kode'},
        {id: 'bnama', type: 'text', width: 100, label: 'nama', placeholder: 'Nama'},
        {id: 'bcatatan', type: 'text', width: 200, label: 'Catatan', placeholder: 'Catatan'},
      ],
    
      // Pagging
      paramFilterGlobal: (val) => `bkode LIKE "%${val}%" OR bnama LIKE "%${val}%" OR bcatatan LIKE "%${val}%"`,
      sort: `bkode ASC`,
      limit: 4,
    }

    return (<CRUD params={params} />);
  }
}

export default CRUD_Master;
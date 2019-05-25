import React from 'react';
import CRUD from './data/CRUD';
import { defaultDate } from '../../service';

class CRUD_Master extends React.Component 
{
  render() 
  {
    const params = { //asdf
      source: 'country',
      primaryKey: 'ckode',
    
      dataColumn: [
        { name: 'no', label: 'No', initialValue: '', width: '80', hidden: false },
        { name: 'ckode', label: 'Kode', initialValue: '', width: 'auto', hidden: false },
        { name: 'cnama', label: 'Nama', initialValue: '', width: 'auto', hidden: false },
        { name: 'ccatatan', label: 'Catatan', initialValue: '', width: 'auto', hidden: false },
        { name: 'caktif', label: 'Aktif', initialValue: '', width: 'auto', hidden: false },
        { name: 'cinputuser', label: 'cinputuser', initialValue: '', width: 'auto', hidden: true },
        { name: 'cinputtgl', label: 'cinputtgl', initialValue: defaultDate, width: 'auto', hidden: true },
        { name: 'cmodifikasiuser', label: 'cmodifikasiuser', initialValue: '', width: 'auto', hidden: true },
        { name: 'cmodifikasitgl', label: 'cmodifikasitgl', initialValue: defaultDate, width: 'auto', hidden: true },
      ],

      dataFormatDate: ['cinputtgl', 'cmodifikasitgl'],
    
      inputForm: [
        { id: 'ckode', type: 'text', width: '200%', label: 'Kode', placeholder: 'Kode'},
        { id: 'cnama', type: 'text', width: '200%', label: 'Nama', placeholder: 'Nama'},
        { id: 'ccatatan', type: 'text', width: '200%', label: 'Catatan', placeholder: 'Catatan'},
        { id: 'caktif', type: 'text', width: '200%', label: 'Aktif', placeholder: 'Aktif'}
      ],
    
      inputFilter: [
        { id: 'ckode', type: 'text', width: '200%', label: 'Kode', placeholder: 'Kode'},
        { id: 'cnama', type: 'text', width: '200%', label: 'Nama', placeholder: 'Nama'},
        { id: 'ccatatan', type: 'text', width: '200%', label: 'Catatan', placeholder: 'Catatan'},
        { id: 'caktif', type: 'text', width: '200%', label: 'Aktif', placeholder: 'Aktif'}
      ],
    
      // Pagging
      paramFilterGlobal: (val) => `ckode LIKE "%${val}%" OR cnama LIKE "%${val}%" OR ccatatan LIKE "%${val}%" OR caktif LIKE "%${val}%" OR cinputuser LIKE "%${val}%" OR cinputtgl LIKE "%${val}%" OR cmodifikasiuser LIKE "%${val}%" OR cmodifikasitgl LIKE "%${val}%"`,
      sort: `ckode`,
      limit: 4,
    }

    return (
<CRUD params={params} />);
  }
}

export default CRUD_Master;
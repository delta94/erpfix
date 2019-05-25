import React from 'react';
import CRUD from './data/CRUD';
import { defaultDate } from '../../service';

class CRUD_Master extends React.Component 
{
  render() 
  {
    const params = {
      source: 'branch',
      primaryKey: 'bkode',
    
      dataColumn: [
        { name: 'no', label: 'No', initialValue: '', width: '80', hidden: false },
        { name: 'bkode', label: 'Kode', initialValue: '', width: 'auto', hidden: false },
        { name: 'bnama', label: 'Nama', initialValue: '', width: 'auto', hidden: false },
        { name: 'balamat1', label: 'Alamat1', initialValue: '', width: 'auto', hidden: false },
        { name: 'balamat2', label: 'Alamat2', initialValue: '', width: 'auto', hidden: false },
        { name: 'bkota', label: 'Kota', initialValue: '', width: 'auto', hidden: false },
        { name: 'bkodepos', label: 'Kodepos', initialValue: '', width: 'auto', hidden: false },
        { name: 'bnotelp', label: 'Notelp', initialValue: '', width: 'auto', hidden: false },
        { name: 'bnofax', label: 'Nofax', initialValue: '', width: 'auto', hidden: false },
        { name: 'bcatatan', label: 'Catatan', initialValue: '', width: 'auto', hidden: false },
        { name: 'baktif', label: 'Aktif', initialValue: '', width: 'auto', hidden: false },
      ],

      dataFormatDate: ['binputtgl', 'bmodifikasitgl'],
    
      inputForm: [
        { id: 'bkode', type: 'text', width: '200%', label: 'Kode', placeholder: 'Kode'},
        { id: 'bnama', type: 'text', width: '200%', label: 'Nama', placeholder: 'Nama'},
        { id: 'balamat1', type: 'text', width: '200%', label: 'Alamat1', placeholder: 'Alamat1'},
        { id: 'balamat2', type: 'text', width: '200%', label: 'Alamat2', placeholder: 'Alamat2'},
        { id: 'bkota', type: 'text', width: '200%', label: 'Kota', placeholder: 'Kota'},
        { id: 'bkodepos', type: 'text', width: '200%', label: 'Kodepos', placeholder: 'Kodepos'},
        { id: 'bnotelp', type: 'text', width: '200%', label: 'Notelp', placeholder: 'Notelp'},
        { id: 'bnofax', type: 'text', width: '200%', label: 'Nofax', placeholder: 'Nofax'},
        { id: 'bcatatan', type: 'text', width: '200%', label: 'Catatan', placeholder: 'Catatan'},
        { id: 'baktif', type: 'text', width: '200%', label: 'Aktif', placeholder: 'Aktif'}
      ],
    
      inputFilter: [
        { id: 'bkode', type: 'text', width: '200%', label: 'Kode', placeholder: 'Kode'},
        { id: 'bnama', type: 'text', width: '200%', label: 'Nama', placeholder: 'Nama'},
        { id: 'balamat1', type: 'text', width: '200%', label: 'Alamat1', placeholder: 'Alamat1'},
        { id: 'balamat2', type: 'text', width: '200%', label: 'Alamat2', placeholder: 'Alamat2'},
        { id: 'bkota', type: 'text', width: '200%', label: 'Kota', placeholder: 'Kota'},
        { id: 'bkodepos', type: 'text', width: '200%', label: 'Kodepos', placeholder: 'Kodepos'},
        { id: 'bnotelp', type: 'text', width: '200%', label: 'Notelp', placeholder: 'Notelp'},
        { id: 'bnofax', type: 'text', width: '200%', label: 'Nofax', placeholder: 'Nofax'},
        { id: 'bcatatan', type: 'text', width: '200%', label: 'Catatan', placeholder: 'Catatan'},
        { id: 'baktif', type: 'text', width: '200%', label: 'Aktif', placeholder: 'Aktif'}
      ],
    
      // Pagging
      paramFilterGlobal: (val) => `bkode LIKE "%${val}%" OR bnama LIKE "%${val}%" OR balamat1 LIKE "%${val}%" OR balamat2 LIKE "%${val}%" OR bkota LIKE "%${val}%" OR bkodepos LIKE "%${val}%" OR bnotelp LIKE "%${val}%" OR bnofax LIKE "%${val}%" OR bcatatan LIKE "%${val}%" OR baktif LIKE "%${val}%" OR binputuser LIKE "%${val}%" OR binputtgl LIKE "%${val}%" OR bmodifikasiuser LIKE "%${val}%" OR bmodifikasitgl LIKE "%${val}%"`,
      sort: `bkode`,
      limit: 4,
    }

    return (
<CRUD params={params} />);
  }
}

export default CRUD_Master;
'use client'

import { useEffect, useState } from 'react';

import server from './admin-company.api';
import { Companies, FormItems } from '@/global/type';
import { ArrayBuffer2Base64, MailCheck, PhoneCheck, formInput } from '@/utils/input';
import Modal from '@/components/modal/modal.component';
import Form from '@/components/form/form.component';
import Table, { TableLineActions } from '@/components/table/table.component';
import './admin-company.part.css';
import { useRouter } from 'next/navigation';
import Alert from '@/components/alert/alert.component';

export default function Page() {

  const router = useRouter();

  const [addModalShown, setAddModalShown] = useState(false);
  const [editModalShown, setEditModalShown] = useState(false);
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [exportModalShown, setExportModalShown] = useState(false);
  const [alertShown, setAlertShown] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'>('info');
  const alert = (message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark') => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertShown(true);
  }
  const alertClear = () => {
    setAlertMessage("");
    setAlertShown(false);
  }

  const [add_form_error_msg, setAddFormErrorMsg] = useState('');
  const [del_targets, setDelTargets] = useState<string | string[]>();
  const [refresh, setRefresh] = useState(false);
  const [lisence, setLisence] = useState<null | File>(null);
  const [checked_id_list, setCheckedIdList] = useState<string[]>([]);
  const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  const [table_head, setTableHead] = useState<Array<string>>(['编号', '企业名称', '联系电话', '联系邮箱']);
  const [table_line_actions, setTableLineActions] = useState<TableLineActions>([
    {
      type: 'danger', text: '删除',
      action_function: (id: string) => {
        setDelTargets(id);
        setDeleteModalShown(true);
      }
    }
  ]);


  // useEffect(() => {
  //   server.fetchCompanies()
  //     .then(res => {
  //       setTableBody(res.map(x => [x.id, x.name, x.phone, x.mail]));
  //     });
  // }, []);
  useEffect(() => {
    server.fetchCompanies()
      .then(res => {
        setTableBody(res.map(x => [x.id, x.name, x.phone, x.mail]));
      });
  }, [refresh]);

  const add_form_items: FormItems = [
    { label: '企业名称', type: 'input' },
    { label: '联系电话', type: 'input' },
    { label: '联系邮箱', type: 'input' },
    {
      label: '营业执照', type: 'file', fileTypeRestricted: ['.pdf'],
      fileTackleFunction: (event) => {
        const files = event.currentTarget.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        setLisence(() => file);
      }
    },
  ];
  const edit_form_items: FormItems = [
    { label: '企业名称', type: 'input' },
    { label: '联系电话', type: 'input' },
    { label: '联系邮箱', type: 'input' },
    {
      label: '营业执照', type: 'file', fileTypeRestricted: ['.pdf'], fileTackleFunction(event) {
        const files = event.currentTarget.files;
        if (!files || files.length === 0) return;
        const file = files[0];
      },
    },
  ];

  const checkChangeRecall = (id_list: string[]) => {
    setCheckedIdList(id_list);
    console.log(id_list);
    console.log(checked_id_list);
  }
  const saveAdd = async () => {
    let form_value = formInput(document.getElementById('add-form') as HTMLElement).slice(0, -1);
    let data: { name: string, phone: string, mail: string, lisence: string } = {
      name: form_value[0] as string,
      phone: form_value[1] as string,
      mail: form_value[2] as string,
      lisence: ''
    };
    if (data.name.length === 0 || data.mail.length === 0 || data.phone.length === 0) {
      console.error('必填信息不能为空');
      setAddFormErrorMsg('必填信息不能为空');
      return;
    }
    if (!PhoneCheck(data.phone)) {
      console.error('手机号码格式错误');
      setAddFormErrorMsg('手机号码格式错误');
      return;
    }
    if (!MailCheck(data.mail)) {
      console.error('邮箱格式错误');
      setAddFormErrorMsg('邮箱格式错误');
      return;
    }
    if (lisence === null) {
      setAddFormErrorMsg('请上传营业执照');
      return;
    }
    data.lisence = ArrayBuffer2Base64(await lisence.arrayBuffer());
    server.addCompany(data)
      .then(res => {
        if (res) {
          // setRefresh((val) => !val);
          setAddModalShown(false);
          location.reload();
        } else {
          setAddFormErrorMsg('出现错误');
        }
      })
      .catch(_ => {
        setAddFormErrorMsg('出现错误');
      });
  }
  const saveEdit = () => {

  }
  const delConfirm = () => {
    if (!del_targets || typeof del_targets === 'object' && del_targets.length === 0) {
      setDeleteModalShown(false);
      alert('删除id列表为空', "danger");
      return;
    }
    // ... delete process
    if (typeof del_targets === 'object') {

    } else {
      server.delCompany(del_targets)
        .then(res => {
          if (res) location.reload();
          else {
            setDeleteModalShown(false);
            alert('删除失败，后台出错', "danger");
          }
        })
        .catch(err => {
          setDeleteModalShown(false);
          alert('删除失败，后台出错', "danger");
        })
        .finally(() => {
          setDelTargets(undefined);
        })
    }
  }

  return (
    <>
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>企业信息管理</h2>
        </div>
        <hr />
        {/* 功能按钮区域 */}
        <div className="dashboard-model-buttons">
          <button className="btn btn-primary" onClick={() => setAddModalShown(true)}>新增</button>
          <button className="btn btn-danger" onClick={() => setDeleteModalShown(true)}>删除</button>
          <button className="btn btn-secondary" onClick={() => setRefresh((val) => !val)}>导入</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button>
        </div>
        {/* 数据表格区域 */}
        <Table table_id='table' table_head={table_head} table_body={table_body} checkbox={true} line_action={table_line_actions} check_change_function={checkChangeRecall} />
      </div>

      {/* 添加模态框 */}
      <Modal shown={addModalShown} id='add-modal' modal_title='添加企业' close_function={() => setAddModalShown(false)} modal_btns={
        <>
          <button type="button" className="btn btn-primary" onClick={saveAdd}>确认</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAddModalShown(false)}>关闭</button>
        </>
      }>
        <Form form_items={add_form_items} form_id="add-form" />
        {/* 错误提示 */}
        <div className='form-error-info'>
          {add_form_error_msg}
        </div>
      </Modal>

      {/* 修改模态框 */}
      <Modal id="modal-edit" shown={editModalShown} close_function={() => setEditModalShown(false)} modal_title='修改公司信息' modal_btns={
        <>
          <button className='btn btn-primary' >确定</button>
          <button className='btn btn-secondary' onClick={() => setEditModalShown(false)}>取消</button>
        </>
      }>
        <Form form_items={edit_form_items} form_id="edit-form" />
        {/* 错误提示 */}

      </Modal>

      {/* 删除确认 */}
      <Modal id="modal-delete" shown={deleteModalShown} close_function={() => setDeleteModalShown(false)} modal_title="是否确认删除" modal_btns={
        <>
          <button className="btn btn-danger" onClick={() => delConfirm()}>确认</button>
          <button className="btn btn-secondary" onClick={() => setDeleteModalShown(false)}>取消</button>
        </>
      }>
        删除内容后无法恢复，是否继续
      </Modal>

      {/* 导出设置 */}
      <Modal id="modal-export" shown={exportModalShown} close_function={() => setExportModalShown(false)} modal_title="是否确认导出" modal_btns={
        <>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(false)}>关闭</button>
        </>
      }>
        是否将选定内容导出至外部
      </Modal>

      <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType} />
    </>
  )
}
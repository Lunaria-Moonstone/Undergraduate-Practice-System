'use client'

import { FormItems, Teachers } from "@/global/type";
import { ReactNode, useEffect, useState } from "react";

import server from './admin-teacher.api';
import Modal from "@/components/modal/modal.component";
import Form from "@/components/form/form.component";
import { formInput } from "@/utils/input";
import Table, { TableLineActions } from "@/components/table/table.component";
import Alert from "@/components/alert/alert.component";

export default function Page() {

  let checked_id_list: string[] = [];

  const [addModalShown, setAddModalShown] = useState(false);
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
  const [edit_form_error_msg, setEditFormErrorMsg] = useState('');
  const [del_targets, setDelTargets] = useState<string | string[]>();
  const [edit_target, setEditTarget] = useState<string>();
  const [table_head, setTableHead] = useState<Array<string>>([
    '编号', '教师姓名', '工号', '联系电话', '联系邮箱'
  ]);
  const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  const [table_line_actions, setTableLineActions] = useState<TableLineActions>([
    {
      type: 'danger', text: '删除',
      action_function: (id: string) => {
        setDelTargets(id);
        setDeleteModalShown(true);
      }
    },
  ]);

  // const table_head: Array<string> = ['编号', '教师姓名', '工号', '联系电话', '联系邮箱'];
  // const table_body: Array<Array<string | number | undefined>> = teachers.map(x => {
  //   return [x.id, x.name, x.number, x.phone, x.mail];
  // });

  const add_form_items: FormItems = [
    { label: '教师姓名', type: 'input' },
    { label: '教师工号', type: 'input' },
    { label: '教师联系电话', type: 'input' },
    { label: '教师邮箱', type: 'input' },
  ];

  useEffect(() => {
    server.fetchTeachers()
      .then(res => {
        setTableBody(res.map(x => [x.id, x.name, x.number, x.phone, x.mail]))
      })
      .catch();
  }, []);

  const saveAdd = () => {
    let form_value = formInput(document.getElementById('add-form') as HTMLElement);
    let data = { name: form_value[0] as string, number: form_value[1] as string, phone: form_value[2] as string, mail: form_value[3] as string };
    if (data.name.length === 0 || data.number.length === 0 || data.number.length === 0 || data.mail.length === 0) {
      setAddFormErrorMsg('必填信息不能为空');
      return;
    }
    server.addTeacher(data)
      .then(res => {
        if (res) {
          setAddModalShown(false);
          location.reload();
        } else {
          setAddModalShown(false);
          alert("添加失败, 后台错误", 'danger');
        }
      })
      .catch(err => {
        setAddModalShown(false);
        alert("添加失败, 后台错误", 'danger');
      })
  }
  const delMutiple = () => {
    setDelTargets(checked_id_list);
    setDeleteModalShown(true);
  }
  const delConfirm = async () => {
    if (!del_targets || typeof del_targets === 'object' && del_targets.length === 0) {
      setDeleteModalShown(false);
      alert('删除id列表为空', "danger");
      return;
    }
    setDeleteModalShown(false);
    // ... delete process
    if (typeof del_targets === 'object') {
      for ( let del_target of del_targets ) {
        await server.delTeacher(del_target)
          .catch(err => {
            alert(del_target + " 删除失败", "danger");
          }); 
      }
      location.reload();
    } else {
      server.delTeacher(del_targets)
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
          <h2>教师信息管理</h2>
        </div>
        <hr />
        {/* 功能按钮区域 */}
        <div className="dashboard-model-buttons">
          <button className="btn btn-primary" onClick={() => setAddModalShown(true)}>新增</button>
          <button className="btn btn-danger" onClick={() => delMutiple()}>删除</button>
          {/* <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button> */}
        </div>
        {/* 数据表格区域 */}
        <Table table_id="table" table_head={table_head} table_body={table_body} checkbox={true} line_action={table_line_actions} />
      </div>

      <Modal shown={addModalShown} id='add-modal' modal_title='添加教师信息' close_function={() => setAddModalShown(false)} modal_btns={
        <>
          <button type="button" className="btn btn-primary" onClick={() => saveAdd()}>确认</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAddModalShown(false)}>关闭</button>
        </>
      }>
        <Form form_items={add_form_items} form_id="add-form" />
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
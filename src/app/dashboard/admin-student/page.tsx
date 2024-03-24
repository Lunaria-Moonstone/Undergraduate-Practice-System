'use client'

import { ReactNode, useEffect, useState } from 'react';

import { Students, FormItems, TableColumns, TableDataSource } from '@/global/type';
import server from './admin-student.api';
import { formInput } from '@/utils/input';

import Modal from '@/components/modal/modal.component';
import Form from '@/components/form/form.component';
import Table, { TableLineActions } from '@/components/table/table.component';
import Alert from '@/components/alert/alert.component';
import { Button, Space } from 'antd';

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
  // const [table_head, setTableHead] = useState<Array<string>>([
  //   '编号', '学生姓名', '学号', '年级', '联系电话',
  //   '联系邮箱', '个人简历',
  //   '实习凭证', '实习分数',
  // ]);
  // const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  const table_columns: TableColumns = [
    { title: '编号', dataIndex: 'id', key: 'id' },
    { title: '学生姓名', dataIndex: 'name', key: 'name' },
    { title: '学号', dataIndex: 'number', key: 'number' },
    { title: '年级', dataIndex: 'grade', key: 'grade' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone' },
    { title: '联系邮箱', dataIndex: 'mail', key: 'mail' },
    { title: '个人简历', dataIndex: 'has_vitae', key: 'has_vitae' },
    { title: '实习凭证', dataIndex: 'has_proof', key: 'has_proof' },
    { title: '实习分数', dataIndex: 'score', key: 'score' },
    { title: '操作', dataIndex: 'actions', key: 'actions', render: (_, record) => {
      return  <Space size="middle">
        <Button onClick={() => { setDelTargets(record.id); setDeleteModalShown(true) }} type='link' danger>删除</Button>
      </Space>
    }}
    // { title: '是否处于实习状态', dataIndex: 'is_practice', key: 'is_practice' },
    // { title: '实习公司', dataIndex: 'practice_cmp', key: 'practice_cmp' },
  ];
  const [table_data_source, setTableDataSource] = useState<TableDataSource>([]);
  // const [table_line_actions, setTableLineActions] = useState<TableLineActions>([
  //   {
  //     type: 'danger', text: '删除',
  //     action_function: (id: string) => {
  //       setDelTargets(id);
  //       setDeleteModalShown(true);
  //     }
  //   },
  // ]);

  useEffect(() => {
    server.fetchStudents()
      .then(res => {
        // setTableBody(res.map(x => [
        //   x.id, x.name, x.number, x.grade, x.phone,
        //   x.mail,
        //   // Buffer.from(res[0].is_practice)[0] ? '是' : '否',
        //   // Buffer.from(res[0].is_practice)[0] ? x.practice_cmp[-1] : '未处于实习状态',
        //   Buffer.from(res[0].has_vitae)[0] ? '有' : '无',
        //   Buffer.from(res[0].has_proof)[0] ? '有' : '无',
        //   x.score !== undefined && x.score !== -1 ? x.score : '未录入实习成绩'
        // ]));
        setTableDataSource(res.map(x => {
          return {
            id: x.id,
            name: x.name,
            number: x.number,
            grade: x.grade,
            phone: x.phone,
            mail: x.mail,
            has_vitae: Buffer.from(x.has_vitae)[0] ? '有' : '无',
            has_proof: Buffer.from(x.has_proof)[0] ? '有' : '无',
            score: x.score !== undefined && x.score !== -1 ? x.score : '未录入实习成绩'
          };
        }));
      })
      .catch();
  }, []);

  const add_form_items: FormItems = [
    { label: '学生姓名', type: 'input' },
    { label: '学生学号', type: 'input' },
    {
      label: '年级', type: 'select', selectOpt: [
        { label: '2020级', value: '2020' },
        { label: '2021级', value: '2021' },
        { label: '2022级', value: '2022' },
        { label: '2023级', value: '2023' },
      ]
    },
  ]
  const saveAdd = () => {
    let form_value: Array<string | number | boolean | undefined> = formInput(document.getElementById('add-form') as HTMLElement);
    let data = { name: form_value[0] as string, number: form_value[1] as string, grade: form_value[2] as string }
    if (data.name.length === 0 || data.number.length === 0 || data.grade === '请选择') {
      setAddFormErrorMsg('必填信息不能为空');
      return;
    }
    server.addStudent(data)
      .then(res => {
        console.log(res)
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
        await server.delStudent(del_target)
          .catch(err => {
            alert(del_target + " 删除失败", "danger");
          }); 
      }
      location.reload();
    } else {
      server.delStudent(del_targets)
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
          <h2>学生信息管理</h2>
        </div>
        <hr />
        {/* 功能按钮区域 */}
        <div className="dashboard-model-buttons">
          <Button type='primary' onClick={() => setAddModalShown(true)}>新增</Button>
          <Button onClick={() => setDeleteModalShown(true)} danger>删除</Button>
          {/* <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button> */}
        </div>
        {/* 数据表格区域 */}
        {/* <Table table_id='table' table_head={table_head} table_body={table_body} checkbox={true} line_action={table_line_actions} /> */}
        <Table dataSource={table_data_source} columns={table_columns} />
        
      </div>

      {/* 添加学生 */}
      <Modal shown={addModalShown} id='add-modal' modal_title='添加学生信息' close_function={() => setAddModalShown(false)} modal_btns={
        <>
          <button type="button" className="btn btn-primary" onClick={() => saveAdd()}>确认</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAddModalShown(false)}>关闭</button>
        </>
      }>
        <Form form_items={add_form_items} form_id="add-form" />
        <div className='form-error-info'>
          {add_form_error_msg}
        </div>
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
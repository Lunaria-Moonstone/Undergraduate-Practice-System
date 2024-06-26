'use client'

import { FormItems, TableColumns, TableDataSource, Teachers } from "@/global/type";
import { ReactNode, useEffect, useState } from "react";

import server from './admin-teacher.api';
import Modal from "@/components/modal/modal.component";
import Form from "@/components/form/form.component";
import { formInput } from "@/utils/input";
import Table, { TableLineActions } from "@/components/table/table.component";
import Alert from "@/components/alert/alert.component";
import { Button, Input, Space, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function Page() {

  let checked_id_list: string[] = [];

  const [messageApi, contextHolder] = message.useMessage();
  const [addModalShown, setAddModalShown] = useState(false);
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [exportModalShown, setExportModalShown] = useState(false);
  const [importModalShown, setImportModalShown] = useState(false);
  // const [alertShown, setAlertShown] = useState<boolean>(false);
  // const [alertMessage, setAlertMessage] = useState<string>('');
  // const [alertType, setAlertType] = useState<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'>('info');
  // const alert = (message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark') => {
  //   setAlertMessage(message);
  //   setAlertType(type);
  //   setAlertShown(true);
  // }
  // const alertClear = () => {
  //   setAlertMessage("");
  //   setAlertShown(false);
  // }

  const [search_keyword, setSearchKeyword] = useState<string>('');
  const [add_form_error_msg, setAddFormErrorMsg] = useState('');
  const [edit_form_error_msg, setEditFormErrorMsg] = useState('');
  const [del_targets, setDelTargets] = useState<string | string[]>();
  const [edit_target, setEditTarget] = useState<string>();
  // const [table_head, setTableHead] = useState<Array<string>>([
  //   '编号', '教师姓名', '工号', '联系电话', '联系邮箱'
  // ]);
  // const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  // const [table_line_actions, setTableLineActions] = useState<TableLineActions>([
  //   {
  //     type: 'danger', text: '删除',
  //     action_function: (id: string) => {
  //       setDelTargets(id);
  //       setDeleteModalShown(true);
  //     }
  //   },
  // ]);
  const table_columns: TableColumns = [
    // '编号', '教师姓名', '工号', '联系电话', '联系邮箱'
    { title: '编号', dataIndex: 'id', key: 'id', hidden: true },
    { title: '教师姓名', dataIndex: 'name', key: 'name' },
    { title: '工号', dataIndex: 'number', key: 'number' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone' },
    { title: '联系邮箱', dataIndex: 'mail', key: 'mail' },
    {
      title: '操作', dataIndex: 'actions', key: 'actions', render: (_, record) => {
        return <Space size="middle">
          <Button onClick={() => { setDelTargets(record.id); setDeleteModalShown(true) }} type='link' danger>删除</Button>
        </Space>
      }
    }
  ];
  const [table_data_source, setTableDataSource] = useState<TableDataSource>([]);


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
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    server.fetchTeachers()
      .then(res => {
        // setTableBody(res.map(x => [x.id, x.name, x.number, x.phone, x.mail]))
        setTableDataSource(res.map(x => {
          return {
            key: x.id as React.Key,
            id: x.id,
            name: x.name,
            number: x.number,
            phone: x.phone,
            mail: x.mail,
          }
        }))
      })
      .catch();
  }
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
          // location.reload();
          fetchTeachers();
        } else {
          setAddModalShown(false);
          // alert("添加失败, 后台错误", 'danger');
          messageApi.error('添加失败, 后台错误');
        }
      })
      .catch(err => {
        setAddModalShown(false);
        // alert("添加失败, 后台错误", 'danger');
        messageApi.error('添加失败, 后台错误');
      })
  }
  const delMutiple = () => {
    setDelTargets(checked_id_list);
    setDeleteModalShown(true);
  }
  const delConfirm = async () => {
    if (!del_targets || typeof del_targets === 'object' && del_targets.length === 0) {
      setDeleteModalShown(false);
      // alert('删除id列表为空', "danger");
      messageApi.error('删除id列表为空');
      return;
    }
    setDeleteModalShown(false);
    // ... delete process
    if (typeof del_targets === 'object') {
      for (let del_target of del_targets) {
        await server.delTeacher(del_target)
          .catch(err => {
            // alert(del_target + " 删除失败", "danger");
            messageApi.error(del_target + " 删除失败");
          });
      }
      // location.reload();
      fetchTeachers();
    } else {
      server.delTeacher(del_targets)
        .then(res => {
          if (res) 
            // location.reload();
            fetchTeachers();
          else {
            setDeleteModalShown(false);
            // alert('删除失败，后台出错', "danger");
            messageApi.error('删除失败，后台出错');
          }
        })
        .catch(err => {
          setDeleteModalShown(false);
          // alert('删除失败，后台出错', "danger");
          messageApi.error('删除失败，后台出错');
        })
        .finally(() => {
          setDelTargets(undefined);
        })
    }
  };
  const search = (keyword: string) => {
    server.searchTeacher(keyword)
      .then(res => {
        setTableDataSource(res.map(x => {
          return {
            key: x.id as React.Key,
            id: x.id,
            name: x.name,
            number: x.number,
            phone: x.phone,
            mail: x.mail,
          }
        }))
      })
      .catch(_ => {
        messageApi.error('搜索失败，后台出错')
      })
  };
  const importConfirm = async () => {

  };

  return (
    <>
      {contextHolder}
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>教师信息管理</h2>
        </div>
        <hr />
        {/* 功能按钮区域 */}
        <div className="dashboard-model-buttons-and-search">
          <div className="dashboard-model-buttons">
            <Button type='primary' onClick={() => setAddModalShown(true)}>新增</Button>
            <Button onClick={() => delMutiple()} danger>删除</Button>
            <Button onClick={() => setImportModalShown(true)}>导入</Button>
            <Button onClick={() => { setExportModalShown(true) }}>下载导入模板</Button>
            {/* <button className="btn btn-secondary">导入</button>
            <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button> */}
          </div>
          <div>
            {/* <Search placeholder="搜索"  /> */}
            <Space>
              <Space.Compact>
                <Input placeholder="输入关键字" onChange={(e) => setSearchKeyword(e.currentTarget.value)} />
                <Button type="primary" onClick={() => search(search_keyword)}>搜索</Button>
              </Space.Compact>
            </Space>
          </div>
        </div>
        {/* 数据表格区域 */}
        <Table dataSource={table_data_source} columns={table_columns} check_change_function={(checked_list) => checked_id_list = checked_list} />
      </div>

      <Modal shown={addModalShown} modal_title='添加教师信息' close_function={() => setAddModalShown(false)} modal_btns={
        <>
          {/* <button type="button" className="btn btn-primary" onClick={() => saveAdd()}>确认</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAddModalShown(false)}>关闭</button> */}
          <Button type="primary" onClick={() => saveAdd()}>确认</Button>
        </>
      }>
        <Form form_items={add_form_items} form_id="add-form" />
      </Modal>

      {/* 删除确认 */}
      <Modal shown={deleteModalShown} close_function={() => setDeleteModalShown(false)} modal_title="是否确认删除" modal_btns={
        <>
          {/* <button className="btn btn-danger" onClick={() => delConfirm()}>确认</button>
          <button className="btn btn-secondary" onClick={() => setDeleteModalShown(false)}>取消</button> */}
          <Button type="primary" onClick={() => delConfirm()} danger>确认</Button>
        </>
      }>
        删除内容后无法恢复，是否继续
      </Modal>

      {/* 导出设置 */}
      <Modal shown={exportModalShown} close_function={() => setExportModalShown(false)} modal_title="是否确认导出" modal_btns={
        <>
          {/* <button className="btn btn-secondary" onClick={() => setExportModalShown(false)}>关闭</button> */}
          <Button type="primary" onClick={() => window.open(`/dashboard/import-excel?fields=${JSON.stringify(['name','number','phone','mail'])}`)}>确认</Button>
        </>
      }>
        是否将选定内容导出至外部
      </Modal>

      <Modal shown={importModalShown} modal_title='导入文件' close_function={() => setImportModalShown(false)} modal_btns={
        <Button type='primary' onClick={() => importConfirm()}>确定</Button>
      }>
        <Upload name='file' action='/dashboard/import-excel' headers={{
          role: 'teacher'
        }} onChange={(info) => {
          if (info.file.status === 'done') {
            messageApi.success('导入成功');
            setImportModalShown(false);
            fetchTeachers();
          } else if (info.file.status === 'error') {
            messageApi.error('导入失败');
          } else if (info.file.status === 'uploading') {
            messageApi.loading('正在导入');
          }
        }}>
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      </Modal>

      {/* <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType} /> */}
    </>
  )
}
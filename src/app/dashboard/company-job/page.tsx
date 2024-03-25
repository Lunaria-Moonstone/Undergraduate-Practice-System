'use client';

import { FormItems, Job, Jobs, TableColumns, TableDataSource } from "@/global/type";
import { useEffect, useRef, useState } from "react";

import server from './company-job.api';
import Table, { TableLineActions } from "@/components/table/table.component";
import Modal from "@/components/modal/modal.component";
import Form from "@/components/form/form.component";

import './company-job.part.css';
import Alert from "@/components/alert/alert.component";
import { formInput } from "@/utils/input";
import { Button, Input, Space } from "antd";

export default function Page() {

  let checked_id_list: string[] = [];

  // const [addModalShown, setAddModalShown] = useState(false);
  // const [infoModalShown, setInfoModalShown] = useState(false);
  // const [deleteModalShown, setDeleteModalShown] = useState(false);
  // const [exportModalShown, setExportModalShown] = useState(false);
  const [add_form_error_msg, setAddFormErrorMsg] = useState('');
  const [del_target, setDelTarget] = useState<string | string[]>();

  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({
    addModalShown: false,
    delModalShown: false,
    infoModalShown: false,
    editModalShown: false,
  });
  const toggleModal = (modalName: string) => {
    setModalStates(prev => ({ ...prev, [`${modalName}ModalShown`]: !prev[`${modalName}ModalShown`] }));
  }
  const modalProps = (modalName: string, title: string, children: React.ReactNode, buttons?: React.ReactNode) => ({
    id: `modal-${modalName}`,
    shown: modalStates[`${modalName}ModalShown`],
    close_function: () => toggleModal(`${modalName}ModalShown`),
    modal_title: title,
    modal_btns: (
      <>
        {buttons}
        <button className='btn btn-secondary' onClick={() => toggleModal(modalName)}>关闭</button>
      </>
    ),
    children,
  });

  const [alertState, setAlertState] = useState<{ alertShown: boolean, alertMessage: string, alertType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' }>({
    alertShown: false,
    alertMessage: '',
    alertType: 'info'
  });
  const alertProps = () => ({
    shown: alertState['alertShown'],
    type: alertState['alertType'],
    message: alertState['alertMessage'],
    close_function: () => setAlertState({ alertShown: false, alertMessage: '', alertType: 'info' })
  });
  const alert = (message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark') => {
    setAlertState({ alertShown: true, alertMessage: message, alertType: type });
  };

  const formAddItems: FormItems = [
    { label: '岗位名称', type: 'input' },
    { label: '薪资', type: 'input' },
    { label: '描述', type: 'textarea' },
  ]

  // const jobs: Jobs = server.fetchJobs();
  // const table_head: Array<string> = ['编号', '岗位名称', '薪资', ];
  // const table_body: Array<Array<string | number | undefined>> = jobs.map(x => {
  //   return [x.id, x.name, x.salary];
  // });
  // const job: Job = server.fetchJob();

  const [job_list, setJobList] = useState<Jobs>([]);
  const job_list_ref = useRef(job_list);
  // const [table_head, setTableHead] = useState<string[]>(['编号', '岗位名称', '薪资',]);
  // const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  // const [table_line_actions, setTableLineActions] = useState<TableLineActions>([{
  //   type: 'danger',
  //   text: '删除',
  //   action_function: (id: string) => {
  //     setDelTarget(id);
  //     toggleModal('del');
  //   }
  // }, {
  //   type: 'primary',
  //   text: '详细',
  //   action_function: (id: string) => {
  //     let tmp_list = job_list_ref.current.filter(x => x.id === id);
  //     if (tmp_list.length === 0) {
  //       alert('岗位不存在，联系后台管理员', "danger");
  //       return;
  //     }
  //     const target = tmp_list[0];
  //     (document.getElementById("job-info-title") as HTMLElement).innerText = target.name;
  //     (document.getElementById("job-info-salary") as HTMLElement).innerText = target.salary;
  //     (document.getElementById("job-info-descript") as HTMLElement).innerText = target.descript;
  //     toggleModal('info')
  //   }
  // }, {
  //   type: 'primary',
  //   text: '修改',
  //   action_function: (id: string) => {
  //     let tmp_list = job_list_ref.current.filter(x => x.id === id);
  //     if (tmp_list.length === 0) {
  //       alert('岗位不存在，联系后台管理员', "danger");
  //       return;
  //     }
  //     const target = tmp_list[0];
  //     (document.getElementById("job-edit-id") as HTMLInputElement).value = target.id;
  //     (document.getElementById("job-edit-title") as HTMLInputElement).value = target.name;
  //     (document.getElementById("job-edit-salary") as HTMLInputElement).value = target.salary;
  //     (document.getElementById("job-edit-descript") as HTMLInputElement).value = target.descript;
  //     toggleModal('edit')
  //   }
  // }]);
  const table_columns: TableColumns = [
    // '编号', '岗位名称', '薪资'
    { title: '编号', dataIndex: 'id', key: 'id', hidden: true },
    { title: '岗位名称', dataIndex: 'name', key: 'name' },
    { title: '薪资', dataIndex: 'salary', key: 'salary' },
    {
      title: '操作', dataIndex: 'actions', key: 'actions', render: (_, record) => {
        return <Space size='middle'>
          <Button type="link" danger onClick={
            () => {
              setDelTarget(record.id);
              toggleModal('del');
            }
          }>删除</Button>
          <Button type="link" onClick={
            () => {
              let tmp_list = job_list_ref.current.filter(x => x.id === record.id);
              if (tmp_list.length === 0) {
                alert('岗位不存在，联系后台管理员', "danger");
              }
              const target = tmp_list[0];
              // (document.getElementById("job-info-id") as HTMLInputElement).value = target.id;
              (document.getElementById("job-info-title") as HTMLElement).innerText = target.name;
              (document.getElementById("job-info-salary") as HTMLElement).innerText = target.salary;
              (document.getElementById("job-info-descript") as HTMLElement).innerText = target.descript;
              toggleModal('info')
            }
          }>详细</Button>
          <Button type="link" onClick={
            () => {
              let tmp_list = job_list_ref.current.filter(x => x.id === record.id);
              if (tmp_list.length === 0) {
                alert('岗位不存在，联系后台管理员', "danger");
              }
              const target = tmp_list[0];
              (document.getElementById("job-edit-id") as HTMLInputElement).value = target.id;
              (document.getElementById("job-edit-title") as HTMLInputElement).value = target.name;
              (document.getElementById("job-edit-salary") as HTMLInputElement).value = target.salary;
              (document.getElementById("job-edit-descript") as HTMLInputElement).value = target.descript;
              toggleModal('edit')
            }
          }>修改</Button>
        </Space>
      }
    }
  ];
  const [table_data_source, setTableDataSource] = useState<TableDataSource>([]);

  useEffect(() => {
    job_list_ref.current = job_list;
  }, [job_list])
  useEffect(() => {
    server.fetchJobs()
      .then(res => {
        if (res) {
          // setTableBody(res.map(x => [x.id, x.name, x.salary]));
          setTableDataSource(res.map(x => {
            return {
              id: x.id,
              name: x.name,
              salary: x.salary,
            }
          }))
          setJobList(res);
        }
        else
          alert('后台错误，获取岗位信息失败', 'danger');
      })
      .catch(err => {
        alert('后台错误，获取岗位信息失败', 'danger');
      })
  }, []);

  const checkChangeRecall = (id_list: string[]) => {
    checked_id_list = id_list;
  };
  const saveAdd = () => {
    let form_value = formInput(document.getElementById('form-add') as HTMLElement);
    for (let value of form_value) {
      if ((value as string).length === 0) {
        setAddFormErrorMsg('必填值不能为空');
        return;
      }
    }
    console.log(form_value);
    server.addJob({ name: form_value[0] as string, salary: form_value[1] as string, descript: form_value[2] as string })
      .then(res => {
        console.log(res);
        if (res) {
          location.reload();
        } else {
          toggleModal('add');
          alert('后台错误', "danger");
        }
      })
      .catch(err => {
        console.error(err);
        toggleModal('add');
        alert('后台错误', "danger");
      })
  };
  const delMark = () => {
    setDelTarget(checked_id_list);
    toggleModal('del');
  }
  const delConfirm = async () => {
    if (!del_target || (typeof del_target === 'object' && del_target.length === 0)) {
      toggleModal('del');
      alert('删除编号为空', "danger");
      console.error('删除编号为空')
      return;
    }
    if (typeof del_target === 'string') {
      server.delJob(del_target)
        .then(res => {
          if (res)
            location.reload();
          else {
            toggleModal('del');
            alert('后台错误删除失败', "danger");
          }
        })
        .catch(err => {
          toggleModal('del');
          alert('后台错误删除失败', "danger");
        })
    } else {
      for (let target of del_target) {
        await server.delJob(target)
          .catch(err => {
            alert(target + " 删除失败", "danger");
          });
      }
      location.reload();
    }
  }
  const saveEdit = async () => {
    let form_value = formInput(document.getElementById('form-edit') as HTMLElement);
    for (let value of form_value) {
      if ((value as string).length === 0) {
        setAddFormErrorMsg('必填值不能为空');
        return;
      }
    }
    server.editJob(form_value[0] as string, { name: form_value[1] as string, salary: form_value[2] as string, descript: form_value[3] as string })
      .then(res => {
        console.log(res);
        if (res) {
          location.reload();
        } else {
          toggleModal('add');
          alert('后台错误', "danger");
        }
      })
      .catch(err => {
        console.error(err);
        toggleModal('add');
        alert('后台错误', "danger");
      })
  }

  return (
    <>
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>招聘岗位设置</h2>
        </div>
        <hr />
        {/* 功能按钮区域 */}
        {/* <div className="dashboard-model-buttons">
          <button className="btn btn-primary" onClick={() => toggleModal('add')}>新增</button>
          <button className="btn btn-danger" onClick={() => delMark()}>删除</button>
          <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button>
        </div> */}
        <div className="dashboard-model-buttons-and-search">
          <div className="dashboard-model-buttons">
            <Button type='primary' onClick={() => toggleModal('add')}>新增</Button>
            <Button onClick={() => delMark()} danger>删除</Button>
            {/* <button className="btn btn-secondary">导入</button>
            <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button> */}
          </div>
          <div>
            {/* <Search placeholder="搜索"  /> */}
            <Space>
              <Space.Compact>
                <Input placeholder="输入关键字" />
                <Button type="primary">搜索</Button>
              </Space.Compact>
            </Space>
          </div>
        </div>
        {/* 数据表格区域 */}
        {/* <Table table_id="table" table_head={table_head} table_body={table_body} checkbox={true} line_action={table_line_actions} check_change_function={checkChangeRecall} /> */}
        <Table dataSource={table_data_source} columns={table_columns} check_change_function={(checked_list: string[]) => { checked_id_list = checked_list; }} />
      </div>

      {/* 添加岗位 */}
      <Modal {...modalProps('add', '新增招聘岗位', (
        <>
          <Form form_id="form-add" form_items={formAddItems} />
          <div className='form-error-info'>
            {add_form_error_msg}
          </div>
        </>
      ), (
        <button className="btn btn-primary" onClick={saveAdd}>确认</button>
      ))} />

      {/* 岗位信息 */}
      <Modal {...modalProps('info', '岗位信息', (
        <div className="job-info">
          <div className="title" id="job-info-title">

          </div>
          <div className="info">
            <div>
              <div>薪资</div>
              <div id="job-info-salary"></div>
            </div>
            <div>
              <div>描述</div>
              <div id="job-info-descript"></div>
            </div>
          </div>
        </div>
      ))} />

      {/* 岗位删除确认 */}
      <Modal {...modalProps('del', '删除确认', (
        <p>删除内容后无法恢复，是否继续</p>
      ), (
        <button className="btn btn-danger" onClick={delConfirm}>确认</button>
      ))} />

      <Modal {...modalProps('edit', '修改', (
        <form id="form-edit">
          <div className="mb-3">
            <label className="form-label">岗位编号</label>
            <input className="form-control" placeholder="编号" id="job-edit-id" disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">岗位名称</label>
            <input className="form-control" placeholder="用户名" id="job-edit-title" />
          </div>
          <div className="mb-3">
            <label className="form-label">薪资</label>
            <input className="form-control" placeholder="薪资" id="job-edit-salary" />
          </div>
          <div className="mb-3">
            <label className="form-label">描述</label>
            <input className="form-control" placeholder="描述" type="textarea" id="job-edit-descript"  />
          </div>
        </form>
      ), (
        <button className="btn btn-primary" onClick={saveEdit}>确认</button>
      ))} />

      {/* 岗位导出设置 */}
      {/* <Modal id="modal-export" shown={exportModalShown} close_function={() => setExportModalShown(false)} modal_title="是否确认导出" modal_btns={
        <>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(false)}>关闭</button>
        </>
      }>
        是否将选定内容导出至外部
      </Modal> */}

      <Alert {...alertProps()} />
    </>
  )
}
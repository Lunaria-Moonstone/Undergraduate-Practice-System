'use client';

import Table, { TableLineActions } from "@/components/table/table.component";
import { FormItems, StudentsWithJob, TableColumns, TableDataSource } from "@/global/type";
import { useEffect, useRef, useState } from "react";
import server from './company-student.api';
import Modal from "@/components/modal/modal.component";
import './company-student.part.css'
import { Button, Space, message } from "antd";

export default function Page() {

  // const [infoModalShown, setInfoModalShown] = useState(false);
  // const [exportModalShown, setExportModalShown] = useState(false);

  // const students: StudentsWithJob = server.fetchStudents();
  // const table_head = ['应聘学生姓名', '应聘岗位名称', '当前状态'];
  // const table_body: Array<Array<string | number | undefined>> = students.map(x => {
  //   return [x.student_name, x.job_name, x.progress];
  // });
  // const student: StudentWithJob = server.fetchStudent();

  const [messageApi, contextHolder] = message.useMessage();
  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({
    infoModalShown: false,
    feedbackModalShown: false,
  });
  const toggleModal = (modalName: string) => {
    setModalStates(prev => ({ ...prev, [`${modalName}ModalShown`]: !prev[`${modalName}ModalShown`] }));
  }
  const modalProps = (modalName: string, title: string, children: React.ReactNode, buttons?: React.ReactNode) => ({
    id: `modal-${modalName}`,
    shown: modalStates[`${modalName}ModalShown`],
    close_function: () => toggleModal(`${modalName}ModalShown`),
    hide_close_btn: true,
    modal_title: title,
    modal_btns: (
      <>
        {buttons}
        {/* <button className='btn btn-secondary' onClick={() => toggleModal(modalName)}>关闭</button> */}
        <Button onClick={() => toggleModal(modalName)}>关闭</Button>
      </>
    ),
    children,
  });

  // const [alertState, setAlertState] = useState<{ alertShown: boolean, alertMessage: string, alertType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' }>({
  //   alertShown: false,
  //   alertMessage: '',
  //   alertType: 'info'
  // });
  // const alertProps = () => ({
  //   shown: alertState['alertShown'],
  //   type: alertState['alertType'],
  //   message: alertState['alertMessage'],
  //   close_function: () => setAlertState({ alertShown: false, alertMessage: '', alertType: 'info' })
  // });
  // const alert = (message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark') => {
  //   setAlertState({ alertShown: true, alertMessage: message, alertType: type });
  // };

  // const add_form_items: FormItems = [
  //   { label: '' }
  // ]

  const [update_target, setUpdateTarget] = useState<string>();
  const [job_audit_list, setJobAuditList] = useState<StudentsWithJob>([]);
  const job_audit_list_ref = useRef(job_audit_list);
  const [resume, setResume] = useState<string>();
  // const [table_head, setTableHead] = useState<string[]>(['编号', '应聘学生姓名', '应聘岗位名称', '当前状态']);
  // const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  // const [table_line_actions, setTableLineActions] = useState<TableLineActions>([
  //   {
  //     type: 'primary', text: '详细', action_function: (id: string) => {
  //       console.log('fuck u')
  //       const tmp_list = job_audit_list_ref.current.filter(x => x.id === id);
  //       console.log(tmp_list)
  //       if (tmp_list.length === 0) {
  //         alert('请求不存在，联系后台管理员', "danger");
  //         return;
  //       }
  //       const target = tmp_list[0];
  //       setResume("data:application/pdf;base64," + Buffer.from(target.resume as Buffer).toString());
  //       console.log(resume);
  //       (document.getElementById("student-info-name") as HTMLElement).innerText = target.student_name;
  //       (document.getElementById("job-info-name") as HTMLElement).innerText = target.job_name;
  //       (document.getElementById("student-info-progress") as HTMLElement).innerText = target.progress;
  //       setUpdateTarget(id);
  //       toggleModal('info');
  //     }
  //   }
  // ]);
  const table_columns: TableColumns = [
    // '编号', '应聘学生姓名', '应聘岗位名称', '当前状态'
    { title: '编号', dataIndex: 'id', key: 'id' },
    { title: '应聘学生姓名', dataIndex: 'student_name', key: 'student_name' },
    { title: '应聘岗位名称', dataIndex: 'job_name', key: 'job_name' },
    { title: '当前状态', dataIndex: 'progress', key: 'progress' },
    {
      title: '操作', dataIndex: 'actions', key: 'actions', render: (_, record) => {
        return <Space>
          <Button type="link" onClick={
            () => {
              const tmp_list = job_audit_list_ref.current.filter(x => x.id === record.id);
              if (tmp_list.length === 0) {
                // alert('请求不存在，联系后台管理员', "danger");
                messageApi.error('请求不存在，联系后台管理员');
              }
              const target = tmp_list[0];
              setResume("data:application/pdf;base64," + Buffer.from(target.resume as Buffer).toString());
              // console.log(resume);
              (document.getElementById("student-info-name") as HTMLElement).innerText = target.student_name;
              (document.getElementById("job-info-name") as HTMLElement).innerText = target.job_name;
              (document.getElementById("student-info-progress") as HTMLElement).innerText = target.progress;
              setUpdateTarget(record.id);
              toggleModal('info');
            }
          }>详细</Button>
        </Space>
      }
    }
  ];
  const [table_data_source, setTableDataSource] = useState<TableDataSource>([]);

  useEffect(() => {
    job_audit_list_ref.current = job_audit_list;
    console.log('update Ref')
  }, [job_audit_list])
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    server.fetchStudents()
      .then(res => {
        // setTableBody(res.map(x => [x.id, x.student_name, x.job_name, x.progress]));
        setTableDataSource(res.map(x => {
          return {
            key: x.id as React.Key,
            id: x.id,
            student_name: x.student_name,
            job_name: x.job_name,
            progress: x.progress,
          }
        }));
        setJobAuditList(res);
      })
  }
  const openUpdateModal = () => {
    toggleModal('info');
    toggleModal('feedback');
  };
  const saveUpdate = () => {
    let progress = (document.getElementById("feedback-progress") as HTMLSelectElement).value;
    let message = (document.getElementById("feedback-message") as HTMLInputElement).value;

    if (!update_target) {
      toggleModal('feedback');
      // alert('编号为空', "danger");
      messageApi.error("编号为空");
      return;
    }

    server.updateStudent(update_target, progress, message)
      .then(res => {
        if (res) {
          // location.reload();
          fetchStudents();
        } else {
          toggleModal('feedback');
          // alert('后台错误，更新失败', "danger");
          messageApi.error("后台错误，更新失败");
        }
      })
      .catch(err => {
        toggleModal('feedback');
        // alert('后台错误，更新失败', "danger");
        messageApi.error("后台错误，更新失败");
      })
  };

  return (
    <>
    {contextHolder}
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>应聘人员一览</h2>
        </div>
        <hr /><div className="dashboard-model-buttons">
          {/* <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button> */}
        </div>
        {/* 数据表格区域 */}
        {/* <Table table_id="table" table_head={table_head} table_body={table_body} line_action={table_line_actions} /> */}
        <Table dataSource={table_data_source} columns={table_columns} />
      </div >

      <Modal {...modalProps('info', '应聘信息详细', (
        <div className="student-info">
          <div className="title">
            <div className="title-left">
              <div style={{ fontWeight: 'bolder', fontSize: 'large' }} id="student-info-name"></div>
              <div style={{ fontSize: 'smaller', color: 'gray' }}>#<span id="job-info-name"></span></div>
            </div>
            <div style={{ fontSize: 'larger', fontWeight: 'bold' }} id="student-info-progress"></div>
          </div>
          <div className="feedback">
            <div className="card">
              <div className="card-body">
                {/* <img className="card-head-img" src={"data:image/png;base64," + student.resume} /> */}
                <embed className="card-head-img" src={resume}/>
              </div>
            </div>
            <div className="card" style={{ marginBlockStart: 'var(--standard-padding-width)' }}>
              <div className="card-body">
                <div className="card-title">
                  企业反馈
                </div>
                <div className="card-text">
                  暂无
                </div>
              </div>
            </div>
          </div>
        </div>
      ), (
        <button className="btn btn-primary" onClick={openUpdateModal}>回复</button>
      ))} />

      <Modal {...modalProps('feedback', '回馈', (
        <form id="form-feedback">
          <div className="mb-3">
            <label className="form-label">状态</label>
            {/* <input className="form-control" placeholder="状态" id="job-edit-id" disabled /> */}
            <select className="form-control" id="feedback-progress">
              <option value="接受">接受</option>
              <option value="拒绝">拒绝</option>
              <option value="暂时挂起">暂时挂起</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">回复</label>
            <input className="form-control" placeholder="回复" id="feedback-message" />
          </div>
        </form>
      ), (
        <button className="btn btn-primary" onClick={saveUpdate}>确认</button>
      ))}></Modal>

      {/* <Modal id="modal-export" shown={exportModalShown} close_function={() => setExportModalShown(false)} modal_title="导出确认" modal_btns={
        <>
          <button className="btn btn-primary">确定</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(false)}>取消</button>
        </>
      }>
        是否将选定内容导出至外部
      </Modal> */}
    </>
  )
}
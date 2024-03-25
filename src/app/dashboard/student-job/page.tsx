'use client';

import Modal from '@/components/modal/modal.component';
import server from './student-job.api';
import Table, { TableLineActions } from "@/components/table/table.component";
import { useEffect, useRef, useState } from 'react';
import Form from '@/components/form/form.component';
import Alert from '@/components/alert/alert.component';
import { Jobs } from '@/global/type';

import './student-job.part.css';

export default function Page() {

  let checked_list: string[] = [];

  // const [submitModalShown, setSubmitModalShown] = useState(false);
  // const [infoModalShown, setInfoModalShown] = useState(false);
  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({
    submitModalShown: false,
    infoModalShown: false,
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

  // const table_head = ['编号', '公司名称', '岗位名称', '薪资'];
  // const table_body = server.fetchJobs().map(x => {
  //   return [x.id, x.company_id, x.name, x.salary];
  // });
  const [resume_list, setResumeList] = useState<React.ReactNode>(<></>);
  const [submit_target, setSubmitTarget] = useState<string | string[]>([]);
  const [job_list, setJobList] = useState<Jobs>([]);
  const job_list_ref = useRef(job_list);
  const [table_head, setTableHead] = useState<string[]>(['编号', '公司名称', '岗位名称', '薪资']);
  const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  const [table_line_actions, setTableLineActions] = useState<TableLineActions>([{
    type: 'primary',
    text: '投递简历',
    action_function: (id: string) => {
      setSubmitTarget(id);
      toggleModal('submit');
    }
  }, {
    type: 'primary',
    text: '详细',
    action_function: (id: string) => {
      let tmp_list = job_list_ref.current.filter(x => x.id === id);
      if (tmp_list.length === 0) {
        alert('编号不存在', 'danger');
        return;
      }
      const target = tmp_list[0];
      (document.getElementById("job-info-title") as HTMLElement).innerText = target.name;
      (document.getElementById("company-info-name") as HTMLElement).innerText = target.company_name as string;
      (document.getElementById("job-info-salary") as HTMLElement).innerText = target.salary;
      (document.getElementById("job-info-descript") as HTMLElement).innerText = target.descript;
      toggleModal('info');
    }
  }]);

  useEffect(() => {
    job_list_ref.current = job_list;
  }, [job_list]);
  useEffect(() => {
    server.fetchJobs()
      .then(res => {
        if (res) {
          setTableBody(res.map(x => [x.id, x.company_name, x.name, x.salary]));
          setJobList(res);
        }
        else
          alert('后台错误，拉取信息失败', 'danger');
      })
      .catch(err => {
        alert('后台错误，拉取信息失败', 'danger');
      });
    server.fetchResumeId()
      .then(res => {
        console.log(res);
        if (res) {
          setResumeList(res.map(x => {
            return <option key={x} value={x}>{x}</option>
          }))
        }
        else
          alert('后台错误，拉取信息失败', 'danger');
      })
      .catch(err => {
        alert('后台错误，拉取信息失败', 'danger');
      });
  }, []);

  const checkChangeRecall = (id_list: string[]) => {
    // setCheckedIdList(id_list);
    checked_list = id_list;
  };
  const openSubmitModal = () => {
    setSubmitTarget(checked_list);
    toggleModal('submit');
  }
  const submitConfirm = async () => {
    if (!submit_target || (typeof submit_target === 'object' || submit_target.length === 0)) {
      toggleModal('submit');
      alert('编号为空', 'danger');
      return;
    }
    let resume_id = (document.getElementById("submit-resume-select") as HTMLSelectElement).value;

    if (typeof submit_target === 'string') {
      server.submitApply(submit_target, resume_id)
        .then(res => {
          if (res) {
            location.reload();
          } else {
            toggleModal('submit');
            alert('后台错误，投递失败', 'danger');
          }
        })
        .catch(err => {
          toggleModal('submit');
          alert('后台错误，投递失败', 'danger');
        })
    } else {
      // @ts-ignore
      for (let target of submit_target) {
        try {
          await server.submitApply(target, resume_id)
        } catch (err) {
          continue;
        }
      }
      location.reload();
    }
  }

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>岗位简历投递</h2>
          <hr />
        </div>
        <div className="dashboard-model-buttons">
          <button className="btn btn-primary" onClick={() => openSubmitModal()}>批量投递</button>
        </div>
        <div>
          {/* <Table table_head={table_head} table_body={table_body} checkbox={true} table_id="m-table" line_action={table_line_actions} check_change_function={checkChangeRecall} /> */}
          
        </div>
      </div>

      <Modal {...modalProps('submit', '投递确认', (
        <>
          <form id='form-add'>
            <div className="mb-3">
              <label className="form-label">是否确定向该岗位投递求职意向</label>
              <select id="submit-resume-select" className='form-control'>
                { resume_list }
              </select>
            </div>
          </form>
        </>
      ), (
        <button className='btn btn-primary' onClick={() => submitConfirm()}>确认</button>
      ))} />

      <Modal {...modalProps('info', '岗位信息', (
        <div className="job-info">
          <div className="title" id="job-info-title">
          </div>
          <div id="company-info-name"></div>
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
      ),)} />

      <Alert {...alertProps()} />
    </>
  );
}
'use client';

import Table, { TableLineActions } from "@/components/table/table.component";

import server from './student-job-audit.api'
import Modal from "@/components/modal/modal.component";
import { useEffect, useRef, useState } from "react";
import Alert from "@/components/alert/alert.component";
import { JobAudits } from "@/global/type";

import './student-job-audit.part.css';

export default function Page() {

  let checked_list: string[] = [];

  // const [cancleModalShown, setCancleModalShown] = useState(false);
  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({
    cancleModalShown: false,
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

  // const table_head = ['编号', '岗位编号', '岗位名称', '企业名称', '进度' ];
  // const table_body = server.fetchJobAudit().map(x => {
  //   return [x.id, x.job_id, x.job_id, x.company_id, x.progress];
  // });
  const [cancle_target, setCancleTarget] = useState<string | string[]>([]);
  const [job_list, setJobList] = useState<JobAudits>([]);
  const job_list_ref = useRef(job_list);
  const [table_head, setTableHead] = useState<string[]>(['编号', '岗位编号', '岗位名称', '企业名称', '进度']);
  const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  const [table_line_actions, setTableLineActions] = useState<TableLineActions>([{
    type: 'danger',
    text: '取消投递',
    action_function: (id: string) => {
      setCancleTarget(id);
      toggleModal('cancle');
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
      (document.getElementById("job-info-title") as HTMLElement).innerText = target.job_name as string;
      (document.getElementById("company-info-name") as HTMLElement).innerText = target.company_name as string;
      (document.getElementById("job-info-salary") as HTMLElement).innerText = target.salary as string;
      (document.getElementById("job-info-descript") as HTMLElement).innerText = target.descript as string;
      (document.getElementById("job-audit-progress") as HTMLElement).innerText = target.progress as string;
      (document.getElementById("company-info-feedback") as HTMLElement).innerText = target.feedback as string;
      toggleModal('info');
    }
  }]);

  useEffect(() => {
    job_list_ref.current = job_list;
  }, [job_list]);
  useEffect(() => {
    server.fetchJobAudit()
      .then(res => {
        console.log(res);
        server.fetchJobAudit()
          .then(res => {
            if (res) {
              setTableBody(res.map(x => [x.id, x.job_id, x.job_name, x.company_name, x.progress]));
              setJobList(res);
            }
            else
              alert('后台错误，拉取信息失败', 'danger');
          })
          .catch(err => {
            alert('后台错误，拉取信息失败', 'danger');
          });
      })
  }, []);

  const checkChangeRecall = (id_list: string[]) => {
    // setCheckedIdList(id_list);
    checked_list = id_list;
  };
  const cancleConfirm = async () => {
    if (!cancle_target || (typeof cancle_target === 'object' || cancle_target.length === 0)) {
      toggleModal('cancle');
      alert('编号为空', 'danger');
      return;
    }

    if (typeof cancle_target === 'string') {
      server.cancleJobAudit(cancle_target)
        .then(res => {
          if (res) {
            location.reload();
          } else {
            toggleModal('cancle');
            alert('后台错误，投递失败', 'danger');
          }
        })
        .catch(err => {
          toggleModal('cancle');
          alert('后台错误，投递失败', 'danger');
        })
    } else {
      // @ts-ignore
      for (let target of cancle_target) {
        try {
          await server.cancleJobAudit(target)
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
          <h2>简历投递进度</h2>
          <hr />
        </div>
        <div className="dashboard-model-buttons">
          <button className="btn btn-danger" onClick={() => toggleModal('cancle')}>批量取消</button>
        </div>
        <div>
          <Table table_head={table_head} table_body={table_body} table_id="m-table" line_action={table_line_actions} checkbox={true} check_change_function={checkChangeRecall}/>
        </div>
      </div>

      <Modal {...modalProps('cancle', '取消投递', (
        <p>是否批量取消投递</p>
      ), (
        <button className="btn btn-danger" onClick={cancleConfirm}>确定</button>
      ))} />

      <Modal {...modalProps('info', '岗位信息', (
        <div className="job-info">
          <div className="title" id="job-info-title">
          </div>
          <div className="under-title">
            <div id="company-info-name"></div>
            <div id="job-audit-progress"></div>
          </div>
          <div className="info">
            <div>
              <div>薪资</div>
              <div id="job-info-salary"></div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold'}}>描述</div>
              <div id="job-info-descript"></div>
            </div>
            <div>
              <div>企业回复</div>
              <div id="company-info-feedback"></div>
            </div>
          </div>
        </div>
      ),)} />

      <Alert {...alertProps()} />
    </>
  )
}
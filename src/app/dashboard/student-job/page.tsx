'use client';

import Modal from '@/components/modal/modal.component';
import server from './student-job.api';
import Table from "@/components/table/table.component";
import { useState } from 'react';
import Form from '@/components/form/form.component';

export default function Page() {

  const checked_list: string[] = []

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

  // const table_head = ['编号', '公司名称', '岗位名称', '薪资'];
  // const table_body = server.fetchJobs().map(x => {
  //   return [x.id, x.company_id, x.name, x.salary];
  // });
  const [table_head, setTableHead] = useState<string[]>(['编号', '公司名称', '岗位名称', '薪资']);
  const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>();

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>岗位简历投递</h2>
          <hr /> 
        </div>
        <div className="dashboard-model-buttons">
          <button className="btn btn-primary" onClick={() => setSubmitModalShown(true)}>批量投递</button>
        </div>
        <div>
          <Table table_head={table_head} table_body={table_body} checkbox={true} table_id="m-table" line_action={
            <>
              <a className="link-secondary text-decoration-none" onClick={() => setInfoModalShown(true)}>详细</a>
              <a className="link-primary text-decoration-none" onClick={() => setSubmitModalShown(true)}>投递</a>
            </>
          } />
        </div>
      </div>

      <Modal {...modalProps('submit', '投递确认', (
        <p>是否确定向该投递求职意向</p>
      ), (
        <button className='btn btn-primary' onClick={() => {}}>确认</button>
      ))} />

      <Modal {...modalProps('info', '岗位信息', (
        <div className='job-info'>
          <div>
            <div>岗位</div>
            <div>保安</div>
          </div>
        </div>
      ), )} />
    </>
  );
}
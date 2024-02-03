'use client';

import Table from '@/components/table/table.component';
import server from './student-annex.api';
import "./student-annex.part.css";
import { useState } from 'react';
import Modal from '@/components/modal/modal.component';

export default function Page() {

  const [addModalShown, setAddModalShown] = useState(false);
  const [delModalShown, setDelModalShown] = useState(false);
  const [infoModalShown, setInfoModalShown] = useState(false);

  const { resume, practice_document } = server.fetchAnnex()
  const [history_resume, history_practice_document] = server.fetchAnnexHistory();

  const history_resume_table_head = ['编号', '时间']
  const history_practice_document_table_head = ['编号', '时间']
  const line_action: React.ReactNode = (
    <>
      <a className='link-danger text-decoration-none' onClick={() => setDelModalShown(true)}>删除</a>
      <a className='link-secondary text-decoration-none' onClick={() => setInfoModalShown(true)}>预览</a>
    </>
  )
  const history_resume_table_body: Array<Array<string | number | undefined>> = history_resume.map(x => {
    return [x.id, x.created];
  });
  const history_practice_document_table_body: Array<Array<string | number | undefined>> = history_practice_document.map(x => {
    return [x.id, x.created];
  });

  return (
    <>
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>个人材料上传</h2>
          <hr />
        </div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="resume-tab" data-bs-toggle="tab" data-bs-target="#resume" type="button" role="tab" aria-controls="profile-msg" aria-selected="true">简历</button>
            <button className="nav-link" id="practice-document-tab" data-bs-toggle="tab" data-bs-target="#practice-document" type="button" role="tab" aria-controls="account-msg" aria-selected="false">实习材料</button>
          </div>
        </nav>
        <div className="tab-content student-annex-card-body" id="nav-tabContent">
          <div className="tab-pane fade show active" id="resume" role="tabpanel" aria-labelledby="resume-tab" >
            <div className="card" style={{ width: '100%' }}>
              <img src={resume} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">本页面材料具有法律效力</p>
                <div className="student-annex-card-body-buttons">
                  <a className="btn btn-primary btn-sm" onClick={() => setAddModalShown(true)}>上传新简历</a>
                  <a className="btn btn-danger btn-sm" onClick={() => setDelModalShown(true)}>删除</a>
                </div>
              </div>
            </div>
            <div>
              <Table table_id='table' table_head={history_resume_table_head} table_body={history_resume_table_body} line_action={line_action} />
            </div>
          </div>
          <div className="tab-pane fade" id="practice-document" role="tabpanel" aria-labelledby="practice-document-tab" >
            <div className="card" style={{ width: '100%' }}>
              <img src={practice_document} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">本页面材料具有法律效力</p>
                <div className="student-annex-card-body-buttons">
                  <a className="btn btn-primary btn-sm" onClick={() => setAddModalShown(true)}>上传新材料</a>
                  <a className="btn btn-danger btn-sm" onClick={() => setDelModalShown(true)}>删除</a>
                </div>
              </div>
            </div>
            <div>
              <Table table_id='table' table_head={history_practice_document_table_head} table_body={history_practice_document_table_body} line_action={line_action} />
            </div>
          </div>
        </div>
      </div>

      <Modal id="modal-add" shown={addModalShown} close_function={() => setAddModalShown(false)} modal_title='上传材料' modal_btns={
        <>
          <button className='btn btn-primary'>确认</button>
          <button className='btn btn-secondary' onClick={() => setAddModalShown(false)}>关闭</button>
        </>
      }>
        ...
      </Modal>

      <Modal id="modal-info" shown={infoModalShown} close_function={() => setInfoModalShown(false)} modal_title='详细' modal_btns={
        <>
          <button className='btn btn-secondary' onClick={() => setInfoModalShown(false) }>关闭</button>
        </>
      }>
        <div className='card'>
          <img className='card-img-top' src={resume} />
        </div>
      </Modal>

      <Modal id="modal-del" shown={delModalShown} close_function={() => setDelModalShown(false)} modal_title='确认删除' modal_btns={
        <>
          <button className='btn btn-danger'>确认</button>
          <button className='btn btn-secondary' onClick={() => setDelModalShown(false)}>关闭</button>
        </>
      }>
        删除内容后无法恢复，是否继续
      </Modal>
    </>
  )
}
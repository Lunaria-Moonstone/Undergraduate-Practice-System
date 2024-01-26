'use client';

import { useState } from 'react';

import Modal from '@/components/modal/modal.component';
import server from './teacher-student.api';
import Table from "@/components/table/table.component";
import { Student } from '@/global/type';
import './teacher-student.part.css';

export default function Page() {

  const [infoModalShown, setInfoModalShown] = useState(false);
  const [practiceRateModalShown, setPracticeRateModalShown] = useState(false);

  const table_head = ['编号', '姓名', '学号', '联系电话', '邮箱', '实习状态'];
  const table_body = server.fetchStudents().map((x: {
    id: string,
    name: string,
    number: string,
    phone: string,
    mail: string,
    practice_status: string,
  }) => {
    return [x.id, x.name, x.number, x.phone, x.mail, x.practice_status];
  });
  const student_info: Student = server.fetchStudent();

  const openPracticeRateModal = () => {
    setInfoModalShown(false);
    setPracticeRateModalShown(true);
  }

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>名下学生信息</h2>
          <hr />
        </div>
        {/* <div className="dashboard-model-buttons">
          <button className="btn btn-primary"></button>
        </div> */}
        <div>
          <Table table_head={table_head} table_body={table_body} table_id="s-table" line_action={
            <>
              <a className='link-secondary text-decoration-none' onClick={() => setInfoModalShown(true)}>详细</a>
            </>
          } />
        </div>
      </div>

      <Modal id="info-modal" shown={infoModalShown} close_function={() => setInfoModalShown(false)} modal_title='学生信息详细' modal_btns={
        <>
          <button className='btn btn-primary' onClick={() => openPracticeRateModal()}>查看实习材料</button>
          <button className='btn btn-secondary' onClick={() => setInfoModalShown(false)}>关闭</button>
        </>
      }>
        <div className='student-info-panel'>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--standard-padding-width)' }}>
            <div className='student-name'>
              {student_info.name}
            </div>
            <div className='student-number'>
              #{student_info.number}
            </div>
          </div>
          <div className='student-base-info'>
            <div>
              <div>年级</div>
              <div>{student_info.grade}</div>
            </div>
            <div>
              <div>联系电话</div>
              <div>{student_info.phone}</div>
            </div>
            <div>
              <div>联系邮箱</div>
              <div>{student_info.mail}</div>
            </div>
            <div>
              <div>实习状态</div>
              <div>{student_info.is_practice}</div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal id="practice-score-modal" shown={practiceRateModalShown} close_function={() => setPracticeRateModalShown(false)} modal_title='实习材料打分' modal_btns={
        <>
          <button className='btn btn-secondary' data-bs-dismiss="modal">关闭</button>
        </>
      }>
        {/* 顶部评分区 */}
        <div className='practice-score-area'>
          <form>
            <div><input className='form-control' type="number"/><button className='btn btn-primary'>登录得分</button></div>
          </form>
        </div>
        <div className='practice-annex-area'>

        </div>
      </Modal>
    </>
  );
}
'use client';

import Table from "@/components/table/table.component";
import { StudentWithJob, StudentsWithJob } from "@/global/type";
import { useState } from "react";
import server from './company-student.api';
import Modal from "@/components/modal/modal.component";
import './company-student.part.css'

export default function Page() {

  const [infoModalShown, setInfoModalShown] = useState(false);
  const [exportModalShown, setExportModalShown] = useState(false);

  const students: StudentsWithJob = server.fetchStudents();
  const table_head = ['应聘学生姓名', '应聘岗位名称', '当前状态'];
  const table_body: Array<Array<string | number | undefined>> = students.map(x => {
    return [x.student_name, x.job_name, x.progress];
  });
  const student: StudentWithJob = server.fetchStudent();

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>应聘人员一览</h2>
        </div>
        <hr /><div className="dashboard-model-buttons">
          <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button>
        </div>
        {/* 数据表格区域 */}
        <Table table_id="table" table_head={table_head} table_body={table_body} checkbox={true} line_action={
          <>
            <a className="link-secondary text-decoration-none" onClick={() => setInfoModalShown(true)}>详细</a>
          </>
        } />
      </div >

      <Modal id="modal-info" shown={infoModalShown} close_function={() => setInfoModalShown(false)} modal_title="应聘信息详细" modal_btns={
        <>
          <button type="button" className="btn btn-secondary" onClick={() => setInfoModalShown(false)} >关闭</button>
        </>
      }>
        <div className="student-info">
          <div className="title">
            <div className="title-left">
              <div style={{ fontWeight: 'bolder', fontSize: 'large' }}>{student.student_name}</div>
              <div style={{ fontSize: 'smaller', color: 'gray' }}>#{student.job_name}</div>
            </div>
            <div style={{ fontSize: 'larger', fontWeight: 'bold' }}>{student.progress}</div>
          </div>
          <div className="feedback">
            <div className="card">
              <div className="card-body">
                <img className="card-head-img" src={"data:image/png;base64," + student.resume} />
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
      </Modal>

      <Modal id="modal-export" shown={exportModalShown} close_function={() => setExportModalShown(false)} modal_title="导出确认" modal_btns={
        <>
          <button className="btn btn-primary">确定</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(false)}>取消</button>
        </>
      }>
        是否将选定内容导出至外部
      </Modal>
    </>
  )
}
'use client';

import Table from "@/components/table/table.component";
import { StudentWithJob, StudentsWithJob } from "@/global/type";
import { useState } from "react";
import server from './company-student.api';
import Modal from "@/components/modal/modal.component";

export default function Page() {

  const [infoModalShown, setInfoModalShown] = useState(false);
  const [exportModalShown, setExportModalShown] = useState(false);

  const students: StudentsWithJob = server.fetchStudents();
  const table_head = ['应聘学生姓名', '应聘岗位名称', '当前状态' ];
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
        <Table table_head={table_head} table_body={table_body} checkbox={true} line_action={
          <>
            <a className="link-secondary text-decoration-none" onClick={() => setInfoModalShown(true)}>详细</a>
          </>
        }/>
      </div >

      <Modal id="modal-info" shown={infoModalShown} close_function={() => setInfoModalShown(false)} modal_title="应聘信息详细" modal_btns={
        <>
          <button type="button" className="btn btn-secondary" onClick={() => setInfoModalShown(false)} >关闭</button>
        </>
      }>
        ...
      </Modal>

      <Modal id="modal-export" shown={exportModalShown} close_function={() => setExportModalShown(false)} modal_title="导出确认" modal_btns={
        <>
          <button className="btn btn-primary">确定</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(false)}>取消</button>
        </>
      }>
        是否将选定内容导出至外部?
      </Modal>
    </>
  )
}
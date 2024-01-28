'use client';

import Table from "@/components/table/table.component";
import { StudentsWithJob } from "@/global/type";
import { useState } from "react";
import server from './company-student.api';

export default function Page() {

  const [addModalShown, setAddModalShown] = useState(false);

  const students: StudentsWithJob = server.fetchStudents();
  const table_head = ['应聘学生姓名', '应聘岗位名称', '当前状态' ];
  const table_body: Array<Array<string | number | undefined>> = students.map(x => {
    return [x.student_name, x.job_name, x.progress];
  })

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>应聘人员一览</h2>
        </div>
        <hr /><div className="dashboard-model-buttons">
          <button className="btn btn-primary" onClick={() => setAddModalShown(true)}>新增</button>
          <button className="btn btn-danger">删除</button>
          <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary">导出</button>
        </div>
        {/* 数据表格区域 */}
        <Table table_head={table_head} table_body={table_body}/>
      </div >
    </>
  )
}
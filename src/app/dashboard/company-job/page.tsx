'use client';

import { Jobs } from "@/global/type";
import { useState } from "react";

import server from './company-job.api';
import Table from "@/components/table/table.component";

export default function Page() {
  
  const [addModalShown, setAddModalShown] = useState(false);

  const jobs: Jobs = server.fetchJob();
  const table_head: Array<string> = ['编号', '岗位名称', '薪资', ];
  const table_body: Array<Array<string | number | undefined>> = jobs.map(x => {
    return [x.id, x.name, x.salary];
  });

  return (
    <>
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>招聘岗位设置</h2>
        </div>
        <hr />
        {/* 功能按钮区域 */}
        <div className="dashboard-model-buttons">
          <button className="btn btn-primary" onClick={() => setAddModalShown(true)}>新增</button>
          <button className="btn btn-danger">删除</button>
          <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary">导出</button>
        </div>
        {/* 数据表格区域 */}
        <Table table_head={table_head} table_body={table_body} line_action={
          <>
            <a className="link-secondary text-decoration-none">详细</a>
          </>
        }/>
      </div>
    </>
  )
}
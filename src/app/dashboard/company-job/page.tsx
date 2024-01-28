'use client';

import { Jobs } from "@/global/type";
import { useState } from "react";

import server from './company-job.api';
import Table from "@/components/table/table.component";
import Modal from "@/components/modal/modal.component";

export default function Page() {
  
  const [addModalShown, setAddModalShown] = useState(false);
  const [infoModalShown, setInfoModalShown] = useState(false);

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
            <a className="link-secondary text-decoration-none" onClick={() => setInfoModalShown(true)}>详细</a>
            <a className="link-warning text-decoration-none">修改</a>
          </>
        }/>
      </div>

      {/* 添加岗位 */}
      <Modal id="modal-add" shown={addModalShown} close_function={() => setAddModalShown(false)} modal_title="新增招聘岗位" modal_btns={
        <>
          <button className="btn btn-primary" >确认</button>
          <button className="btn btn-secondary" onClick={() => setAddModalShown(false)}>关闭</button>
        </>
      }>
        ...
      </Modal>

      {/* 岗位信息 */}
      <Modal id="modal-info" shown={infoModalShown} close_function={() => setInfoModalShown(false)} modal_title="岗位信息" modal_btns={
        <>
          <button className="btn btn-secondary" onClick={() => setInfoModalShown(false)}>关闭</button>
        </>
      }>
        ...
      </Modal>
    </>
  )
}
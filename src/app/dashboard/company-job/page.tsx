'use client';

import { FormItems, Job, Jobs } from "@/global/type";
import { useState } from "react";

import server from './company-job.api';
import Table from "@/components/table/table.component";
import Modal from "@/components/modal/modal.component";
import Form from "@/components/form/form.component";

import './company-job.part.css';

export default function Page() {
  
  const [addModalShown, setAddModalShown] = useState(false);
  const [infoModalShown, setInfoModalShown] = useState(false);
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [exportModalShown, setExportModalShown] = useState(false);

  const formAddItems: FormItems = [
    { label: '岗位名称', type: 'input' },
    { label: '薪资', type: 'input' },
    { label: '描述', type: 'textarea' },
  ]

  const jobs: Jobs = server.fetchJobs();
  const table_head: Array<string> = ['编号', '岗位名称', '薪资', ];
  const table_body: Array<Array<string | number | undefined>> = jobs.map(x => {
    return [x.id, x.name, x.salary];
  });
  const job: Job = server.fetchJob();

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
          <button className="btn btn-danger" onClick={() => setDeleteModalShown(true)}>删除</button>
          <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button>
        </div>
        {/* 数据表格区域 */}
        <Table table_head={table_head} table_body={table_body} checkbox={true} line_action={
          <>
            <a className="link-secondary text-decoration-none" onClick={() => setInfoModalShown(true)}>详细</a>
            <a className="link-warning text-decoration-none">修改</a>
            <a className="link-danger text-decoration-none">删除</a>
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
        <Form form_id="form-add" form_items={formAddItems} />
      </Modal>

      {/* 岗位信息 */}
      <Modal id="modal-info" shown={infoModalShown} close_function={() => setInfoModalShown(false)} modal_title="岗位信息" modal_btns={
        <>
          <button className="btn btn-secondary" onClick={() => setInfoModalShown(false)}>关闭</button>
        </>
      }>
        <div className="job-info">
          <div className="title">
            {job.name}
          </div>
          <div className="info">
            <div>
              <div>薪资</div>
              <div>{job.salary}</div>
            </div>
            <div>
              <div>描述</div>
              <div>{job.descript}</div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 岗位删除确认 */}
      <Modal id="modal-delete" shown={deleteModalShown} close_function={() => setDeleteModalShown(false)} modal_title="是否确认删除" modal_btns={
        <>
          <button className="btn btn-danger">确认</button>
          <button className="btn btn-secondary" onClick={() => setDeleteModalShown(false)}>取消</button>
        </>
      }>
        删除内容后无法恢复，是否继续
      </Modal>

      {/* 岗位导出设置 */}
      <Modal id="modal-export" shown={exportModalShown} close_function={() => setExportModalShown(false)} modal_title="是否确认导出" modal_btns={
        <>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(false)}>关闭</button>
        </>
      }>
        是否将选定内容导出至外部
      </Modal>
    </>
  )
}
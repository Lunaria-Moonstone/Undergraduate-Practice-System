'use client';

import Table from "@/components/table/table.component";

import server from './student-job-audit.api'
import Modal from "@/components/modal/modal.component";
import { useState } from "react";

export default function Page() {

  const [cancleModalShown, setCancleModalShown] = useState(false);

  const table_head = ['编号', '岗位编号', '岗位名称', '企业名称', '进度' ];
  const table_body = server.fetchJobAudit().map(x => {
    return [x.id, x.job_id, x.job_id, x.company_id, x.progress];
  });

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>简历投递进度</h2>
          <hr /> 
        </div>
        <div className="dashboard-model-buttons">
          <button className="btn btn-danger" onClick={() => setCancleModalShown(true)}>批量取消</button>
        </div>
        <div>
          <Table table_head={table_head} table_body={table_body} table_id="m-table" line_action={
            <>
              <a className="link-secondary text-decoration-none">详细</a>
              <a className="link-danger text-decoration-none" onClick={() => setCancleModalShown(true)}>取消投递</a>
            </>
          } />
        </div>
      </div>

      <Modal id="modal-cancle" shown={cancleModalShown} close_function={() => setCancleModalShown(false)} modal_title="取消投递" modal_btns={
        <>
          <button className="btn btn-danger">确定</button>
          <button className="btn btn-secondary">取消</button>
        </>
      }>   
        是否批量取消投递
      </Modal>
    </>
  )
}
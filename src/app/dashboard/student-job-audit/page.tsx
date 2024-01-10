import Table from "@/components/table/table.component";

import server from './student-job-audit.api'

export default function Page() {

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
        {/* <div className="dashboard-model-buttons">
          <button className="btn btn-primary">批量投递</button>
        </div> */}
        <div>
          <Table table_head={table_head} table_body={table_body} table_id="m-table" line_action={
            <>
              <a className="link-secondary text-decoration-none">详细</a>
              <a className="link-danger text-decoration-none">取消投递</a>
            </>
          } />
        </div>
      </div>
    </>
  )
}
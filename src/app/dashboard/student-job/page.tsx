import server from './student-job.api';
import Table from "@/components/table/table.component";

export default function Page() {
  const table_head = ['编号', '公司名称', '岗位名称', '薪资'];
  const table_body = server.fetchJobs().map(x => {
    return [x.id, x.company_id, x.name, x.salary];
  });

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>岗位简历投递</h2>
          <hr /> 
        </div>
        <div className="dashboard-model-buttons">
          <button className="btn btn-primary">批量投递</button>
        </div>
        <div>
          <Table table_head={table_head} table_body={table_body} checkbox={true} table_id="m-table" line_action={
            <>
              <a className="link-secondary text-decoration-none">详细</a>
              <a className="link-primary text-decoration-none">投递</a>
            </>
          } />
        </div>
      </div>
    </>
  )
}
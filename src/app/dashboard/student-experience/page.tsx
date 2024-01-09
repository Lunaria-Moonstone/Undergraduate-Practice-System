import { StudentPracticeExperiencies } from '@/global/type';
import server from './student-experience.api'
import { ReactNode } from 'react';
import Modal from '@/components/modal/modal.component';
import Select from '@/components/select-with-search/select-with-search.component';

export default function Page() {

  const experiencies: StudentPracticeExperiencies = server.fetchExperience();
  const table_body: ReactNode = experiencies.map((x, index) => {
    return (
      <tr key={index}>
        <td style={{ display: 'none' }}>{x.id}</td>
        <td>{x.company_id}</td>
        <td>{x.start}</td>
        <td>{x.end}</td>
        <td className='table-inline-buttons' style={{ width: '300px', minWidth: '300px' }}>
          <a className='link-danger text-decoration-none'>删除</a>
          <a className='link-warning text-decoration-none'>修改</a>
        </td>
      </tr>
    )
  });
  const company_opts: { label: string, value: string | number }[] = server.fetchCompanies().map(x => {
    return {
      label: x.name,
      value: x.id
    }
  })

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>实习经历一览</h2>
          <hr />
        </div>
        <div className="dashboard-model-buttons">
          {/* <button className="btn btn-success">添加</button> */}
          <Modal btn_name='添加' btn_class='btn btn-success' modal_id='add-modal' modal_title='添加实习经历' modal_btns={
            <>
              <button type="button" className="btn btn-primary">保存</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
            </>
          }>
            <div>
              <div className="mb-3">
                <label className="form-label">企业名称</label>
                <Select opts={company_opts} placeholder="企业名称" component_id="company-search" />
              </div>
              <div className="mb-3">
                <label className="form-label">入职时间</label>
                <input className="form-control" type="date" defaultValue="1999-01-01" />
              </div>
              <div className="mb-3">
                <label className="form-label">离职时间</label>
                <input className="form-control" type="date" defaultValue="1999-01-01" />
              </div>
            </div>
          </Modal>
          <button className="btn btn-danger">删除</button>
          <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary">导出</button>
        </div>
        <div className="dashboard-model-table">
          <div className="dashboard-model-table-body">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th style={{ display: 'none' }}>编号</th>
                  <th>企业名称</th>
                  <th>就职时间</th>
                  <th>离职时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {table_body}
              </tbody>
            </table>
          </div>
          <div className="dashboard-model-table-pagination">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
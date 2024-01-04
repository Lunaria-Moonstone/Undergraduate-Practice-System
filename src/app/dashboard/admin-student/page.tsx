import { ReactNode } from 'react';

import { Students } from '@/global/type';
import server from './admin-student.api';

export default function Page() {

  const students: Students = server.fetchStudent();
  const table_body: ReactNode = students.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.id}</td>
        <td>{x.name}</td>
        <td>{x.number}</td>
        <td>{x.grade}</td>
        <td>{x.phone}</td>
        <td>{x.mail}</td>
        <td>{x.is_practice ? '是': '否'}</td>
        <td>{x.is_practice ? x.practice_cmp[-1] : '未处于实习状态'}</td>
        <td>{x.has_vitae ? '有' : '无'}</td>
        <td>{x.has_proof ? '有' : '无'}</td>
        <td>{x.score != undefined ? x.score : '未录入实习成绩'}</td>
        <td className='table-inline-buttons' style={{ width: '300px', minWidth: '300px'}}>
          <a className='link-danger text-decoration-none'>删除</a>
          <a className='link-warning text-decoration-none'>修改</a>
          <a className='link-info text-decoration-none'>查看个人简历</a>
          <a className='link-info text-decoration-none'>查看实习凭证</a>
          {/* <a className='link-secondary text-decoration-none'>更多</a> */}
        </td>
      </tr>
    )
  })

  return (
    <>
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>学生信息管理</h2>
        </div>
        <hr />
        {/* 功能按钮区域 */}
        <div className="dashboard-model-buttons">
          <button className="btn btn-primary">新增</button>
          <button className="btn btn-danger">删除</button>
          <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary">导出</button>
        </div>
        {/* 数据表格区域 */}
        <div className="dashboard-model-table">
          <div className="dashboard-model-table-body">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>编号</th>
                  <th>学生姓名</th>
                  <th>学号</th>
                  <th>年级</th>
                  <th>联系电话</th>
                  <th>联系邮箱</th>
                  <th>是否处于实习中</th>
                  <th>当前实习公司</th>
                  <th>个人简历</th>
                  <th>实习凭证</th>
                  <th>实习分数</th>
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
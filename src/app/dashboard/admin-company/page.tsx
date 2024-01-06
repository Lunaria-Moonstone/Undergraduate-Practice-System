'use client'

import { ReactNode } from 'react';

import server from './admin-company.api';
import { FormItems } from '@/global/type';
import { formInput } from '@/utils/input';
import Modal from '@/components/modal/modal.component';
import Form from '@/components/form/form.component';

export default function Page() {
  const companies = server.fetchCompanies();
  const table_body: ReactNode = companies.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.id}</td>
        <td>{x.name}</td>
        <td>{x.phone}</td>
        <td>{x.mail}</td>
        <td className='table-inline-buttons' style={{ width: '300px', minWidth: '300px' }}>
          <a className='link-danger text-decoration-none'>删除</a>
          <a className='link-warning text-decoration-none'>修改</a>
        </td>
      </tr>
    )
  });
  const add_form_items: FormItems = [
    { label: '企业名称', type: 'input' },
    { label: '联系电话', type: 'input' },
    { label: '联系邮箱', type: 'input' },
  ];
  const saveAdd = () => {
    let form_value = formInput(document.getElementById('add-form') as HTMLElement);
    console.log(form_value);
  }

  return (
    <>
    <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>企业信息管理</h2>
        </div>
        <hr />
        {/* 功能按钮区域 */}
        <div className="dashboard-model-buttons">
          {/* <button className="btn btn-primary">新增</button> */}
          <Modal btn_name='添加' btn_class='btn btn-success' modal_id='add-modal' modal_title='添加学生信息' modal_btns={
            <>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
              <button type="button" className="btn btn-success" onClick={saveAdd}>添加</button>
            </>
          }>
            <Form form_items={add_form_items} form_id="add-form" />
          </Modal>
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
                  <th>企业名称</th>
                  <th>联系电话</th>
                  <th>联系邮箱</th>
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
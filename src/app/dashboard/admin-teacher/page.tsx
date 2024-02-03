'use client'

import { FormItems, Teachers } from "@/global/type";
import { ReactNode, useState } from "react";

import server from './admin-teacher.api';
import Modal from "@/components/modal/modal.component";
import Form from "@/components/form/form.component";
import { formInput } from "@/utils/input";
import Table from "@/components/table/table.component";

export default function Page() {

  const [addModalShown, setAddModalShown] = useState(false);
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [exportModalShown, setExportModalShown] = useState(false);

  const teachers: Teachers = server.fetchTeacher();
  const table_head: Array<string> = ['编号', '教师姓名', '工号', '联系电话', '联系邮箱'];
  const table_body: Array<Array<string | number | undefined>> = teachers.map(x => {
    return [x.id, x.name, x.number, x.phone, x.mail];
  });
  const add_form_items: FormItems = [
    { label: '教师姓名', type: 'input' },
    { label: '教师工号', type: 'input' },
    { label: '教师联系电话', type: 'input' },
    { label: '教师邮箱', type: 'input' },
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
          <h2>教师信息管理</h2>
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
        <Table table_id="table" table_head={table_head} table_body={table_body} checkbox={true} line_action={
          <>
            <a className='link-danger text-decoration-none'>删除</a>
            <a className='link-warning text-decoration-none'>修改</a>
          </>
        } />
      </div>

      <Modal shown={addModalShown} id='add-modal' modal_title='添加教师信息' close_function={() => setAddModalShown(false)} modal_btns={
        <>
          <button type="button" className="btn btn-primary">确认</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAddModalShown(false)}>关闭</button>
        </>
      }>
        <Form form_items={add_form_items} form_id="add-form" />
      </Modal>

      {/* 删除确认 */}
      <Modal id="modal-delete" shown={deleteModalShown} close_function={() => setDeleteModalShown(false)} modal_title="是否确认删除" modal_btns={
        <>
          <button className="btn btn-danger">确认</button>
          <button className="btn btn-secondary" onClick={() => setDeleteModalShown(false)}>取消</button>
        </>
      }>
        删除内容后无法恢复，是否继续
      </Modal>

      {/* 导出设置 */}
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
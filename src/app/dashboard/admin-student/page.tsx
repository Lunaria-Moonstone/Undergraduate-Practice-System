'use client'

import { ReactNode, useState } from 'react';

import { Students, FormItems } from '@/global/type';
import server from './admin-student.api';
import { formInput } from '@/utils/input';

import Modal from '@/components/modal/modal.component';
import Form from '@/components/form/form.component';
import Table from '@/components/table/table.component';

export default function Page() {

  const [addModalShown, setAddModalShown] = useState(false);
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [exportModalShown, setExportModalShown] = useState(false);

  const students: Students = server.fetchStudent();
  const table_head: Array<string> = ['编号', '学生姓名', '学号', '年级', '联系电话', '联系邮箱', '是否处于实习中', '当前实习公司', '个人简历', '实习凭证', '实习分数',];
  const table_body: Array<Array<string | number | undefined>> = students.map(x => {
    return [
      x.id, x.name, x.number, x.grade, x.phone, x.mail,
      x.is_practice ? '是' : '否',
      x.is_practice ? x.practice_cmp[-1] : '未处于实习状态',
      x.has_vitae ? '有' : '无',
      x.has_proof ? '有' : '无',
      x.score !== undefined ? x.score : '未录入实习成绩'
    ];
  });

  const add_form_items: FormItems = [
    { label: '学生姓名', type: 'input' },
    { label: '学生学号', type: 'input' },
    {
      label: '年级', type: 'select', selectOpt: [
        { label: '2020级', value: '2020' },
        { label: '2021级', value: '2021' },
        { label: '2022级', value: '2022' },
        { label: '2023级', value: '2023' },
      ]
    },
  ]

  const saveAdd = () => {
    let form_value: Array<string | number | boolean | undefined> = formInput(document.getElementById('add-form') as HTMLElement);
    console.log(form_value);
  }

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
          <button className="btn btn-primary" onClick={() => setAddModalShown(true)}>新增</button>
          <button className="btn btn-danger" onClick={() => setDeleteModalShown(true)}>删除</button>
          <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button>
        </div>
        {/* 数据表格区域 */}
        <Table table_head={table_head} table_body={table_body} checkbox={true} line_action={
          <>
            <a className='link-danger text-decoration-none'>删除</a>
            <a className='link-warning text-decoration-none'>修改</a>
            <a className='link-info text-decoration-none'>查看个人简历</a>
            <a className='link-info text-decoration-none'>查看实习凭证</a>
          </>
        } />
      </div>

      <Modal shown={addModalShown} id='add-modal' modal_title='添加学生信息' close_function={() => setAddModalShown(false)} modal_btns={
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
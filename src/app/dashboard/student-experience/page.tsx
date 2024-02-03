'use client';

import { StudentPracticeExperiencies } from '@/global/type';
import server from './student-experience.api'
import { ReactNode, useState } from 'react';
import Modal from '@/components/modal/modal.component';
import Select from '@/components/select-with-search/select-with-search.component';
import Table from '@/components/table/table.component';

import './student-experience.part.css';

export default function Page() {

  const [addModalShown, setAddModalShown] = useState(false);
  const [delModalShown, setDelModalShown] = useState(false);
  const [exportModalShown, setExportModalShown] = useState(false);
  const [infoModalShown, setInfoModalShown] = useState(false);

  const experiencies: StudentPracticeExperiencies = server.fetchExperience();
  const table_head: Array<string> = ['企业名称', '就职时间', '离职时间'];
  const table_body: Array<Array<string | number | undefined>> = experiencies.map(x => {
    return [x.company_id, x.start, x.end];
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
          <button className="btn btn-success" onClick={() => setAddModalShown(true)}>添加</button>
          <button className="btn btn-danger" onClick={() => setDelModalShown(true)}>删除</button>
          <button className="btn btn-secondary">导入</button>
          <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button>
        </div>
        <Table table_id='table' table_head={table_head} table_body={table_body} checkbox={true} line_action={
          <>
            <a className='link-danger text-decoration-none' onClick={() => setDelModalShown(true)}>删除</a>
            <a className='link-secondary text-decoration-none' onClick={() => setInfoModalShown(true)}>详细</a>
          </>
        } />
      </div>

      <Modal shown={addModalShown} id='modal-add' modal_title='添加实习经历' close_function={() => setAddModalShown(false)} modal_btns={
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

      <Modal shown={delModalShown} id='modal-del' modal_title='确认删除' close_function={() => setDelModalShown(false)} modal_btns={
        <>
          <button className="btn btn-danger">确认</button>
          <button className="btn btn-secondary" onClick={() => setDelModalShown(false)}>取消</button>
        </>
      }>
        删除内容后无法恢复，是否继续
      </Modal>

      <Modal shown={infoModalShown} id="modal-info" modal_title='详细' close_function={() => setInfoModalShown(false)} modal_btns={
        <>
          <button className='btn btn-secondary' onClick={() => setInfoModalShown(false)}>关闭</button>
        </>
      }>
        <div className='experience-info'>
          <div>
            <div>企业名称</div>
            <div>国家安全局</div>
          </div>
          <div>
            <div>入职时间</div>
            <div>2023-07-10</div>
          </div>
          <div>
            <div>离职时间</div>
            <div>2024-02-01</div>
          </div>
        </div>
      </Modal>

      <Modal shown={exportModalShown} id="modal-export" modal_title='导出数据' close_function={() => setExportModalShown(false)} modal_btns={
        <>
          <button className='btn btn-primary'>确定</button>
          <button className='btn btn-secondary' onClick={() => setExportModalShown(false)}>关闭</button>
        </>
      }>
        是否将选定内容导出至外部
      </Modal>
    </>
  )
}
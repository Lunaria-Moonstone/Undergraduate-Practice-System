'use client';

import { Announcements, FormItems } from '@/global/type';
import server from './admin-home.api';
import './admin-home.part.css';
import { useState } from 'react';
import Modal from '@/components/modal/modal.component';
import Form from '@/components/form/form.component';

export default function Page() {

  const [addModalShown, setAddModalShown] = useState(false);
  const [delModalShown, setDelModalShown] = useState(false);
  const [infoModalShown, setInfoModalShown] = useState(false);

  const addFormItems: FormItems = [
    { label: '标题', type: 'input' },
    { label: '内容', type: 'textarea' },
  ];

  const announcements: Announcements = server.fetchAnnouncements();
  const announcements_body: React.ReactNode = announcements.map((x, index) => {
    return (
      <div className='card' key={index}>
        <div className='card-body'>
          <h5 className="card-title">
            {x.title}
          </h5>
          <p className='card-text'>
            {x.descript}
          </p>
          <div className='card-inline-actions'>
            <button className='btn btn-secondary btn-sm' onClick={() => setInfoModalShown(true)}>详细</button>
            <button className='btn btn-danger btn-sm' onClick={() => setDelModalShown(true)}>删除</button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="dashboard-base-panel" style={{ height: '100vh' }}>
        <div className="dashboard-model-title">
          <h2>个人中心</h2>
          <hr />
        </div>
        <div className="dashboard-model-body" style={{ display: 'flex', flexDirection: 'row', flex: 1, height: '100%' }}>
          <div style={{ width: '50%', paddingInlineEnd: 'calc(var(--standard-padding-width) / 2)' }}>
            <div className="card" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-title">个人信息</div>
                <div className="admin-info-panel">
                  <div>
                    <span>姓名</span>
                    <p>lain</p>
                  </div>
                  <div>
                    <span>学号</span>
                    <p>20044231</p>
                  </div>
                  <div>
                    <span>联系电话</span>
                    <p>110</p>
                  </div>
                  <div>
                    <span>联系邮箱</span>
                    <p>110@outlook.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, paddingInlineStart: 'calc(var(--standard-padding-width))', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className='card' style={{ height: '100%' }}>
              <div className="card-body notification-cards">
                <div style={{ marginBlock: 'var(--standard-padding-width)' }}>
                  <button className='btn btn-primary' onClick={() => setAddModalShown(true)}>发布公告</button>
                </div>
                {announcements_body}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 添加窗体 */}
      <Modal id="modal-add" shown={addModalShown} close_function={() => setAddModalShown(false)} modal_title='添加公告' modal_btns={
        <>
          <button type="button" className="btn btn-primary">确认</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAddModalShown(false)}>关闭</button>
        </>
      }>
        <Form form_id="form-add" form_items={addFormItems} />
      </Modal>

      <Modal id="modal-info" shown={infoModalShown} close_function={() => setInfoModalShown(false)} modal_title='公告详细' modal_btns={
        <>
          <button className='btn btn-secondary' onClick={() => setInfoModalShown(false)}>关闭</button>
        </>
      }>
        ...
      </Modal>

      {/* 删除确认 */}
      <Modal id="modal-delete" shown={delModalShown} close_function={() => setDelModalShown(false)} modal_title="是否确认删除" modal_btns={
        <>
          <button className="btn btn-danger">确认</button>
          <button className="btn btn-secondary" onClick={() => setDelModalShown(false)}>取消</button>
        </>
      }>
        删除内容后无法恢复，是否继续
      </Modal>
    </>
  )
}
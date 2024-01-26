'use client';

import { useState } from 'react';

import { Announcements,  } from '@/global/type';
import server from './teacher-home.api';
import Modal from '@/components/modal/modal.component';
import './teacher-home.part.css';

export default function Page() {

  const [infoModalShown, setInfoModalShown] = useState(false);

  const announcement_items: Announcements = server.fetchAnnouncements();
  const announcements_body: React.ReactNode = announcement_items.map((x, index) => {
    return (
      <div className="card" key={index}>
        <div className="card-body">
          <h5 className="card-title">
            {x.title}
          </h5>
          <p className='card-text'>
            {x.descript}
          </p>
        </div>
      </div>
    )
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
                <div className="teacher-info-panel">
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
            {/* <div className="card" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-title">通知</div>
              </div>
            </div> */}
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="announcement-tab" data-bs-toggle="tab" data-bs-target="#announcement" type="button" role="tab" aria-controls="account-msg" aria-selected="false">公告</button>
              </div>
            </nav>
            <div className="tab-content student-annex-card-body" id="nav-tabContent" style={{ flex: 1 }}>
              <div className="tab-pane fade show active" id="announcement" role="tabpanel" aria-labelledby="announcement-tab" style={{ width: '100%', height: '100%' }}>
                <div className="card" style={{ height: '100%', borderTop: '0', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
                  <div className="card-body notification-cards">
                    {announcements_body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
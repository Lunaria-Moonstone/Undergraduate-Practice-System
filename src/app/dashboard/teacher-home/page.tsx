'use client';

import { useEffect, useState } from 'react';

import { Announcements,  } from '@/global/type';
import server from './teacher-home.api';
import Modal from '@/components/modal/modal.component';
import './teacher-home.part.css';

export default function Page() {

  const [infoModalShown, setInfoModalShown] = useState(false);
  const [alertShown, setAlertShown] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'>('info');
  const alert = (message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark') => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertShown(true);
  }
  const alertClear = () => {
    setAlertMessage("");
    setAlertShown(false);
  }

  const [notifications_body, setNotificationsBody] = useState<React.ReactNode>();
  const [announcements_body, setAnnouncementsBody] = useState<React.ReactNode>();

  useEffect(() => {
    server.fetchNotifications()
      .then(res => {
        setNotificationsBody(
          res.map((x, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-body">
                  <h5 className="card-title">
                    {x.title}
                  </h5>
                  <p className='card-text'>
                    {x.simple_descript}
                  </p>
                  <div className="notification-inline-btns">
                    <a className='btn btn-primary btn-sm' onClick={() => setInfoModalShown(true)}>详细</a>
                    <a className='btn btn-secondary btn-sm'>忽略</a>
                  </div>
                </div>
              </div>
            );
          })
        );
      })
      .catch(err => {
        console.log(err);
        alert("后台错误，抓取信息失败", 'danger');
      });
    server.fetchAnnouncements()
      .then(res => {
        setAnnouncementsBody(
          res.map((x, index) => {
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
          })
        );
      })
      .catch(err => {
        console.log(err);
        alert("后台错误，抓取信息失败", 'danger');
      });
    server.fetchTeacherInfo()
      .then(res => {
        (document.getElementById("teacher-name") as HTMLElement).innerText = res.name;
        (document.getElementById("teacher-number") as HTMLElement).innerText = res.number;
        (document.getElementById("teacher-phone") as HTMLElement).innerText = res.phone;
        (document.getElementById("teacher-mail") as HTMLElement).innerText = res.mail;
      })
      .catch(err => {

      })
  }, [])

  // const announcement_items: Announcements = server.fetchAnnouncements();
  // const announcements_body: React.ReactNode = announcement_items.map((x, index) => {
  //   return (
  //     <div className="card" key={index}>
  //       <div className="card-body">
  //         <h5 className="card-title">
  //           {x.title}
  //         </h5>
  //         <p className='card-text'>
  //           {x.descript}
  //         </p>
  //       </div>
  //     </div>
  //   )
  // });

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
                    <p id="teacher-name">lain</p>
                  </div>
                  <div>
                    <span>学号</span>
                    <p id="teacher-number">20044231</p>
                  </div>
                  <div>
                    <span>联系电话</span>
                    <p id="teacher-phone">110</p>
                  </div>
                  <div>
                    <span>联系邮箱</span>
                    <p id="teacher-mail">110@outlook.com</p>
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
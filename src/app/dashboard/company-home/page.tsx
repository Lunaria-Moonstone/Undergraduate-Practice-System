'use client';

import { useEffect, useState } from 'react';

import { Notification, Notifications } from '@/global/type';
import Modal from '@/components/modal/modal.component';
import server from './company-home.api';
import './company-home.part.css';
import Alert from '@/components/alert/alert.component';

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

  // const notifition_items: Notifications = server.fetchNotifications();
  // const notifications_body: React.ReactNode = notifition_items.map((x, index) => {
  //   return (
  //     <div className="card" key={index}>
  //       <div className="card-body">
  //         <h5 className="card-title">
  //           {x.title}
  //         </h5>
  //         <p className='card-text'>
  //           {x.simple_descript}
  //         </p>
  //         <div className="notification-inline-btns">
  //           <a className='btn btn-primary btn-sm' onClick={() => setInfoModalShown(true)}>详细</a>
  //           <a className='btn btn-secondary btn-sm'>忽略</a>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });
  // const notification_modal_item: Notification = server.fetchNotification();

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
    server.fetchCompanyInfo()
      .then(res => {
        (document.getElementById("company-name") as HTMLElement).innerText = res.name;
        (document.getElementById("company-phone") as HTMLElement).innerText = res.phone;
        (document.getElementById("company-mail") as HTMLElement).innerText = res.mail;
      })
  }, []);

  const getInfo = (id: string) => {

  }

  return (
    <>
      <div className="dashboard-base-panel" style={{ height: '100vh' }}>
        <div className="dashboard-model-title">
          <h2>企业中心</h2>
          <hr />
        </div>

        <div className="dashboard-model-body" style={{ display: 'flex', flexDirection: 'row', flex: 1, height: '100%' }}>
          <div style={{ width: '50%', paddingInlineEnd: 'calc(var(--standard-padding-width) / 2)' }}>
            <div className="card" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-title">个人信息</div>
                <div className="company-info-panel">
                  <div>
                    <span>企业名称</span>
                    <p id='company-name'>国家安全局</p>
                  </div>
                  <div>
                    <span>联系电话</span>
                    <p id='company-phone'>110</p>
                  </div>
                  <div>
                    <span>联系邮箱</span>
                    <p id='company-mail'>110@outlook.com</p>
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
                <button className="nav-link active" id="notification-tab" data-bs-toggle="tab" data-bs-target="#notification" type="button" role="tab" aria-controls="profile-msg" aria-selected="true">通知</button>
                <button className="nav-link" id="announcement-tab" data-bs-toggle="tab" data-bs-target="#announcement" type="button" role="tab" aria-controls="account-msg" aria-selected="false">公告</button>
              </div>
            </nav>
            <div className="tab-content student-annex-card-body" id="nav-tabContent" style={{ flex: 1 }}>
              <div className="tab-pane fade show active" id="notification" role="tabpanel" aria-labelledby="notification-tab" style={{ width: '100%', height: '100%' }}>
                <div className="card" style={{ height: '100%', borderTop: '0', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
                  <div className="card-body notification-cards">
                    {notifications_body}
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="announcement" role="tabpanel" aria-labelledby="announcement-tab" style={{ width: '100%', height: '100%' }}>
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

      {/* <Modal shown={infoModalShown} close_function={() => setInfoModalShown(false)} modal_title='通知详细' modal_btns={
        <>
          <button type="button" className="btn btn-secondary" onClick={() => setInfoModalShown(false)}>关闭</button>
        </>
      }>
        <div>
          <h4 style={{ marginBlockEnd: 0 }}>
            {notification_modal_item.title}
          </h4>
        </div>
        <div>
          <span style={{ color: 'gray', fontSize: '10px' }}>
            创建于 {notification_modal_item.created}
          </span>
        </div>

        <div style={{ marginBlockStart: 'var(--standard-padding-width)' }}>
          {notification_modal_item.descript}
        </div>
      </Modal> */}

      <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType} />
    </>
  )
}
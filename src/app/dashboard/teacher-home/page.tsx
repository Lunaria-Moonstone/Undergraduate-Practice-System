'use client';

import { useEffect, useState } from 'react';

import { Announcements, FormItems, } from '@/global/type';
import server from './teacher-home.api';
import Modal from '@/components/modal/modal.component';
import './teacher-home.part.css';
import { Button, message } from 'antd';
import Form from '@/components/form/form.component';
import { formInput } from '@/utils/input';

export default function Page() {

  const [messageApi, contextHolder] = message.useMessage();
  // const [infoModalShown, setInfoModalShown] = useState(false);
  const [notificationAdditionModalShown, setNotificationAdditionModalShown] = useState(false);
  // const [alertShown, setAlertShown] = useState<boolean>(false);
  // const [alertMessage, setAlertMessage] = useState<string>('');
  // const [alertType, setAlertType] = useState<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'>('info');
  // const alert = (message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark') => {
  //   setAlertMessage(message);
  //   setAlertType(type);
  //   setAlertShown(true);
  // }
  // const alertClear = () => {
  //   setAlertMessage("");
  //   setAlertShown(false);
  // }

  const [notifications_body, setNotificationsBody] = useState<React.ReactNode>();
  const [announcements_body, setAnnouncementsBody] = useState<React.ReactNode>();
  const addFormItems: FormItems = [
    { label: '标题', type: 'input' },
    { label: '简述', type: 'input' },
    { label: '内容', type: 'textarea' },
  ];

  const submitNotification = () => {
    // const form = document.getElementById('notification-addition-form') as HTMLFormElement;
    let form_value: Array<string | number | boolean | undefined> = formInput(document.getElementById('form-add') as HTMLFormElement);
    let data = { 
      title: form_value[0] as string,
      simple_descript: form_value[1] as string,
      descript: form_value[2] as string
    };
    if (data.title.length === 0 || data.simple_descript.length === 0 || data.descript.length === 0) {
      messageApi.error('必填信息不能为空');
      return;
    }
    server.addNotification(data)
      .then(res => {
        if (res) {
          setNotificationAdditionModalShown(false);
          messageApi.success('发布成功');
          fetchAnnouncementAndNotification();
        } else {
          throw new Error('发布失败');
        }
      })
      .catch(err => {
        setNotificationAdditionModalShown(false);
        messageApi.error('发布失败');
      })
  };
  const fetchAnnouncementAndNotification = () => {
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
                    {/* <a className='btn btn-primary btn-sm' onClick={() => setInfoModalShown(true)}>详细</a> */}
                    {/* <a className='btn btn-secondary btn-sm'>忽略</a> */}
                  </div>
                </div>
              </div>
            );
          })
        );
      })
      .catch(err => {
        console.log(err);
        // alert("后台错误，抓取信息失败", 'danger');
        messageApi.error('后台错误，抓取信息失败')
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
        // alert("后台错误，抓取信息失败", 'danger');
        messageApi.error('后台错误，抓取信息失败')
      });
  }

  useEffect(() => {
    fetchAnnouncementAndNotification();
    server.fetchTeacherInfo()
      .then(res => {
        (document.getElementById("teacher-name") as HTMLElement).innerText = res.name;
        (document.getElementById("teacher-number") as HTMLElement).innerText = res.number;
        (document.getElementById("teacher-phone") as HTMLElement).innerText = res.phone;
        (document.getElementById("teacher-mail") as HTMLElement).innerText = res.mail;
      })
      .catch(err => {
        messageApi.error('后台错误，抓取信息失败');
      });
    server.fetchPracticeRate()
      .then(res => {
        (document.getElementById("practice-rate") as HTMLElement).innerText = String(res);
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
      {contextHolder}
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
                  <div>
                    <span>名下学生实习率</span>
                    <p id="practice-rate"></p>
                  </div>
                  {/* <div>
                    <span>名下学生专业对口率</span>
                    <p></p>
                  </div> */}
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
            <div style={{ marginBlockEnd: 'var(--standard-padding-width' }}>
              <Button type='primary' onClick={() => setNotificationAdditionModalShown(true)}>发布实习通知</Button>
            </div>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="announcement-tab" data-bs-toggle="tab" data-bs-target="#announcement" type="button" role="tab" aria-controls="account-msg" aria-selected="true">公告</button>
                <button className="nav-link" id="notification-tab" data-bs-toggle="tab" data-bs-target="#notification" type="button" role="tab" aria-controls="account-msg" aria-selected="false">通知</button>
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
              <div className="tab-pane fade show active" id="notification" role="tabpanel" aria-labelledby="notification-tab" style={{ width: '100%', height: '100%' }}>
                <div className="card" style={{ height: '100%', borderTop: '0', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
                  <div className="card-body notification-cards">
                    {notifications_body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal modal_title='发布实习通知' shown={notificationAdditionModalShown} close_function={() => setNotificationAdditionModalShown(false)} modal_btns={
        <Button type='primary' onClick={() => submitNotification()}>提交  </Button>
      }>
        <Form form_id="form-add" form_items={addFormItems} />
      </Modal>
    </>
  );
}
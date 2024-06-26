'use client';

import { Announcements, FormItems } from '@/global/type';
import server from './admin-home.api';
import './admin-home.part.css';
import { useEffect, useState } from 'react';
import Modal from '@/components/modal/modal.component';
import Form from '@/components/form/form.component';
import { formInput } from '@/utils/input';
import Alert from '@/components/alert/alert.component';
import { Button, message } from 'antd';

export default function Page() {

  const [messageApi, contextHolder] = message.useMessage();
  const [addModalShown, setAddModalShown] = useState(false);
  const [delModalShown, setDelModalShown] = useState(false);
  const [infoModalShown, setInfoModalShown] = useState(false);
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

  const [add_form_error_msg, setAddFormErrorMsg] = useState('');
  const [announcements_body, setAnnouncementsBody] = useState<React.ReactNode>();
  const [del_targets, setDelTargets] = useState<string | string[]>();

  const addFormItems: FormItems = [
    { label: '标题', type: 'input' },
    { label: '内容', type: 'textarea' },
  ];

  useEffect(() => {
    server.fetchAnnouncements()
      .then(res => {
        setAnnouncementsBody(res.map((x, index) => {
          const delAnnouncement = (id: string) => {
            setDelTargets(id);
            setDelModalShown(true);
          }
          const showAnnouncement = (id: string) => {

            server.fetchAnnouncement(id)
              .then(res => {
                setInfoModalShown(true);
                setTimeout(() => {
                  const title = document.getElementById("info-modal-title") as HTMLHeadingElement;
                  const created = document.getElementById("info-modal-created") as HTMLSpanElement;
                  const descript = document.getElementById("info-modal-descript") as HTMLDivElement;
                  title.innerText = res.title;
                  created.innerText = res.created ?? '未知';
                  descript.innerText = res.descript;
                }, 1500);
              })
              .catch(err => {
                console.log(err);
                // alert("抓取失败, 后台错误", 'danger');
                messageApi.error("抓取失败, 后台错误");
              })
          }
          return (
            <div className='card' key={index} style={{ marginBlockStart: 'var(--standard-padding-width)' }}>
              <div className='card-body'>
                <h5 className="card-title">
                  {x.title}
                </h5>
                <p className='card-text'>
                  {x.descript}
                </p>
                <div className='card-inline-actions'>
                  <button className='btn btn-secondary btn-sm' onClick={() => showAnnouncement(x.id)}>详细</button>
                  <button className='btn btn-danger btn-sm' onClick={() => delAnnouncement(x.id)}>删除</button>
                </div>
              </div>
            </div>
          );
        }));
      });
    server.fetchIsOkRate()
      .then(res => {
        document.getElementById('is-ok-rate')!.innerText = String(res);
      })
  }, []);

  const saveAdd = () => {
    let form_value: Array<string | number | boolean | undefined> = formInput(document.getElementById('form-add') as HTMLElement);
    let data = { title: form_value[0] as string, descript: form_value[1] as string };
    if (data.title.length === 0 || data.descript.length === 0) {
      setAddFormErrorMsg('必填信息不能为空');
      return;
    }
    server.addAnnouncement(data)
      .then(res => {
        if (res) {
          setAddModalShown(false);
          location.reload();
        } else {
          setAddModalShown(false);
          // alert("添加失败, 后台错误", 'danger');
          messageApi.error("添加失败, 后台错误");
        }
      })
      .catch(err => {
        setAddModalShown(false);
        // alert("添加失败, 后台错误", 'danger');
        messageApi.error("添加失败, 后台错误");
      })
  }
  const delConfirm = async () => {
    if (!del_targets || typeof del_targets === 'object' && del_targets.length === 0) {
      setDelModalShown(false);
      // alert('删除id列表为空', "danger");
      messageApi.error('删除id列表为空');
      return;
    }
    setDelModalShown(false);
    // ... delete process
    if (typeof del_targets === 'object') {
      for (let del_target of del_targets) {
        await server.delAnnouncement(del_target)
          .catch(err => {
            // alert(del_target + " 删除失败", "danger");
            messageApi.error(del_target + " 删除失败");
          });
      }
      location.reload();
    } else {
      server.delAnnouncement(del_targets)
        .then(res => {
          if (res) location.reload();
          else {
            setDelModalShown(false);
            // alert('删除失败，后台出错', "danger");
            messageApi.error('删除失败，后台出错');
          }
        })
        .catch(err => {
          setDelModalShown(false);
          // alert('删除失败，后台出错', "danger");
          messageApi.error('删除失败，后台出错');
        })
        .finally(() => {
          setDelTargets(undefined);
        })
    }
  }

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
                  <div>
                    <span>专业对口率</span>
                    <p id="is-ok-rate"></p>
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
      <Modal shown={addModalShown} close_function={() => setAddModalShown(false)} modal_title='添加公告' modal_btns={
        <>
          {/* <button type="button" className="btn btn-primary" onClick={() => saveAdd()}>确认</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAddModalShown(false)}>关闭</button> */}
          <Button type='primary' onClick={() => saveAdd()}>确认</Button>
        </>
      }>
        <Form form_id="form-add" form_items={addFormItems} />
      </Modal>

      <Modal shown={infoModalShown} close_function={() => setInfoModalShown(false)} modal_title='公告详细' modal_btns={
        <>
          {/* <button className='btn btn-secondary' onClick={() => setInfoModalShown(false)}>关闭</button> */}
        </>
      }>
        <div>
          <h4 style={{ marginBlockEnd: 0 }} id="info-modal-title">
          </h4>
        </div>
        <div>
          <span style={{ color: 'gray', fontSize: '10px' }}>
            创建于 <span id="info-modal-created"></span>
          </span>
        </div>

        <div style={{ marginBlockStart: 'var(--standard-padding-width)' }} id="info-modal-descript">
        </div>
      </Modal>

      {/* 删除确认 */}
      <Modal shown={delModalShown} close_function={() => setDelModalShown(false)} modal_title="是否确认删除" modal_btns={
        <>
          {/* <button className="btn btn-danger" onClick={() => delConfirm()}>确认</button>
          <button className="btn btn-secondary" onClick={() => setDelModalShown(false)}>取消</button> */}
          <Button type='primary' danger onClick={() => delConfirm()}>确认</Button>
        </>
      }>
        删除内容后无法恢复，是否继续
      </Modal>

      {/* <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType} /> */}
    </>
  )
}
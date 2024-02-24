'use client';

import '@/global/global-variable.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import server from './student-info.api';
import Modal from '@/components/modal/modal.component';
import Alert from '@/components/alert/alert.component';
import { formInput } from '@/utils/input';

export default function Page() {
  const router = useRouter();

  const [successMsgModalShown, setSuccessMsgModalShown] = useState<boolean>(false);
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

  useEffect(() => {
    server.fetchName()
      .then(res => {
        if (res['ok']) {
          (document.getElementById('username-shown') as HTMLInputElement).value = res['results']['name'];
        } else {
          alert('后台抓取用户名失败', "danger");
        }
      })
      .catch(err => {
        alert('后台抓取用户名失败', "danger");
      });
    server.fetchInfo()
      .then(res => {
        if (res['ok']) {
          (document.getElementById('user-id-shown') as HTMLInputElement).value = res['results']['id'];
          (document.getElementById('user-grade-shown') as HTMLInputElement).value = res['results']['grade'];
        } else {
          alert('后台抓取用户名失败', "danger");
        }
      })
      .catch(err => {
        alert('后台抓取用户名失败', "danger");
      });
  }, []);

  const submitPasswordChange = async () => {
    let form_value = formInput(document.getElementById('form-account') as HTMLFormElement);
    if (form_value.filter(x => (x as string).length === 0).length > 0) {
      alert('所有必填项不得为空', "danger");
      return;
    }
    if (form_value[2] !== form_value[3]) {
      alert('两次输入的新密码不一致，请检查', "danger");
      return ;
    }
    let password = form_value[1];
    let new_password = form_value[2];
    
    let result = await server.submitAccountChange(password as string, new_password as string);
    if (result['ok']) {
      setSuccessMsgModalShown(true);
    } else {
      alert('更改失败，原密码错误', "danger");
    }
  }
  const submitInfoChange = () => {
    let form_value = formInput(document.getElementById('form-profile') as HTMLFormElement);
    let labels = [undefined, 'name', 'number', undefined, 'phone', 'mail', 'is_practice' ];
    let data: { [key: string]: string} = {};

    for (let idx = 0; idx < labels.length; idx += 1) {
      if (labels[idx] !== undefined && form_value[idx] && (form_value[idx] as string).length !== 0) {
        data[labels[idx] as string] = form_value[idx] as string;
      }
    }
    server.submitInfoChange(data)
      .then(res => {
        console.log(res);
        if (res['ok']) {
          alert('修改成功','success');
        } else {
          alert('后台修改失败', "danger");
        }
      })
      .catch(err => {
        console.log(err);
        alert('后台修改失败', "danger");
      });
  }
  const relog = () => {
    setSuccessMsgModalShown(false);
    server.resign();
    router.replace('/authorized/signin');
  }

  return (
    <>
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>个人信息设置</h2>
        </div>
        <hr />

        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="profile-msg-tab" data-bs-toggle="tab" data-bs-target="#profile-msg" type="button" role="tab" aria-controls="profile-msg" aria-selected="true">名片信息</button>
            <button className="nav-link" id="account-msg-tab" data-bs-toggle="tab" data-bs-target="#account-msg" type="button" role="tab" aria-controls="account-msg" aria-selected="false">账号信息</button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="profile-msg" role="tabpanel" aria-labelledby="profile-msg-tab" >
            <form id="form-profile" style={{ marginBlockStart: 'var(--standard-padding-width)' }}>
              <div className="mb-3">
                <label className="form-label">编号</label>
                <input className="form-control" placeholder="编号" id="user-id-shown" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">姓名</label>
                <input className="form-control" placeholder="姓名" />
              </div>
              <div className="mb-3">
                <label className="form-label">学号</label>
                <input className="form-control" placeholder="学号" />
              </div>
              <div className="mb-3">
                <label className="form-label">年级</label>
                <input className="form-control" placeholder="年级" id="user-grade-shown" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">联系电话</label>
                <input className="form-control" placeholder="联系电话" />
              </div>
              <div className="mb-3">
                <label className="form-label">邮箱</label>
                <input className="form-control" placeholder="邮箱" />
              </div>
              <div className="mb-3">
                <label className="form-label">是否实习中</label>
                <select className="form-select">
                  <option value="1">是</option>
                  <option value="0">否</option>
                </select>
              </div>
              {/* <div className="mb-3">
                <label className="form-label">姓名</label>
                <input className="form-control" placeholder="姓名" />
              </div> */}
            </form>
            <div style={{ width: '100%' }} className="d-grid gap-2">
              <button className="btn btn-primary btn-block" onClick={submitInfoChange}>确认修改</button>
            </div>
          </div>

          <div className="tab-pane fade" id="account-msg" role="tabpanel" aria-labelledby="account-msg-tab" >
            <form id="form-account" style={{ marginBlockStart: 'var(--standard-padding-width)' }}>
              <div className="mb-3">
                <label className="form-label">用户名</label>
                <input className="form-control" placeholder="用户名" id="username-shown" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">旧密码</label>
                <input className="form-control" placeholder="密码" type="password" />
              </div>
              <div className="mb-3">
                <label className="form-label">新密码</label>
                <input className="form-control" placeholder="密码" type="password" />
              </div>
              <div className="mb-3">
                <label className="form-label">重复新密码</label>
                <input className="form-control" placeholder="密码" type="password" />
              </div>
            </form>
            <div style={{ width: '100%' }} className="d-grid gap-2">
              <button className="btn btn-primary btn-block" onClick={submitPasswordChange}>确认修改</button>
            </div>
          </div>
        </div>
      </div>

      <Modal shown={successMsgModalShown} close_function={() => setSuccessMsgModalShown(false)} modal_btns={
        <>
          <button className="btn btn-primary" onClick={() => relog()}>确认</button>
        </>
      }>
        您的密码已完成更改，请重新登录
      </Modal>
      <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType} />
    </>
  )
}
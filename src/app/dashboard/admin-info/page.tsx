"use client"

import { useEffect, useState } from "react";

import { formInput } from "@/utils/input";
import server from './admin-info.api';
import Alert from "@/components/alert/alert.component";
import Modal from "@/components/modal/modal.component";
import { useRouter } from "next/navigation";

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
      })
  }, [])

  const submitChange = async () => {
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
    
    let result = await server.submitChange(password as string, new_password as string);
    if (result['ok']) {
      setSuccessMsgModalShown(true);
    } else {
      alert('更改失败，原密码错误', "danger");
    }
  }

  const relog = () => {
    setSuccessMsgModalShown(false);
    server.resign();
    router.replace('/authorized/signin');
  }

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>个人信息设置</h2>
        </div>
        <hr />
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
          <button className="btn btn-primary btn-block" onClick={() => submitChange()}>确认修改</button>
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
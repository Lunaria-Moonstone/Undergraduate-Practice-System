'use client'

import { useRouter } from "next/navigation";

import Form from "@/components/form/form.component";
import { FormItems } from "@/global/type";
import { formInput } from "@/utils/input";
import server from './signin.api';

import './signin.part.css';
import { DashboardLayoutContext } from "@/utils/context";
import { useState } from "react";
import Alert from "@/components/alert/alert.component";

export default function Page() {
  const router = useRouter();

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

  const form_items: FormItems = [
    { label: '用户名（学号或工号）', type: 'input' },
    { label: '密码', type: 'input', isPassword: true },
  ];
  const submitForm = () => {
    let form_value = formInput(document.getElementById('form') as HTMLElement);

    if (form_value[0] === '') { 
      alert('用户名不能为空', "danger"); 
      return;
    }
    if (form_value[1] === '') {
      alert('密码不能为空', 'danger');
      return;
    }
    const role = server.authorize(form_value[0] as string, form_value[1] as string);
    if (role === -1) {
      alert("用户名不存在或密码错误", "danger");
      return;
    }

    router.push(`/dashboard?role=${role}`);
  }
  return (
    <>
      <div className="inner-form">
        <Form form_items={form_items} form_id="form" />
        <div style={{ width: '100%' }} className="d-grid gap-2"><button className="btn btn-primary btn-block" onClick={() => submitForm()}>登录</button></div>
        <hr style={{ marginBlockEnd: 0, marginBlockStart: 'var(--standard-padding-width)' }} />
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>新企业入驻？<a href="/authorized/company-signup" className="link-primary text-decoration-none">点击此处</a></div>
      </div>

      <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType}/>
    </>
  )
}
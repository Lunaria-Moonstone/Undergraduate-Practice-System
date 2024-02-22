'use client'

import { useRouter } from "next/navigation";

import Form from "@/components/form/form.component";
import { FormItems, GlobalStateVariableType } from "@/global/type";
import { formInput } from "@/utils/input";
import server from './signin.api';

import './signin.part.css';


import { useContext, useEffect, useState } from "react";
import Alert from "@/components/alert/alert.component";
import { GlobalStateContext } from "@/utils/context";
import { useCookies } from "react-cookie";

export default function Page() {
  const router = useRouter();
  const [setCookie] = useCookies(["user"]);

  const roleState = useContext(GlobalStateContext);
  const roleSetter = roleState['role'][1] as (idx: GlobalStateVariableType) => void;

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
  const submitForm = async () => {
    let form_value = formInput(document.getElementById('form') as HTMLElement);

    if (form_value[0] === '') { 
      alert('用户名不能为空', "danger"); 
      return;
    }
    if (form_value[1] === '') {
      alert('密码不能为空', 'danger');
      return;
    }
    const role = await server.authorize(form_value[0] as string, form_value[1] as string);
    router.push(`/dashboard?role=${role}`);
    switch (role) {
      case -1:
        alert("用户名不存在或密码错误", "danger");
        return;
      case 0: 
        roleSetter(0);
        router.push(`/dashboard/admin-home`);
        break;
      case 1: 
        roleSetter(1);
        router.push(`/dashboard/student-home`);
        break;
      case 2:
        roleSetter(2);
        router.push(`/dashboard/teacher-home`);
        break;
      case 3:
        roleSetter(3);
        router.push(`/dashboard/company-home`);
        break;
    }
    
    // console.log(role);
  }
  const enterDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      submitForm();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", enterDown, false);
    return () => document.removeEventListener("keydown", enterDown, false);
  });

  return (
    <>
      <div className="inner-form">
        <Form form_items={form_items} form_id="form" />
        <div style={{ width: '100%' }} className="d-grid gap-2"><button className="btn btn-primary btn-block" onClick={() => submitForm()}>登录</button></div>
        {/* <hr style={{ marginBlockEnd: 0, marginBlockStart: 'var(--standard-padding-width)' }} />
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>新企业入驻？<a href="/authorized/company-signup" className="link-primary text-decoration-none">点击此处</a></div> */}
      </div>

      <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType}/>
    </>
  )
}
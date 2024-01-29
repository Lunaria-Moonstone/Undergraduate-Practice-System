'use client'

import { useRouter } from "next/navigation";

import Form from "@/components/form/form.component";
import { FormItems } from "@/global/type";
import { formInput } from "@/utils/input";
import server from './signin.api';

import './signin.part.css';
import { useContext } from "react";
import { myContext } from "@/app/dashboard/layout";

export default function Page() {
  const router = useRouter();
  const context = useContext(myContext);
  const form_items: FormItems = [
    { label: '用户名（学号或工号）', type: 'input' },
    { label: '密码', type: 'input', isPassword: true },
  ];
  const submitForm = () => {
    let form_value = formInput(document.getElementById('form') as HTMLElement);
    
    switch(server.authorize(form_value[0] as string, form_value[1] as string)) {
      case 0: 
        router.push('/dashboard/');
        context.changeRole(0);
        break;
      case 1: 
        router.push('/dashboard/student-home');
        context.changeRole(1);
        break;
      case 2: 
        router.push('/dashboard/teacher-home');
        break;
      case 3:
        router.push('/dashboard/company-home');
        break;
    }
    // router.push('/dashboard');
  }
  return (
    <>
      <div className="inner-form">
        <Form form_items={form_items} form_id="form" />
        <div style={{width: '100%'}} className="d-grid gap-2"><button className="btn btn-primary btn-block" onClick={submitForm}>登录</button></div>
        <hr style={{marginBlockEnd: 0, marginBlockStart: 'var(--standard-padding-width)'}} />
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>新企业入驻？<a href="/authorized/company-signup" className="link-primary text-decoration-none">点击此处</a></div>
      </div>
    </>
  )
}
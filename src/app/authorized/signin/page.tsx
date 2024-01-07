'use client'

import { useRouter } from "next/navigation";

import Form from "@/components/form/form.component";
import { FormItems } from "@/global/type";
import { formInput } from "@/utils/input";

import './signin.part.css';

export default function Page() {
  const router = useRouter();
  const form_items: FormItems = [
    { label: '用户名（学号或工号）', type: 'input' },
    { label: '密码', type: 'input', isPassword: true },
  ];
  const submitForm = () => {
    let form_value = formInput(document.getElementById('form') as HTMLElement);
    console.log(form_value);

    router.push('/dashboard');
  }
  return (
    <>
      <div className="inner-form">
        <Form form_items={form_items} form_id="form" />
        <div style={{width: '100%'}} className="d-grid gap-2"><button className="btn btn-primary btn-block" onClick={submitForm}>登录</button></div>
      </div>
    </>
  )
}
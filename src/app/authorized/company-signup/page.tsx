'use client';

import { useRouter } from "next/navigation";

import { FormItems } from "@/global/type";
import Form from "@/components/form/form.component";
import './company-signup.part.css';


export default function Page() {

  const router = useRouter();
  const form_items: FormItems = [
    { label: '企业名称', type: 'input' },
    { label: '联系电话', type: 'input' },
    { label: '联系邮箱', type: 'input' },
    { label: '营业执照', type: 'file' },
  ];

  return (
    <>
      <div className="inner-form">
        <Form form_items={form_items} />
        <div style={{width: '100%'}} className="d-grid gap-2"><button className="btn btn-primary btn-block" >申请企业账户</button></div>
        <hr style={{marginBlockEnd: 0, marginBlockStart: 'var(--standard-padding-width)'}} />
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>已经存在账户？<a href="/authorized/signin" className="link-primary text-decoration-none">点击此处</a></div>
      </div>
    </>
  );
}
'use client';

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";


import { ArrayBuffer2Base64, formInput } from "@/utils/input";
import { FormItems } from "@/global/type";
import Form from "@/components/form/form.component";
import './company-signup.part.css';
import Alert from "@/components/alert/alert.component";

export default function Page() {

  const router = useRouter();
  const [lisence, setLisence] = useState<null | File>(null);
  const [alertShown, setAlertShown] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'>('info');

  const form_items: FormItems = [
    { label: '企业名称', type: 'input' },
    { label: '联系电话', type: 'input' },
    { label: '联系邮箱', type: 'input' },
    { 
      label: '营业执照', type: 'file', fileTypeRestricted: ['.pdf'], 
      fileTackleFunction: (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        setLisence(file);
      }
    },
  ];
  const alert = (message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark') => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertShown(true);
  }
  const alertClear = () => {
    setAlertMessage("");
    setAlertShown(false);
  }
  const submitForm = async () => {
    if (lisence === null) {
      console.log('请上传营业执照');
      alert("请上传营业执照", "danger");
      return;
    }
    const the_form = document.getElementById("form") as HTMLElement
    let form_value_without_file = formInput(the_form).slice(0, -1);
    let form_file_base64 = ArrayBuffer2Base64(await lisence.arrayBuffer());

    router.push('/authorized/signin');
  }

  return (
    <>
      <div className="inner-form">
        <Form form_items={form_items} form_id="form" />
        <div style={{ width: '100%' }} className="d-grid gap-2"><button className="btn btn-primary btn-block" onClick={submitForm}>申请企业账户</button></div>
        <hr style={{ marginBlockEnd: 0, marginBlockStart: 'var(--standard-padding-width)' }} />
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>已经存在账户？<a href="/authorized/signin" className="link-primary text-decoration-none">点击此处</a></div>
      </div>

      <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType}/>
    </>
  );
}
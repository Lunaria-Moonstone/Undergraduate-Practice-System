'use client';

import Table, { TableLineActions } from '@/components/table/table.component';
import server from './student-annex.api';
import "./student-annex.part.css";
import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/modal/modal.component';
import Alert from '@/components/alert/alert.component';
import { FormItems, TableColumns, TableDataSource } from '@/global/type';
import Form from '@/components/form/form.component';
import { ArrayBuffer2Base64 } from '@/utils/input';
import { Button, Space, message } from 'antd';

export default function Page() {

  const [messageApi, contextHolder] = message.useMessage();
  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({
    addModalShown: false,
    delModalShown: false,
    infoModalShown: false,
  });
  const toggleModal = (modalName: string) => {
    setModalStates(prev => ({ ...prev, [`${modalName}ModalShown`]: !prev[`${modalName}ModalShown`] }));
  }
  const modalProps = (modalName: string, title: string, children: React.ReactNode, buttons?: React.ReactNode) => ({
    id: `modal-${modalName}`,
    shown: modalStates[`${modalName}ModalShown`],
    close_function: () => toggleModal(`${modalName}ModalShown`),
    hide_close_btn: true,
    modal_title: title,
    modal_btns: (
      <>
        {buttons}
        {/* <button className='btn btn-secondary' onClick={() => toggleModal(modalName)}>关闭</button> */}
        <Button onClick={() => toggleModal(modalName)}>关闭</Button>
      </>
    ),
    children,
  });
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
  // const { resume, practice_document } = server.fetchAnnex()
  // const [history_resume, history_practice_document] = server.fetchAnnexHistory();

  // const history_resume_table_head = ['编号', '时间']
  // const history_practice_document_table_head = ['编号', '时间']
  // const line_action: React.ReactNode = (
  //   <>
  //     <a className='link-danger text-decoration-none' onClick={() => setDelModalShown(true)}>删除</a>
  //     <a className='link-secondary text-decoration-none' onClick={() => setInfoModalShown(true)}>预览</a>
  //   </>
  // )
  // const history_resume_table_body: Array<Array<string | number | undefined>> = history_resume.map(x => {
  //   return [x.id, x.created];
  // });
  // const history_practice_document_table_body: Array<Array<string | number | undefined>> = history_practice_document.map(x => {
  //   return [x.id, x.created];
  // });

  const annexShown = (id: string) => {
    const target = annex_list_ref.current.filter(x => x.id === id);
    if (target.length === 0) {
      // alert('目标材料不存在', 'danger');
      messageApi.error('目标材料不存在');
      return;
    }
    setAnnexInfo("data:application/pdf;base64," + Buffer.from(target[0].base64code).toString());
    toggleModal('info');
  }
  const addResume = () => {
    setNowType('r');
    toggleModal('add');
  };
  const addPracticeDocument = () => {
    setNowType('p');
    toggleModal('add');
  };
  const saveAdd = async () => {
    if (now_annex === null) {
      toggleModal('add');
      // alert('材料不能为空', 'danger');
      messageApi.error('材料不能为空');
      return;
    }
    server.uploadAnnex(now_type === 'r' ? 'resume' : 'practice-document', ArrayBuffer2Base64(await now_annex.arrayBuffer()))
      .then(res => {
        if (res['ok']) {
          toggleModal('add');
          // location.reload();
          fetchAnnex();
        } else {
          // alert('上传失败，后台错误', 'danger');
          messageApi.error('上传失败，后台错误');
          console.error('上传失败', res['error']);
        }
      })
      .catch(err => {
        // alert('上传失败，后台错误', 'danger');
        messageApi.error('上传失败，后台错误');
        console.error(err);
      })
  };
  const infoShown = () => {
    if (annex_info === 'x') {
      return <p>当前材料为空</p>
    } else {
      return <embed src={annex_info} type="application/pdf" style={{ height: '100%' }} />
    }
  };
  const delMark = (id: string) => {
    setDelTarget(id);
    toggleModal('del');
  }
  const delAnnex = () => {
    if (!del_target) {
      toggleModal('del');
      // alert("删除编号为空", 'danger');
      messageApi.error("删除编号为空");
      return;
    }
    const id = del_target;
    server.deleteAnnex(id)
      .then(res => {
        if (res['ok']) {
          toggleModal('del');
          location.reload();
        } else {
          toggleModal('del');
          console.log(res['error']);
          // alert("后台错误，删除失败", 'danger');
          messageApi.error("后台错误，删除失败");
        }
      })
      .catch(err => {
        toggleModal('del');
        console.error(err);
        // alert("后台错误，删除失败", 'danger');
        messageApi.error("后台错误，删除失败");
      })
  }

  const [now_type, setNowType] = useState<string>('r');
  const [now_annex, setNowAnnex] = useState<null | File>(null);
  const [del_target, setDelTarget] = useState<string>();
  const [resume, setResume] = useState<string>('x');
  const [practice_document, setPracticeDocument] = useState<string>('x');
  const [annex_info, setAnnexInfo] = useState<string>('x');
  const [practice_document_list, setPracticeDocumentList] = useState<{ id: string, base64code: string, created: string }[]>([]);
  const [resume_list, setResumeList] = useState<{ id: string, base64code: string, created: string }[]>([]);
  const [annex_list, setAnnexList] = useState<{ id: string, base64code: string, created: string }[]>([]);
  const annex_list_ref = useRef(annex_list);
  // const [history_resume_table_head, setHistoryResumeTableHead] = useState<string[]>(['编号', '时间']);
  // const [history_practice_document_table_head, setHistoryPracticeDocumentTableHead] = useState<string[]>(['编号', '时间']);
  // const [history_resume_table_line_actions, setHistoryResumeTableLineActions] = useState<TableLineActions>([
  //   {
  //     type: 'danger', text: '删除', action_function: delMark
  //   },
  //   {
  //     type: 'primary', text: '预览',
  //     action_function: annexShown
  //   },
  // ]);
  const history_resume_table_columns: TableColumns = [
    // '编号', '时间'
    { title: '编号', dataIndex: 'id', key: 'id' },
    { title: '时间', dataIndex: 'created', key: 'created' },
    { title: '操作', dataIndex: 'action', key: 'action', render: (_, record) => {
      return <Space>
        <Button type="link" danger onClick={
          () => delMark(record.id)
        }>删除</Button>
        <Button type="link" onClick={
          () => annexShown(record.id)
        }>预览</Button>
      </Space>
    } },
  ];
  const [history_resume_table_data_source, setHistoryResumeTableDataSource] = useState<TableDataSource>([]);
  const history_practice_table_columns: TableColumns = [
    // '编号', '时间'
    { title: '编号', dataIndex: 'id', key: 'id' },
    { title: '时间', dataIndex: 'created', key: 'created' },
    { title: '操作', dataIndex: 'action', key: 'action', render: (_, record) => {
      return <Space>
        <Button type="link" danger onClick={
          () => delMark(record.id)
        }>删除</Button>
        <Button type="link" onClick={
          () => annexShown(record.id)
        }>预览</Button>
      </Space>
    }}
  ];
  const [history_practice_table_data_source, setHistoryPracticeTableDataSource] = useState<TableDataSource>([]);
  // const [history_practice_docuement_table_line_actions, setHistoryPracticeDocumentTableLineActions] = useState<TableLineActions>([
  //   {
  //     type: 'danger', text: '删除', action_function: delMark
  //   },
  //   {
  //     type: 'primary', text: '预览',
  //     action_function: annexShown
  //   },
  // ]);
  // const [history_resume_table_body, setHistoryResumeTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  // const [history_practice_document_table_body, setHistoryPracticeDocumentTableBody] = useState<Array<Array<string | number | undefined>>>([]);

  const addItems: FormItems = [
    {
      label: '文件',
      type: 'file',
      fileTypeRestricted: ['.pdf'],
      fileTackleFunction(event) {
        const files = event.currentTarget.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        setNowAnnex(file);
      },
    }
  ]

  useEffect(() => {
    annex_list_ref.current = annex_list;
    // console.log('annex_list_ref:', annex_list_ref.current);
  }, [annex_list]);

  useEffect(() => {
    fetchAnnex();
  }, []);
  
  const fetchAnnex = () => {
    server.fetchAnnex()
    .then(res => {
      console.log(res);
      if (res['ok']) {
        let proof_list: { id: string, base64code: string, created: string }[] = res['results']['proof']['results'];
        let _resume_list: { id: string, base64code: string, created: string }[] = res['results']['vitae']['results'];
        let proof_shown: string
        if (proof_list.length !== 0) {
          // proof_shown = "data:image/jpeg;base64," + Buffer.from(proof_list[proof_list.length - 1].base64code).toString();
          proof_shown = "data:application/pdf;base64," + Buffer.from(proof_list[proof_list.length - 1].base64code).toString();
          setPracticeDocument(proof_shown);
        } else setPracticeDocument('x');
        let resume_shown: string;
        if (_resume_list.length !== 0) {
          // resume_shown = "data:image/png;base64," + Buffer.from(_resume_list[_resume_list.length - 1].base64code).toString();
          resume_shown = "data:application/pdf;base64," + Buffer.from(_resume_list[_resume_list.length - 1].base64code).toString();
          setResume(resume_shown);
        } else setResume('x');
        // setHistoryPracticeDocumentTableBody(
        //   proof_list.map(x => [x.id, x.created])
        // );
        // setHistoryResumeTableBody(
        //   _resume_list.map(x => [x.id, x.created])
        // );
        setHistoryPracticeTableDataSource(proof_list.map(x => { return { id: x.id, created: x.created } }));
        setHistoryResumeTableDataSource(_resume_list.map(x => { return { id: x.id, created: x.created } }));
        setResumeList(_resume_list);
        setPracticeDocumentList(proof_list);
        const _annex_list = new Array<{ id: string, base64code: string, created: string }>().concat(_resume_list, proof_list);
        console.log('_annex_list: ', _annex_list);
        setAnnexList(_annex_list);
      } else {
        // alert('后台拉取信息失败', 'danger');
        messageApi.error('后台拉取信息失败');
      }
    })
    .catch(err => {
      console.error(err);
      // alert('后台拉取信息失败', 'danger')
      messageApi.error('后台拉取信息失败');
    });
  };
  const fetchPracticeDocumentModel = () => {
    window.open('/dashboard/practice-document-model');
  }

  return (
    <>
    {contextHolder}
      <div className="dashboard-base-panel" style={{ height: '100vh', display: 'flex' }}>
        {/* 抬头 */}
        <div className="dashboard-model-title" >
          <h2>个人材料上传</h2>
          <hr />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="resume-tab" data-bs-toggle="tab" data-bs-target="#resume" type="button" role="tab" aria-controls="profile-msg" aria-selected="true">简历</button>
              <button className="nav-link" id="practice-document-tab" data-bs-toggle="tab" data-bs-target="#practice-document" type="button" role="tab" aria-controls="account-msg" aria-selected="false">实习材料</button>
            </div>
          </nav>
          <div className="tab-content student-annex-card-body" id="nav-tabContent" style={{ flex: 1 }}>
            <div className="tab-pane fade show active" id="resume" role="tabpanel" aria-labelledby="resume-tab" style={{ height: '100%' }} >
              <div className="card" style={{ width: '100%', height: '100%' }}>
                {/* { resume !== 'x' ? <img src={resume} className="card-img-top"  /> : <p className="img-undefinded">暂无简历</p> } */}
                {resume !== 'x' ? <embed src={resume} type="application/pdf" className='card-img-top' style={{ height: '100%' }} /> : <p className="img-undefinded">暂无简历</p>}
                <div className="card-body">
                  <p className="card-text">本页面材料具有法律效力</p>
                  <div className="student-annex-card-body-buttons">
                    <a className="btn btn-primary btn-sm" onClick={() => addResume()}>上传新简历</a>
                    <a className={"btn btn-danger btn-sm " + (resume === 'x' ? " disabled " : "")} onClick={() => delMark(resume_list[resume_list.length - 1].id)} aria-disabled={resume === 'x'}>删除</a>
                  </div>
                </div>
              </div>
              <div>
                {/* <Table table_id='table' table_head={history_resume_table_head} table_body={history_resume_table_body} line_action={history_resume_table_line_actions} /> */}
                <Table dataSource={history_resume_table_data_source} columns={history_resume_table_columns} />
              </div>
            </div>
            <div className="tab-pane fade" id="practice-document" role="tabpanel" aria-labelledby="practice-document-tab" style={{ height: '100%' }}>
              <div className="card" style={{ width: '100%', height: '100%'  }}>
                {/* { practice_document !== 'x' ? <img src={practice_document} className="card-img-top"  /> : <p className="img-undefinded">暂无实习材料</p> } */}
                {practice_document !== 'x' ? <embed src={practice_document} type="application/pdf" className='card-img-top' style={{ height: '100%' }} /> : <p className="img-undefinded">暂无实习材料</p>}
                <div className="card-body">
                  <p className="card-text">本页面材料具有法律效力</p>
                  <div className="student-annex-card-body-buttons">
                    <a className="btn btn-primary btn-sm" onClick={() => addPracticeDocument()} >上传新材料</a>
                    <a className={"btn btn-danger btn-sm " + (practice_document === 'x' ? " disabled " : "")} onClick={() => delMark(practice_document_list[practice_document_list.length - 1].id)} aria-disabled={practice_document === 'x'}>删除</a>
                    <a className='btn btn-primary btn-sm' onClick={fetchPracticeDocumentModel}>下载模板</a>
                  </div>
                </div>
              </div>
              <div>
                {/* <Table table_id='table' table_head={history_practice_document_table_head} table_body={history_practice_document_table_body} line_action={history_practice_docuement_table_line_actions} /> */}
                <Table dataSource={history_practice_table_data_source} columns={history_practice_table_columns} />
              </div>
            </div>
          </div>
        </div>

      </div>

      <Modal {...modalProps('add', '上传材料', (
        <Form form_items={addItems} form_id="upload-form" />
      ), (
        // <button className='btn btn-primary' onClick={() => saveAdd()}>确认</button>
        <Button type='primary' onClick={() => saveAdd()}>确认</Button>
      ))} />

      <Modal {...modalProps('info', '材料详细', (
        <div className='card' style={{ height: '500px' }}>
          {/* <img className='card-img-top' src={resume} /> */}
          {infoShown()}
        </div>
      ))} />

      <Modal {...modalProps('del', '删除确认', (
        <p>删除内容后无法恢复，是否继续</p>
      ), (
        // <button className='btn btn-danger' onClick={() => delAnnex()}>确认</button>
        <Button type='primary' danger onClick={() => delAnnex()}>确定</Button>
      ))} />

      {/* <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType} /> */}
    </>
  )
}
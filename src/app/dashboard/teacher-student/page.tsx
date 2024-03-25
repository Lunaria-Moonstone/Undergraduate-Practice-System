'use client';

import { useEffect, useRef, useState } from 'react';

import Modal from '@/components/modal/modal.component';
import server from './teacher-student.api';
import Table, { TableLineActions } from "@/components/table/table.component";
import { Student, Students, TableColumns, TableDataSource } from '@/global/type';
import './teacher-student.part.css';
import Alert from '@/components/alert/alert.component';
import { Button, Space } from 'antd';

export default function Page() {

  // const [hasProof, setHasProof] = useState(true);
  // const [infoModalShown, setInfoModalShown] = useState(false);
  // const [practiceRateModalShown, setPracticeRateModalShown] = useState(false);
  // const [practiceAnnexModalShown, setPracticeAnnexModalShown] = useState(false);

  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({
    infoModalShown: false,
    practiceRateModalShown: false,
    practiceAnnexModalShown: false,
  });
  const toggleModal = (modalName: string) => {
    setModalStates(prev => ({ ...prev, [`${modalName}ModalShown`]: !prev[`${modalName}ModalShown`] }));
  }
  const modalProps = (modalName: string, title: string, children: React.ReactNode, buttons?: React.ReactNode) => ({
    id: `modal-${modalName}`,
    shown: modalStates[`${modalName}ModalShown`],
    close_function: () => toggleModal(`${modalName}ModalShown`),
    modal_title: title,
    modal_btns: (
      <>
        {buttons}
        <button className='btn btn-secondary' onClick={() => toggleModal(modalName)}>关闭</button>
      </>
    ),
    children,
  });

  const [alertState, setAlertState] = useState<{ alertShown: boolean, alertMessage: string, alertType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' }>({
    alertShown: false,
    alertMessage: '',
    alertType: 'info'
  });
  const alertProps = () => ({
    shown: alertState['alertShown'],
    type: alertState['alertType'],
    message: alertState['alertMessage'],
    close_function: () => setAlertState({ alertShown: false, alertMessage: '', alertType: 'info' })
  });
  const alert = (message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark') => {
    setAlertState({ alertShown: true, alertMessage: message, alertType: type });
  };

  const [has_proof, setHasProof] = useState<boolean>(false);
  const [proof, setProof] = useState<string>('');
  const [rate_target, setRateTarget] = useState<string>();
  const [student_list, setStudentList] = useState<Students>([]);
  const student_list_ref = useRef(student_list);
  // const [table_head, setTableHead] = useState<string[]>([
  //   '编号', '学生姓名', '学号', '年级', '联系电话',
  //   '联系邮箱', '个人简历',
  //   '实习凭证', '实习分数',
  // ]);
  // const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  // const [table_line_actions, setTableLineActions] = useState<TableLineActions>([
  //   {
  //     type: 'primary',
  //     text: '详细',
  //     action_function: async (id: string) => {
  //       const tmp_list = student_list_ref.current.filter(x => x.id === id);
  //       if (tmp_list.length === 0) {
  //         alert('编号为空', 'danger');
  //         return;
  //       }
  //       const target = tmp_list[0];

  //       (document.getElementById("student-name") as HTMLElement).innerText = target.name;
  //       (document.getElementById("student-number") as HTMLElement).innerText = target.number;
  //       (document.getElementById("student-grade") as HTMLElement).innerText = target.grade;
  //       (document.getElementById("student-phone") as HTMLElement).innerText = target.phone;
  //       (document.getElementById("student-mail") as HTMLElement).innerText = target.mail;

  //       let proof_doc_msg = JSON.parse(Buffer.from(target.proof as Uint8Array).toString()) as Array<string>
  //       if (proof_doc_msg.length !== 0) {
  //         setHasProof(true)
  //         let proof_doc_id = proof_doc_msg[proof_doc_msg.length - 1];
  //         await server.fetchProof(proof_doc_id)
  //           .then(res => {
  //             if (res) {
  //               setProof(Buffer.from(res[0]['base64code']).toString());
  //             }
  //           })
  //       } else {
  //         setHasProof(false);
  //       }

  //       toggleModal('info');
  //     }
  //   },
  //   {
  //     type: 'primary',
  //     text: '评分',
  //     action_function: (id: string) => {
  //       const tmp_list = student_list_ref.current.filter(x => x.id === id);
  //       if (tmp_list.length === 0) {
  //         alert('编号为空', 'danger');
  //         return;
  //       }
  //       const target = tmp_list[0];
  //       if ((JSON.parse(Buffer.from(target.proof as Uint8Array).toString()) as Array<string>).length === 0) {
  //         alert('该学生尚未上传实习凭证', 'danger');
  //         return;
  //       }
  //       setRateTarget(id);

  //       toggleModal('practiceRate');
  //     }
  //   },
  // ])
  const table_columns: TableColumns = [
    //   '编号', '学生姓名', '学号', '年级', '联系电话',
    //   '联系邮箱', '个人简历',
    //   '实习凭证', '实习分数',
    { title: '编号', dataIndex: 'id', key: 'id', hidden: true },
    { title: '学生姓名', dataIndex: 'name', key: 'name' },
    { title: '学号', dataIndex: 'number', key: 'number' },
    { title: '年级', dataIndex: 'grade', key: 'grade' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone' },
    { title: '联系邮箱', dataIndex: 'email', key: 'email' },
    { title: '个人简历', dataIndex: 'resume', key: 'resume' },
    { title: '实习凭证', dataIndex: 'proof', key: 'proof' },
    { title: '实习分数', dataIndex: 'score', key: 'score' },
    {
      title: '操作', dataIndex: 'actions', key: 'actions', render: (_, record) => {
        return (
          <Space>
            <Button type="primary" onClick={() => {
              const tmp_list = student_list_ref.current.filter(x => x.id === record.id);
              if (tmp_list.length === 0) {
                alert('编号为空', 'danger');
                return;
              }
              const target = tmp_list[0];
              if ((JSON.parse(Buffer.from(target.proof as Uint8Array).toString()) as Array<string>).length === 0) {
                alert('该学生未上传实习凭证', 'danger');
                return;
              }
              setRateTarget(record.id);
              toggleModal('practiceRate');
            }}>评分</Button>
            <Button type="primary" onClick={async () => {
              const tmp_list = student_list_ref.current.filter(x => x.id === record.id);
              if (tmp_list.length === 0) {
                alert('编号为空', 'danger');
                return;
              }
              const target = tmp_list[0];
              (document.getElementById("student-name") as HTMLElement).innerText = target.name;
              (document.getElementById("student-number") as HTMLElement).innerText = target.number;
              (document.getElementById("student-grade") as HTMLElement).innerText = target.grade;
              (document.getElementById("student-phone") as HTMLElement).innerText = target.phone;
              (document.getElementById("student-mail") as HTMLElement).innerText = target.mail;
              let proof_doc_msg = JSON.parse(Buffer.from(target.proof as Uint8Array).toString()) as Array<string>
              if (proof_doc_msg.length !== 0) {
                setHasProof(true)
                let proof_doc_id = proof_doc_msg[proof_doc_msg.length - 1];
                await server.fetchProof(proof_doc_id)
                  .then(res => {
                    if (res) {
                      setProof(Buffer.from(res[0]['base64code']).toString());
                    }
                  })
              } else {
                setHasProof(false);
              }
              toggleModal('info');
            }}>详细</Button>
          </Space>
        );
      }
    }
  ];
  const [table_data_source, setTableDataSource] = useState<TableDataSource>([]);

  useEffect(() => {
    student_list_ref.current = student_list;
  }, [student_list])
  useEffect(() => {
    server.fetchStudents()
      .then(res => {
        console.log(res);
        // setTableBody(res.map(x => [
        //   x.id, x.name, x.number, x.grade, x.phone,
        //   x.mail,
        //   // Buffer.from(res[0].is_practice)[0] ? '是' : '否',
        //   // Buffer.from(res[0].is_practice)[0] ? x.practice_cmp[-1] : '未处于实习状态',
        //   (JSON.parse(Buffer.from(res[0].vitae as Uint8Array).toString()) as Array<string>).length !== 0 ? '有' : '无',
        //   (JSON.parse(Buffer.from(res[0].proof as Uint8Array).toString()) as Array<string>).length !== 0 ? '有' : '无',
        //   x.score !== undefined && x.score !== -1 ? x.score : '未录入实习成绩'
        // ]));
        setTableDataSource(res.map(x => {
          return {
            id: x.id,
            name: x.name,
            number: x.number,
            grade: x.grade,
            phone: x.phone,
            mail: x.mail,
            // is_practice: Buffer.from(x.is_practice)[0] ? '是' : '否',
            // practice_cmp: Buffer.from(x.is_practice)[0] ? x.practice_cmp[-1] : '未处于实习状态',
            vitae: (JSON.parse(Buffer.from(x.vitae as Uint8Array).toString()) as Array<string>).length !== 0 ? '有' : '无',
            proof: (JSON.parse(Buffer.from(x.proof as Uint8Array).toString()) as Array<string>).length !== 0 ? '有' : '无',
            score: x.score !== undefined && x.score !== -1 ? x.score : '未录入实习成绩'
          }
        }))
        setStudentList(res);
      })
  }, [])

  // const table_head = ['编号', '姓名', '学号', '联系电话', '邮箱', '实习状态'];
  // const table_body = server.fetchStudents().map((x: {
  //   id: string,
  //   name: string,
  //   number: string,
  //   phone: string,
  //   mail: string,
  //   practice_status: string,
  // }) => {
  //   return [x.id, x.name, x.number, x.phone, x.mail, x.practice_status];
  // });
  // const student_info: Student = server.fetchStudent();
  // let student_annex: string = "";
  // if (student_info.proof) student_annex = "data:image/png;base64," + student_info.proof;
  // else setHasProof(false);

  const openAnnexModal = () => {
    // setInfoModalShown(false);
    // setPracticeAnnexModalShown(true);
    toggleModal('info');
    if (proof) {
      setProof(proof => "data:application/pdf;base64," + proof);
    }
    toggleModal('practiceAnnex');
  }
  const rateConfirm = () => {
    if (!rate_target) {
      alert('编号为空', 'danger');
      return;
    }
    let rate = (document.getElementById('practice-score-input') as HTMLInputElement).value;
    server.submitRate(rate_target, Number(rate))
      .then(res => {
        if (res) {
          location.reload()
        } else {
          toggleModal('practiceRate');
          alert('后台出错，打分失败', 'danger');
        }
      })
      .catch(err => {
        toggleModal('practiceRate');
        alert('后台出错，打分失败', 'danger');
      })
  }

  // (document.getElementById('practice-score-input') as HTMLInputElement).addEventListener("input", function () {
  //   if (parseInt(this.value) < 0) this.value = "0";
  //   if (parseInt(this.value) > 100) this.value = "100"; 
  // })


  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>名下学生信息</h2>
          <hr />
        </div>
        {/* <div className="dashboard-model-buttons">
          <button className="btn btn-primary"></button>
        </div> */}
        <div>
          {/* <Table table_head={table_head} table_body={table_body} table_id="s-table" line_action={table_line_actions} /> */}
          <Table dataSource={table_data_source} columns={table_columns} /> 
        </div>
      </div>

      <Modal {...modalProps('info', '学生信息详细', (
        <div className='student-info-panel'>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--standard-padding-width)' }}>
            <div className='student-name' id="student-name">
              {/* {student_info.name} */}
            </div>
            <div className='student-number' id="student-number">
              {/* #{student_info.number} */}
            </div>
          </div>
          <div className='student-base-info'>
            <div>
              <div>年级</div>
              {/* <div>{student_info.grade}</div> */}
              <div id="student-grade"></div>
            </div>
            <div>
              <div>联系电话</div>
              {/* <div>{student_info.phone}</div> */}
              <div id="student-phone"></div>
            </div>
            <div>
              <div>联系邮箱</div>
              {/* <div>{student_info.mail}</div> */}
              <div id="student-mail"></div>
            </div>
            {/* <div>
            <div>实习状态</div>
             <div>{student_info.is_practice}</div> 
          </div> */}
          </div>
        </div>
      ), (
        <button className='btn btn-primary' onClick={() => openAnnexModal()} disabled={!has_proof}>查看实习材料</button>
      ))} />

      <Modal {...modalProps('practiceRate', '实习评分', (
        <div className='practice-score-area'>
          <form>
            <div>
              <div style={{ flex: '1' }}><input className='form-control' type="number" max="100" min="0" id="practice-score-input" onInput={(event) => {
                if (parseInt(event.currentTarget.value) < 0) event.currentTarget.value = "0";
                if (parseInt(event.currentTarget.value) > 100) event.currentTarget.value = "100";
              }} /></div>
              <div style={{}}><button className='btn btn-primary' onClick={rateConfirm}>登录得分</button></div>
            </div>
          </form>
        </div>
      ))} />

      <Modal {...modalProps('practiceAnnex', '实习材料', (
        <div className='card'>
          {/* <img alt="" className='card-img-top' /> */}
          <embed src={proof} />
        </div>
      ))} />

      <Alert {...alertProps()} />
    </>
  );
}
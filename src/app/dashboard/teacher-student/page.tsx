'use client';

import { useEffect, useState } from 'react';

import Modal from '@/components/modal/modal.component';
import server from './teacher-student.api';
import Table, { TableLineActions } from "@/components/table/table.component";
import { Student } from '@/global/type';
import './teacher-student.part.css';

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

  const [table_head, setTableHead] = useState<string[]>([
    '编号', '学生姓名', '学号', '年级', '联系电话',
    '联系邮箱', '是否处于实习中', '当前实习公司', '个人简历',
    '实习凭证', '实习分数',
  ]);
  const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  const [table_line_actions, setTableLineActions] = useState<TableLineActions>([
    {
      type: 'primary',
      text: '详细',
      action_function: (id: string) => {

      }
    },
    {
      type: 'primary',
      text: '评分',
      action_function: (id: string) => {

      }
    },
  ])

  useEffect(() => {
    server.fetchStudents()
      .then(res => {
        setTableBody(res.map(x => [
          x.id, x.name, x.number, x.grade, x.phone,
          x.mail,
          Buffer.from(res[0].is_practice)[0] ? '是' : '否',
          Buffer.from(res[0].is_practice)[0] ? x.practice_cmp[-1] : '未处于实习状态',
          Buffer.from(res[0].has_vitae)[0] ? '有' : '无',
          Buffer.from(res[0].has_proof)[0] ? '有' : '无',
          x.score !== undefined && x.score !== -1 ? x.score : '未录入实习成绩'
        ]))
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
    toggleModal('practiceAnnex');
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
          <Table table_head={table_head} table_body={table_body} table_id="s-table" line_action={table_line_actions} />
        </div>
      </div>

      <Modal {...modalProps('info', '学生信息详细', (
        <div className='student-info-panel'>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--standard-padding-width)' }}>
          <div className='student-name'>
            {/* {student_info.name} */}
          </div>
          <div className='student-number'>
            {/* #{student_info.number} */}
          </div>
        </div>
        <div className='student-base-info'>
          <div>
            <div>年级</div>
            {/* <div>{student_info.grade}</div> */}
          </div>
          <div>
            <div>联系电话</div>
            {/* <div>{student_info.phone}</div> */}
          </div>
          <div>
            <div>联系邮箱</div>
            {/* <div>{student_info.mail}</div> */}
          </div>
          <div>
            <div>实习状态</div>
            {/* <div>{student_info.is_practice}</div> */}
          </div>
        </div>
      </div>
      ), (
        <></>
        // <button className='btn btn-primary' onClick={() => openAnnexModal()} disabled={!hasProof}>查看实习材料</button>
      ))} />

      <Modal {...modalProps('practiceRate', '实习评分', (
        <div className='practice-score-area'>
          <form>
            <div>
              <div style={{ flex: '1' }}><input className='form-control' type="number" max="100" min="0" id="practice-score-input" onInput={(event) => {
                if (parseInt(event.currentTarget.value) < 0) event.currentTarget.value = "0";
                if (parseInt(event.currentTarget.value) > 100) event.currentTarget.value = "100";
              }} /></div>
              <div style={{}}><button className='btn btn-primary'>登录得分</button></div>
            </div>
          </form>
        </div>
      ))}/>

      <Modal {...modalProps('practiceAnnex', '实习材料', (
        <div className='card'>
          <img alt="" className='card-img-top' />
        </div>
      ))}/>
    </>
  );
}
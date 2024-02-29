'use client';

import { StudentPracticeExperiencies } from '@/global/type';
import server from './student-experience.api'
import { ReactNode, useEffect, useState } from 'react';
import Modal from '@/components/modal/modal.component';
import Select from '@/components/select-with-search/select-with-search.component';
import Table, { TableLineActions } from '@/components/table/table.component';

import './student-experience.part.css';
import Alert from '@/components/alert/alert.component';
import { formInput } from '@/utils/input';

export default function Page() {

  let checked_id_list: string[] = [];

  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({
    addModalShown: false,
    delModalShown: false,
    // infoModalShown: false,
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


  // const experiencies: StudentPracticeExperiencies = server.fetchExperience();
  // const table_head: Array<string> = ['企业名称', '就职时间', '离职时间'];
  // const table_body: Array<Array<string | number | undefined>> = experiencies.map(x => {
  //   return [x.company_id, x.start, x.end];
  // });
  const [del_target, setDelTarget] = useState<string | string[]>();
  const [table_head, setTableHead] = useState<string[]>(['编号', '企业编号', '企业名称', '就职时间', '离职时间']);
  const [table_body, setTableBody] = useState<(string | number | undefined)[][]>([]);
  const [table_line_actions, setTableLineActions] = useState<TableLineActions>([
    {
      type: 'danger',
      text: '删除',
      action_function: (id: string) => {
        setDelTarget(id);
        toggleModal('del');
      }
    }
  ]);
  const [company_opts, setCompanyOpts] = useState<{ label: string, value: string | number }[]>([]);
  const [option_selected, setOptionSelected] = useState<string | number>();
  const [add_form_error_msg, setAddFormErrorMsg] = useState('');
  // const company_opts: { label: string, value: string | number }[] = server.fetchCompanies().map(x => {
  //   return {
  //     label: x.name,
  //     value: x.id
  //   }
  // });

  useEffect(() => {
    server.fetchExperience()
      .then(res => {
        if (res) {
          setTableBody(res.map(x => [x.id, x.company_id, x.company_name, new Date(x.start).toLocaleDateString(), x.end ? new Date(x.end).toLocaleDateString() : '-']));
        } else {
          alert('后台拉取信息错误', 'danger');
        }
      })
      .catch(err => {
        console.error(err);
        alert('后台拉取信息错误', 'danger');
      });
    server.fetchCompanies()
      .then(res => {
        if (res) {
          setCompanyOpts(res.map(x => { return { label: x.name, value: x.id } }))
        } else {
          alert('后台拉取信息错误', 'danger');
        }
      })
      .catch(err => {
        console.error(err);
        alert('后台拉取信息错误', 'danger');
      });
  }, []);

  const checkChangeRecall = (id_list: string[]) => {
    // setCheckedIdList(id_list);
    checked_id_list = id_list;
  };
  const saveAdd = () => {
    let form_value = formInput(document.getElementById('form-add') as HTMLElement);

    if (!option_selected) {
      setAddFormErrorMsg('未选中企业');
      return;
    }
    if (!form_value[0]) {
      setAddFormErrorMsg('未选中起始时间');
      return;
    }

    server.addExperience({ company_id: option_selected as string, start: form_value[0] as string, end: form_value ? form_value[1] as string : undefined })
      .then(res => {
        console.log(res);
        if (res) {
          toggleModal('add');
          location.reload();
        } else {
          toggleModal('add');
          alert('后台出错，添加失败', 'danger');
        }
      })
      .catch(err => {
        toggleModal('add');
        alert('后台出错，添加失败', 'danger');
      });
  };
  const delChecked = async () => {
    setDelTarget(checked_id_list);
    console.log(checked_id_list);
    toggleModal('del');
  }
  const delConfirm = async () => {
    if (!del_target || (typeof del_target === 'object' && del_target.length === 0)) {
      toggleModal('del');
      alert('删除编号为空', 'danger');
      return;
    }
    if (typeof del_target === 'string') {
      server.delExperience(del_target)
        .then(res => {
          if (res) {
            toggleModal('del');
            location.reload();
          } else {
            toggleModal('del');
            alert('后台出错，删除失败', 'danger');
            return;
          }
        })
        .catch(err => {
          toggleModal('del');
          alert('后台出错，删除失败', 'danger');
          return;
        })
    } else {
      for (let id of del_target) {
        try {
          await server.delExperience(id)
        } catch (err) {
          continue;
        }
      }
      toggleModal('del');
      location.reload();
    }
  }

  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>实习经历一览</h2>
          <hr />
        </div>
        <div className="dashboard-model-buttons">
          <button className="btn btn-primary" onClick={() => toggleModal('add')}>添加</button>
          <button className="btn btn-danger" onClick={() => delChecked()}>删除</button>
        </div>
        <Table table_id='table' table_head={table_head} table_body={table_body} checkbox={true} line_action={table_line_actions} check_change_function={checkChangeRecall} />
      </div>

      <Modal {...modalProps('add', '添加经历', (
        <div>
          <form id='form-add'>
            <div className="mb-3">
              <label className="form-label">企业名称</label>
              {/* <Select opts={company_opts} placeholder="企业名称" component_id="company-search" /> */}
              <Select options={company_opts} placeholder='企业名称' selected={setOptionSelected} />
            </div>
            <div className="mb-3">
              <label className="form-label">入职时间</label>
              <input className="form-control" type="date" defaultValue="1999-01-01" />
            </div>
            <div className="mb-3">
              <label className="form-label">离职时间</label>
              <input className="form-control" type="date" defaultValue="1999-01-01" />
            </div>
          </form>
          <div className='form-error-info'>
            {add_form_error_msg}
          </div>
        </div>
      ), (
        <button className='btn btn-primary' onClick={() => { saveAdd() }}>确认</button>
      ))} />

      <Modal {...modalProps('del', '删除确认', (
        <p>删除内容后无法恢复，是否继续</p>
      ), (
        <button className='btn btn-danger' onClick={() => delConfirm()}>确认</button>
      ))} />

      {/* <Modal shown={infoModalShown} id="modal-info" modal_title='详细' close_function={() => setInfoModalShown(false)} modal_btns={
        <>
          <button className='btn btn-secondary' onClick={() => setInfoModalShown(false)}>关闭</button>
        </>
      }>
        <div className='experience-info'>
          <div>
            <div>企业名称</div>
            <div>国家安全局</div>
          </div>
          <div>
            <div>入职时间</div>
            <div>2023-07-10</div>
          </div>
          <div>
            <div>离职时间</div>
            <div>2024-02-01</div>
          </div>
        </div>
      </Modal>

      <Modal shown={exportModalShown} id="modal-export" modal_title='导出数据' close_function={() => setExportModalShown(false)} modal_btns={
        <>
          <button className='btn btn-primary'>确定</button>
          <button className='btn btn-secondary' onClick={() => setExportModalShown(false)}>关闭</button>
        </>
      }>
        是否将选定内容导出至外部
      </Modal> */}

      <Alert {...alertProps()} />
    </>
  )
}
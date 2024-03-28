'use client'

import { useEffect, useState } from 'react';

import server from './admin-company.api';
import { Companies, Company, FormItems, TableColumns, TableDataSource } from '@/global/type';
import { ArrayBuffer2Base64, MailCheck, PhoneCheck, formInput } from '@/utils/input';
import Modal from '@/components/modal/modal.component';
import Form from '@/components/form/form.component';
import Table, { TableLineActions } from '@/components/table/table.component';
import './admin-company.part.css';
import { useRouter } from 'next/navigation';
import Alert from '@/components/alert/alert.component';
import { Button, Input, Space, message } from 'antd';

export default function Page() {

  const router = useRouter();

  let checked_id_list: string[] = [];

  const [messageApi, contextHolder] = message.useMessage();
  const [addModalShown, setAddModalShown] = useState(false);
  const [editModalShown, setEditModalShown] = useState(false);
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [exportModalShown, setExportModalShown] = useState(false);
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

  const [search_keyword, setSearchKeyword] = useState('');
  const [add_form_error_msg, setAddFormErrorMsg] = useState('');
  const [edit_form_error_msg, setEditFormErrorMsg] = useState('');
  const [del_targets, setDelTargets] = useState<string | string[]>();
  const [edit_target, setEditTarget] = useState<string>();
  const [refresh, setRefresh] = useState(false);
  const [license, setLicense] = useState<null | File>(null);
  // const [checked_id_list, setCheckedIdList] = useState<string[]>([]);
  // const [table_body, setTableBody] = useState<Array<Array<string | number | undefined>>>([]);
  // const [table_head, setTableHead] = useState<Array<string>>(['编号', '企业名称', '联系电话', '联系邮箱']);
  // const [table_line_actions, setTableLineActions] = useState<TableLineActions>([
  //   {
  //     type: 'danger', text: '删除',
  //     action_function: (id: string) => {
  //       setDelTargets(id);
  //       setDeleteModalShown(true);
  //     }
  //   }, 
  //   {
  //     type: 'warning', text: '修改',
  //     action_function: (id: string) => {
  //       server.fetchCompany(id)
  //         .then(res => {
  //           let form_value = document.getElementById('edit-form') as HTMLFormElement;
  //           let form_input_list = form_value.children;
  //           let company_id = res.id;
  //           let company_info = [ res.name, res.phone, res.mail ]
  //           for ( let info = 0; info < company_info.length; info += 1 ) {
  //             let input_item = form_input_list.item(info)?.lastChild as HTMLInputElement;
  //             input_item.value = company_info[info];
  //           }
  //           setEditTarget(company_id);
  //           setEditModalShown(true);
  //         })
  //         .catch(_ => {
  //           alert('获取数据失败', 'danger');
  //         })
  //     }
  //   }
  // ]);
  const [table_columns, setTableColumns] = useState<TableColumns>([
    // '编号', '企业名称', '联系电话', '联系邮箱'
    { title: '编号', dataIndex: 'id', key: 'id', hidden: true },
    { title: '企业名称', dataIndex: 'name', key: 'name' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone' },
    { title: '联系邮箱', dataIndex: 'mail', key: 'mail' },
    {
      title: '操作', dataIndex: 'action', key: 'action', render: (_, record) => {
        return <Space size='middle'>
          <Button onClick={() => { setDelTargets(record.id); setDeleteModalShown(true) }} type='link' danger>删除</Button>
          <Button onClick={() => {
            server.fetchCompany(record.id)
              .then(res => {
                setEditModalShown(true);
                setTimeout(() => {
                  let form_value = document.getElementById('edit-form') as HTMLFormElement;
                  let form_input_list = form_value.children;
                  let company_id = res.id;
                  let company_info = [res.name, res.phone, res.mail]
                  for (let info = 0; info < company_info.length; info += 1) {
                    let input_item = form_input_list.item(info)?.lastChild as HTMLInputElement;
                    input_item.value = company_info[info];
                  }
                  setEditTarget(company_id);

                }, 2000);

              })
              .catch(_ => {
                // alert('获取数据失败', 'danger');
                messageApi.error('获取数据失败');
              })
          }} type="link">修改</Button>
        </Space>
      }
    }
  ])
  const [table_data_source, setTableDataSource] = useState<TableDataSource>([]);


  // useEffect(() => {
  //   server.fetchCompanies()
  //     .then(res => {
  //       setTableBody(res.map(x => [x.id, x.name, x.phone, x.mail]));
  //     });
  // }, []);
  useEffect(() => {
    fetchCompanies();
  }, [refresh]);

  const fetchCompanies = () => {
    server.fetchCompanies()
      .then(res => {
        // setTableBody(res.map(x => [x.id, x.name, x.phone, x.mail]));
        setTableDataSource(res.map(x => {
          return {
            key: x.id as React.Key,
            id: x.id,
            name: x.name,
            phone: x.phone,
            mail: x.mail,
          }
        }))
      });
  };
  const add_form_items: FormItems = [
    { label: '企业名称', type: 'input' },
    { label: '联系电话', type: 'input' },
    { label: '联系邮箱', type: 'input' },
    {
      label: '营业执照', type: 'file', fileTypeRestricted: ['.pdf'],
      fileTackleFunction: (event) => {
        const files = event.currentTarget.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        setLicense(() => file);
      }
    },
  ];
  const edit_form_items: FormItems = [
    { label: '企业名称', type: 'input' },
    { label: '联系电话', type: 'input' },
    { label: '联系邮箱', type: 'input' },
    {
      label: '营业执照', type: 'file', fileTypeRestricted: ['.pdf'],
      fileTackleFunction: (event) => {
        const files = event.currentTarget.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        setLicense(() => file);
      }
    },
  ];

  const checkChangeRecall = (id_list: string[]) => {
    // setCheckedIdList(id_list);
    checked_id_list = id_list;
  }
  const saveAdd = async () => {
    let form_value = formInput(document.getElementById('add-form') as HTMLElement).slice(0, -1);
    let data: { name: string, phone: string, mail: string, license: string } = {
      name: form_value[0] as string,
      phone: form_value[1] as string,
      mail: form_value[2] as string,
      license: ''
    };
    if (data.name.length === 0 || data.mail.length === 0 || data.phone.length === 0) {
      console.error('必填信息不能为空');
      setAddFormErrorMsg('必填信息不能为空');
      return;
    }
    if (!PhoneCheck(data.phone)) {
      console.error('手机号码格式错误');
      setAddFormErrorMsg('手机号码格式错误');
      return;
    }
    if (!MailCheck(data.mail)) {
      console.error('邮箱格式错误');
      setAddFormErrorMsg('邮箱格式错误');
      return;
    }
    if (license === null) {
      setAddFormErrorMsg('请上传营业执照');
      return;
    }
    data.license = ArrayBuffer2Base64(await license.arrayBuffer());
    server.addCompany(data)
      .then(res => {
        if (res) {
          // setRefresh((val) => !val);
          setAddModalShown(false);
          setTimeout(() => {
            // location.reload();
            fetchCompanies();
          }, 2000);
        } else {
          setAddFormErrorMsg('出现错误');
        }
      })
      .catch(e => {
        console.error(e)
        setAddFormErrorMsg('出现错误');
      })
      .finally(() => {
        setLicense(null);
      });
  }
  const saveEdit = async () => {
    if (!edit_target) {
      setEditModalShown(false);
      // alert("id不存在", "danger");
      messageApi.error('id不存在');
      return;
    }
    let form_value = formInput(document.getElementById('edit-form') as HTMLElement).slice(0, -1);
    let data: { [key: string]: string } = { name: form_value[0] as string, phone: form_value[1] as string, mail: form_value[2] as string }
    if (license) data['license'] = ArrayBuffer2Base64(await license.arrayBuffer());;
    server.updateCompany(edit_target, data)
      .then(res => {
        if (res) {
          setEditModalShown(false);
          location.reload();
        } else {
          setEditModalShown(false);
          // alert("修改失败，后台出错", 'danger');
          messageApi.error('修改失败，后台出错');
        }
      })
      .catch(err => {
        setEditModalShown(false);
        // alert("修改失败，后台出错", 'danger');
        messageApi.error('修改失败，后台出错');
      })
      .finally(() => {
        setEditTarget(undefined);
      })
  }
  const delMutiple = () => {
    console.log(checked_id_list);
    setDelTargets(checked_id_list);
    setDeleteModalShown(true);
  }
  const delConfirm = async () => {
    if (!del_targets || typeof del_targets === 'object' && del_targets.length === 0) {
      setDeleteModalShown(false);
      // alert('删除id列表为空', "danger");
      messageApi.error('删除id列表为空');
      return;
    }
    setDeleteModalShown(false);
    // ... delete process
    if (typeof del_targets === 'object') {
      for (let del_target of del_targets) {
        await server.delCompany(del_target)
          .catch(err => {
            // alert(del_target + " 删除失败", "danger");
            messageApi.error(del_target + " 删除失败");
          });
      }
      location.reload();
    } else {
      server.delCompany(del_targets)
        .then(res => {
          if (res) location.reload();
          else {
            setDeleteModalShown(false);
            // alert('删除失败，后台出错', "danger");
            messageApi.error('删除失败，后台出错');
          }
        })
        .catch(err => {
          setDeleteModalShown(false);
          // alert('删除失败，后台出错', "danger");
          messageApi.error('删除失败，后台出错');
        })
        .finally(() => {
          setDelTargets(undefined);
        })
    }
  };
  const search = (keyword: string) => {
    server.searchCompany(keyword)
      .then(res => {
        setTableDataSource(res.map(x => {
          return {
            key: x.id as React.Key,
            id: x.id,
            name: x.name,
            phone: x.phone,
            mail: x.mail,

          }
        }))
      })
  }

  return (
    <>
      {contextHolder}
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>企业信息管理</h2>
        </div>
        <hr />
        {/* 功能按钮区域 */}
        <div className="dashboard-model-buttons-and-search">
          <div className="dashboard-model-buttons">
            <Button type='primary' onClick={() => setAddModalShown(true)}>新增</Button>
            <Button onClick={() => delMutiple()} danger>删除</Button>
            {/* <Button >导入</Button>
            <Button onClick={() => setExportModalShown(true)}>导出</Button> */}
            {/* <button className="btn btn-secondary">导入</button>
            <button className="btn btn-secondary" onClick={() => setExportModalShown(true)}>导出</button> */}
          </div>
          <div>
            {/* <Search placeholder="搜索"  /> */}
            <Space>
              <Space.Compact>
                <Input placeholder="输入关键字" onChange={(e) => setSearchKeyword(e.currentTarget.value)} />
                <Button type="primary" onClick={() => search(search_keyword)}>搜索</Button>
              </Space.Compact>
            </Space>
          </div>
        </div>
        {/* 数据表格区域 */}
        {/* <Table table_id='table' table_head={table_head} table_body={table_body} checkbox={true} line_action={table_line_actions} check_change_function={checkChangeRecall} /> */}
        <Table dataSource={table_data_source} columns={table_columns} check_change_function={(checked_list) => checked_id_list = checked_list} />
      </div>

      {/* 添加模态框 */}
      <Modal shown={addModalShown} modal_title='添加企业' close_function={() => setAddModalShown(false)} modal_btns={
        <>
          {/* <button type="button" className="btn btn-primary" onClick={saveAdd}>确认</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAddModalShown(false)}>关闭</button> */}
          <Button type='primary' onClick={saveAdd}>确认</Button>
        </>
      }>
        <Form form_items={add_form_items} form_id="add-form" />
        {/* 错误提示 */}
        <div className='form-error-info'>
          {add_form_error_msg}
        </div>
      </Modal>

      {/* 修改模态框 */}
      <Modal shown={editModalShown} close_function={() => setEditModalShown(false)} modal_title='修改公司信息' modal_btns={
        <>
          {/* <button className='btn btn-primary' onClick={() => saveEdit()}>确定</button>
          <button className='btn btn-secondary' onClick={() => setEditModalShown(false)}>取消</button> */}
          <Button type='primary' onClick={() => saveAdd()}>确定</Button>
        </>
      }>
        <Form form_items={edit_form_items} form_id="edit-form" />
        {/* 错误提示 */}
        <div className='form-error-info'>
          {edit_form_error_msg}
        </div>
      </Modal>

      {/* 删除确认 */}
      <Modal shown={deleteModalShown} close_function={() => setDeleteModalShown(false)} modal_title="是否确认删除" modal_btns={
        <>
          {/* <button className="btn btn-danger" onClick={() => delConfirm()}>确认</button>
          <button className="btn btn-secondary" onClick={() => setDeleteModalShown(false)}>取消</button> */}
          <Button type="primary" danger onClick={() => delConfirm()}>确认</Button>
        </>
      }>
        删除内容后无法恢复，是否继续
      </Modal>

      {/* 导出设置 */}
      <Modal shown={exportModalShown} close_function={() => setExportModalShown(false)} modal_title="是否确认导出" modal_btns={
        <>
          {/* <button className="btn btn-secondary" onClick={() => setExportModalShown(false)}>关闭</button> */}
          <Button type="primary">确认</Button>
        </>
      }>
        是否将选定内容导出至外部
      </Modal>

      {/* <Alert shown={alertShown} message={alertMessage} close_function={() => alertClear()} type={alertType} /> */}
    </>
  )
}
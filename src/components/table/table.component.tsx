'use client'

import { ChangeEvent, ChangeEventHandler, Component, ReactNode } from 'react';
import { Table as AntdTable, Space } from 'antd';

import './table.component.css';
import { TableColumns, TableDataSource } from '@/global/type';

export interface TableLineAction {
  type: 'danger' | 'warning' | 'primary' | 'success',
  text: string,
  action_function: (id: string) => void;
}
export type TableLineActions = Array<TableLineAction>;

// interface TableProps {
//   table_id: string;
//   table_head: Array<string>;
//   table_body: Array<Array<string | number | undefined>>;
//   checkbox?: boolean;
//   check_change_function?: (id_list: string[]) => void;
//   line_action?: TableLineActions;
// }

// interface TableState {
//   now_page: number;
// }

interface TableProps {
  // dataSource 中的字段名是columns中的dataIndex
  // columns: Array<{ title: string, dataIndex: string, key: string, hidden?: boolean, render?: (...args: any) => ReactNode }>
  columns: TableColumns
  // dataSource: Array<{ [key: string]: string | number | undefined }>
  dataSource: TableDataSource
  // actions?: TableLineActions
  check_change_function?: (id_list: string[]) => void
}

interface TableState {
  selectedRowKeys: React.Key[]
}

export default class Table extends Component<TableProps, TableState> {
  // table_id: string;
  // table_head: Array<string>;
  // table_body: Array<Array<string | number | undefined>>;
  // checkbox: boolean | undefined;
  // line_action: TableLineActions | undefined;

  // table_head_node: React.ReactNode;
  // table_body_node: React.ReactNode;
  // paginator: React.ReactNode;
  // checked_list: (string | null | undefined)[];
  // check_change_function: ((id_list: string[]) => void) | undefined;

  // max_item: number;

  constructor(props: TableProps) {

    super(props);

    this.state = {
      selectedRowKeys: []
    }
    // this.table_id = props.table_id;
    // this.table_head = props.table_head;
    // this.table_body = props.table_body;
    // this.line_action = props.line_action;
    // this.checkbox = props.checkbox;
    // this.check_change_function = props.check_change_function;

    // this.checked_list = [];
    // this.state = {
    //   now_page: 1
    // };
    // this.max_item = 10;

    // this.makeTableHead();
    // this.makeTableBody(this.state.now_page);
    // this.makePagin(this.state.now_page);

    // if (props.actions)  {
    //   props.columns.push({ title: '操作', dataIndex: 'actions', key: 'actions', render: (_, record) => {
    //     return <Space size="middle">
    //       {props.actions?.map((x, index) => {
    //         return (
    //           <a key={'inline_action_' + index} onClick={() => x.action_function(record.id)} type={x.type}>{x.text}</a>
    //         );
    //       })}
    //     </Space>;        
    //   }});
    // }
  }

  // makeTableHead() {
  //   this.table_head_node = this.table_head.map((x, index) => {
  //     return (
  //       <th key={index}>{x}</th>
  //     );
  //   });
  // }

  // makeTableBody(now_page: number) {
  //   const _table_body = this.table_body.slice((now_page - 1) * this.max_item, now_page * this.max_item);
  //   this.table_body_node = _table_body.map((x, index) => {
  //     const t_line: React.ReactNode = x.map((y, sub_index) => {
  //       return (
  //         <td key={sub_index}>{y}</td>
  //       );
  //     });
  //     const t_action: React.ReactNode = this.line_action ?
  //       this.line_action.map((y, sub_index) => {
  //         return <a key={sub_index} className={`link-${y.type} text-decoration-none`} onClick={() => y.action_function(x[0] as string)}>{y.text}</a>
  //       })
  //       : <></>
  //     let action = <></>;
  //     let cbox = <></>
  //     if (this.line_action && this.line_action.length !== 0) {
  //       action = (
  //         <td className="table-inline-buttons" style={{ width: '300px', minWidth: '300px' }}>
  //           {t_action}
  //         </td>
  //       );
  //     }
  //     if (this.checkbox) {
  //       cbox = (
  //         <td style={{ width: '20px' }}>
  //           <input className="form-check-input table-checkbox" type="checkbox" onChange={() => this.checkChange(x[0] as string)} />
  //         </td>
  //       );
  //     }
  //     return (
  //       <tr key={index}>
  //         {cbox}
  //         {t_line}
  //         {action}
  //       </tr>
  //     );
  //   });
  // }

  // makePagin(now_page: number) {
  //   let len = Math.ceil(this.table_body.length / this.max_item);
  //   let pages: Array<React.ReactNode> = []
  //   for (let i = 0; i < len; i += 1) {
  //     pages.push(
  //       <li className="page-item" key={'page-icon-' + i}>
  //         <a
  //           className={"page-link " + (now_page === i + 1 ? "active" : "")}
  //           style={{ cursor: 'pointer' }}
  //           onClick={() => {
  //             this.setState({ now_page: i + 1 }, () => {
  //               // 可以在这里执行任何需要在页码更新后完成的逻辑
  //               console.log('Page changed to:', this.state.now_page);
  //             });
  //           }}
  //         >
  //           {i + 1}
  //         </a>
  //       </li>
  //     )
  //   }
  //   this.paginator = pages;
  // }

  // changePage(page: number) {
  //   ;
  // }

  // componentDidUpdate(prevProps: Readonly<TableProps>, prevState: Readonly<TableState>, snapshot?: any): void {
  //   if (this.table_body != this.props.table_body) {
  //     this.table_body = this.props.table_body;
  //     this.makeTableBody(this.state.now_page);
  //   }
  //   if (this.state.now_page != prevState.now_page) {
  //     this.makeTableBody(this.state.now_page);
  //   }
  //   this.makePagin(this.state.now_page);
  // }

  // componentDidMount(): void {
  //   this.makePagin(this.state.now_page);
  // }

  // submitChange() {
  //   if (this.props.check_change_function) {
  //     this.props.check_change_function(this.checked_list as string[]);
  //   }
  // }

  // checkChange(id: string) {
  //   if (this.checked_list.findIndex(val => val === id) === -1) this.checked_list.push(id);
  //   else this.checked_list = this.checked_list.filter(val => val !== id);

  //   this.submitChange();
  // }

  // changeAllCheck() {
  //   const checked = (document.getElementById(this.table_id + '-main-checkbox') as HTMLInputElement).checked;
  //   const checks = document.getElementsByClassName('table-checkbox');
  //   for (let check of checks as HTMLCollectionOf<HTMLInputElement>) {
  //     check.checked = checked;
  //     if (checked) this.checked_list.push(check.parentElement?.parentElement?.getElementsByTagName('td')[1].textContent);
  //   }
  //   if (!checked) this.checked_list = [];

  //   this.submitChange();
  // }

  // onSelectChange (newSelectedRowKeys: React.Key[]) {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   this.setState({
  //     selectedRowKeys: newSelectedRowKeys,
  //   })
  // };

  render(): ReactNode {
    return (
      <>
        {/* <div className="dashboard-model-table">
          <div className="dashboard-model-table-body">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  {this.checkbox === undefined ? <></> : <th style={{ width: '20px' }}><input className="form-check-input" type="checkbox" id={this.table_id + '-main-checkbox'} onChange={() => this.changeAllCheck()} /></th>}
                  {this.table_head_node}
                  {this.line_action === undefined ? <></> : <th>操作</th>}
                </tr>
              </thead>
              <tbody>
                {this.table_body_node}
              </tbody>
            </table>
          </div>
          <div className="dashboard-model-table-pagination">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {this.paginator}
              </ul>
            </nav>
          </div>
        </div> */}
        <div className='table-main'>
          <AntdTable
            dataSource={this.props.dataSource}
            columns={this.props.columns}
            style={{ height: '100%', maxHeight: '100%', minHeight: '100%', minWidth: '100%' }}
            // scroll={{ y: '100%' }}
            // rowSelection={ this.props.check_change_function ? { type: 'checkbox', onChange: (selectedRowKeys, selectedRows) => {
            //   if (this.props.check_change_function) {
            //     this.props.check_change_function(selectedRows.map(x => x.id as string));
            //   }
            // }} : undefined }
            // rowSelection={{
            //   selectedRowKeys: this.state.selectedRowKeys, type: 'checkbox', onChange: (selectedRowKeys, selectedRows) => {
            //     console.log(selectedRowKeys, selectedRows)
            //     this.setState({ selectedRowKeys });
            //   }
            // }}
            rowSelection={{ selectedRowKeys: this.state.selectedRowKeys, onChange: (currSelectedRowKeys) => {
              this.setState({ selectedRowKeys: currSelectedRowKeys })
              if (this.props.check_change_function) {
                this.props.check_change_function(currSelectedRowKeys.map(x => x.toString()));
              }
            }}}
          />
        </div>
      </>
    )
  }

}
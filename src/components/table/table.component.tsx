'use client'

import { ChangeEvent, ChangeEventHandler, Component, ReactNode } from 'react';
import './table.component.css';

interface TableProps {
  table_id: string;
  table_head: Array<string>;
  table_body: Array<Array<string | number | undefined>>;
  line_action?: React.ReactNode;
  checkbox?: boolean;
}

interface TableState {
}

export default class Table extends Component<TableProps> {
  table_id: string;
  table_head: Array<string>;
  table_body: Array<Array<string | number | undefined>>;
  line_action: React.ReactNode | undefined;
  checkbox: boolean | undefined;

  table_head_node: React.ReactNode;
  table_body_node: React.ReactNode;
  checked_list: (string | null | undefined)[];

  constructor(props: TableProps) {
    super(props);

    this.table_id = props.table_id;
    this.table_head = props.table_head;
    this.table_body = props.table_body;
    this.line_action = props.line_action;
    this.checkbox = props.checkbox;

    this.checked_list = [];

    this.table_head_node = this.table_head.map((x, index) => {
      return (
        <th key={index}>{x}</th>
      );
    });
    this.table_body_node = this.table_body.map((x, index) => {
      const t_line: React.ReactNode = x.map((y, sub_index) => {
        return (
          <td key={sub_index}>{y}</td>
        );
      });
      let action = <></>;
      let cbox = <></>
      if (this.line_action) {
        action = (
          <td className="table-inline-buttons" style={{ width: '300px', minWidth: '300px' }}>
            {this.line_action}
          </td>
        );
      }
      if (this.checkbox) {
        cbox = (
          <td style={{ width: '20px' }}>
            <input className="form-check-input table-checkbox" type="checkbox" onChange={this.checkChange}  />
          </td>
        );
      }
      return (
        <tr key={index}>
          {cbox}
          {t_line}
          {action}
        </tr>
      );
    });
  }

  checkChange(event: ChangeEvent<HTMLInputElement>) {
    const checked = (document.getElementById(this.table_id + '-main-checkbox') as HTMLInputElement).checked;
    const checks = document.getElementsByClassName('table-checkbox');
    for (let check of checks as HTMLCollectionOf<HTMLInputElement>) {
      check.checked = checked;
      if (checked) this.checked_list.push(check.parentElement?.parentElement?.getElementsByTagName('td')[1].textContent);
    }
    if (!checked) this.checked_list = [];
  }

  changeAllCheck() {
    const checked = (document.getElementById(this.table_id + '-main-checkbox') as HTMLInputElement).checked;
    const checks = document.getElementsByClassName('table-checkbox');
    for (let check of checks as HTMLCollectionOf<HTMLInputElement>) {
      check.checked = checked;
      if (checked) this.checked_list.push(check.parentElement?.parentElement?.getElementsByTagName('td')[1].textContent);
    }
    if (!checked) this.checked_list = [];
  }

  render(): ReactNode {
    return  (
      <>
        <div className="dashboard-model-table">
          <div className="dashboard-model-table-body">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  {this.checkbox === undefined ? <></> : <th style={{ width: '20px' }}><input className="form-check-input" type="checkbox" id={this.table_id + '-main-checkbox'} onChange={() => this.changeAllCheck()}/></th>}
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
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    )
  }

}
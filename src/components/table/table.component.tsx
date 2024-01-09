'use client'

import { ChangeEvent, ChangeEventHandler } from 'react';
import './table.component.css';

export default function Table(props: any) {

  let checked_list: (string | null | undefined)[] = [];

  const {
    table_head, table_body
  }: {
    table_head: Array<string>,
    table_body: Array<Array<string | number | undefined>>,
  } = props;
  const { table_id }: { table_id: string } = props;
  const { line_action }: { line_action: React.ReactNode } = props;
  const { checkbox }: { checkbox: boolean } = props;

  function checkChange(event: ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.parentElement?.parentElement?.getElementsByTagName('td')[1])
    const checked_id = event.target.parentElement?.parentElement?.getElementsByTagName('td')[1].textContent;
    if (event.target.checked) 
      checked_list.push(checked_id);
    else
      checked_list.splice(checked_list.indexOf(checked_id), 1);
  }

  const table_head_node: React.ReactNode = table_head.map((x, index) => {
    return (
      <th key={index}>{x}</th>
    );
  });
  const table_body_node: React.ReactNode = table_body.map((x, index) => {
    const t_line: React.ReactNode = x.map((y, sub_index) => {
      return (
        <td key={sub_index}>{y}</td>
      );
    });
    let action = <></>;
    let cbox = <></>
    if (line_action) {
      action = (
        <td className="table-inline-buttons" style={{ width: '300px', minWidth: '300px' }}>
          {line_action}
        </td>
      );
    }
    if (checkbox) {
      cbox = (
        <td style={{ width: '20px' }}>
          <input className="form-check-input table-checkbox" type="checkbox" onChange={checkChange}  />
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

  const changeAllCheck = () => {
    const checked = (document.getElementById(table_id + '-main-checkbox') as HTMLInputElement).checked;
    const checks = document.getElementsByClassName('table-checkbox');
    for (let check of checks as HTMLCollectionOf<HTMLInputElement>) {
      check.checked = checked;
      if (checked) checked_list.push(check.parentElement?.parentElement?.getElementsByTagName('td')[1].textContent);
    }
    if (!checked) checked_list = [];
    // console.log(checked_list)
  }

  return (
    <>
      <div className="dashboard-model-table">
        <div className="dashboard-model-table-body">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                {checkbox === undefined ? <></> : <th style={{ width: '20px' }}><input className="form-check-input" type="checkbox" id={table_id + '-main-checkbox'} onChange={() => changeAllCheck()}/></th>}
                {table_head_node}
                {line_action === undefined ? <></> : <th>操作</th>}
              </tr>
            </thead>
            <tbody>
              {table_body_node}
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
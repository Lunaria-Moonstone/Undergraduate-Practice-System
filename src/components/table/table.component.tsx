import './table.component.css';

export default function Table(props: any) {

  const { 
    table_head, table_body
  }: {
    table_head: Array<string>,
    table_body: Array<Array<string | number | undefined>>,
  } = props;
  const { line_action }: { line_action: React.ReactNode } = props;

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
    
    return (
      <tr key={index}>
        {t_line}
        <td className="table-inline-buttons" style={{ width: '300px', minWidth: '300px' }}>
          {line_action}
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="dashboard-model-table">
        <div className="dashboard-model-table-body">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
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
import { ReactNode } from 'react'

export default function Modal(props: any) {
  const { children } = props;
  let { 
    btn_name, btn_class, modal_id, modal_title, modal_btns
  }: { 
    btn_name: string, btn_class: string, modal_id: string, modal_title: string, modal_btns?: ReactNode
  } = props;
  if (!modal_btns) {
    modal_btns = (
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    )
  }

  return (
    <>
      <button type="button" className={btn_class} data-bs-toggle="modal" data-bs-target={`#${modal_id}`}>
        {btn_name}
      </button>
      <div className="modal fade" id={modal_id} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog"> 
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{modal_title}</h1>
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              {modal_btns}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
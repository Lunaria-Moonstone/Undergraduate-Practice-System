import { Component, ReactNode, useEffect } from "react";
// import { Modal as BootstrapModal } from "bootstrap";
import { Modal as AntdModal, Button } from "antd";

interface ModalProps {
  shown: boolean;
  children: ReactNode;
  close_function: Function;
  // id?: string;
  modal_title?: string;
  modal_btns?: ReactNode;
}

export default class Modal extends Component<ModalProps> {

  // shown: boolean;
  // children?: ReactNode | undefined = undefined;
  // close_function: Function;
  // id?: string;
  // modal_title?: string;
  // modal_btns?: ReactNode;

  constructor(props: any) {
    super(props);

    // this.children = props.children;
    // this.id = props.id ?? 'modal';
    // this.modal_title = props.modal_title ?? 'modal';
    // this.modal_btns = props.modal_btns ?? (<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>);
    // this.shown = props.shown;
    // this.close_function = props.close_function;
  }

  componentDidMount(): void {
    // // const modal = new BootstrapModal('#' + this.id);
    // const modal = document.getElementById(this.id as string);
    // // 绑定窗体关闭事件，当窗体关闭时
    // modal?.addEventListener('hidden.bs.modal', () => {
    //   this.close_function();
    // })
  }

  componentDidUpdate(prevProps: Readonly<ModalProps>, prevState: Readonly<{}>, snapshot?: any): void {
    // if (this.props.shown !== prevProps.shown) {
    //   // const modal = new BootstrapModal('#' + this.id);
    //   const modal = BootstrapModal.getOrCreateInstance("#" + this.id);
    //   if (this.props.shown) modal.show();
    //   else modal.hide();
    // }
    // if (this.props.children !== prevProps.children) {
    //   this.children = this.props.children;
    // }
  }

  // hide() {
  //   const modal = BootstrapModal.getOrCreateInstance("#" + this.id);
  //   modal.hide();
  // }

  render() {

    return (
      <>
        {/* <div className="modal fade" id={this.id} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{this.modal_title}</h1>
              </div>
              <div className="modal-body">
                {this.props.children}
              </div>
              <div className="modal-footer">
                <button onClick={() => this.hide()}>close</button>
                {this.props.modal_btns}
              </div>
            </div>
          </div>
        </div> */}
        <AntdModal title={this.props.modal_title ?? ''} open={this.props.shown} closable={false}
          footer={
            <>
              <Button onClick={() => this.props.close_function()}>关闭</Button>
              {this.props.modal_btns}
            </>
          }>{this.props.children}</AntdModal>
      </>
    )
  }
}
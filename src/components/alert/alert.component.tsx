import { Component, ReactNode } from "react";

import './alert.component.css';

interface AlertProps {
  shown: boolean;
  message: string;
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  close_function: Function;
}

export default class Alert extends Component<AlertProps> {

  id: string;
  shown: boolean;
  message: string;
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  close_function: Function;
  children: ReactNode;

  constructor(props: AlertProps) {
    super(props);

    this.id = 'alert';
    this.message = props.message;
    this.shown = props.shown;
    this.type = props.type;
    this.close_function = props.close_function;
  }

  createAlert(message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark') {
    const alert = document.getElementById('alert-div');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type}" role="alert">`,
      `  <div>${message}</div>`,
      `</div>`
    ].join("");
    alert?.append(wrapper);
  }

  distroyAlert() {
    // this.children = (<></>);
    const alert = document.getElementById('alert-div');
    while (alert?.hasChildNodes()) alert.removeChild(alert.firstChild as ChildNode);
    this.close_function();
  }

  componentDidUpdate(prevProps: Readonly<AlertProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.shown) {
      this.createAlert(this.props.message, this.props.type);
      setTimeout(() => this.distroyAlert(), 5000);
    }
  }

  render() {
    return (
      <>
        <div id="alert-div">
        </div>
      </>
    )
  }
}
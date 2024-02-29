'use client'

import React from "react";
import { Dropdown } from "bootstrap";

import 'bootstrap/js/dist/dropdown';

interface Option {
  label: string,
  value: string | number,
}
type Options = Array<Option>;

interface SelectProps {
  options: Options;
  placeholder?: string;
  selected?: (value: string | number) => void;
}
interface SelectStates {
  dropdown_items: React.ReactNode;
}

export default class Select extends React.Component<SelectProps, SelectStates> {

  constructor(props: SelectProps) {
    super(props);
    this.state = {
      dropdown_items: <li><a className="dropdown-item disabled">查无此企业</a></li>
    };
  }

  componentDidUpdate(prevProps: Readonly<SelectProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.options !== prevProps.options) this.setState({ dropdown_items: this._dropdownItemBuild(this.props.options) });
  }

  render(): React.ReactNode {
    return (
      <>
        <div className="dropdown">
          <input id="select-dropdown" className="form-control" onInput={(event) => this._onInput(event)}
            onFocus={(event) => this._onFocus(event)} onBlur={(event) => this._onBlur(event)}
            data-bs-toggle="dropdown" placeholder={this.props.placeholder} aria-expanded="false"
          />
          <ul className="dropdown-menu" style={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
            {this.state.dropdown_items}
          </ul>
        </div>
      </>
    )
  }

  private _autoComplete(label: string, value: string | number): void {
    const inputValue = document.getElementById('select-dropdown') as HTMLInputElement;
    inputValue.value = label;
    if (this.props.selected) this.props.selected(value);
  }

  private _onFocus(event: React.FocusEvent<HTMLInputElement>): void {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownEle = document.getElementById('select-dropdown') as HTMLElement;
    setTimeout(() => {
      if (!dropdownMenu?.classList.contains('show')) Dropdown.getOrCreateInstance(dropdownEle).show();
    }, 200);
  }

  private _onBlur(event: React.FocusEvent<HTMLInputElement>) {
    // const dropdownEle = document.getElementById('select-dropdown') as HTMLElement;
    // Dropdown.getOrCreateInstance(dropdownEle).hide();
  }

  private _onInput(event: React.FormEvent<HTMLInputElement>): void {
    let input_value = event.currentTarget.value;
    let options = this.props.options.filter(x => x.label.indexOf(input_value) !== -1);
    this.setState({ dropdown_items: this._dropdownItemBuild(options) });
  }

  private _dropdownItemBuild(options: Options): React.ReactNode {
    if (options.length === 0) return <li><a className="dropdown-item">查无此企业</a></li>
    return options.map((x, index) => (
      <li key={x.label + index}><a className="dropdown-item" onClick={() => {this._autoComplete(x.label, x.value)}}>{x.label}</a></li>
    ));
  }
}
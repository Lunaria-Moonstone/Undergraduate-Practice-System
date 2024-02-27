'use client'

import React, { FormEvent } from "react";
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

export default class Select extends React.Component<SelectProps> {

  private dropdown_items: React.ReactNode;

  constructor(props: SelectProps) {
    super(props);
  }

  componentDidUpdate(prevProps: Readonly<SelectProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.options !== prevProps.options) this.dropdown_items = Select._dropdownItemBuild(this.props.options);
  }

  render(): React.ReactNode {
    return (
      <>
        <div className="dropdown">
          <input className="form-control dropdown-toggle" onInput={(event) => this._onInput(event)} data-bs-toggle="dropdown" placeholder={this.props.placeholder} aria-expanded="false" />
          <ul className="dropdown-menu" style={{ width: '100%' }}>
            {this.dropdown_items}
          </ul>
        </div>
      </>
    )
  }

  private _onInput(event: FormEvent<HTMLInputElement>): void {
    let input_value = event.currentTarget.value;
    let options = this.props.options.filter(x => x.label.indexOf(input_value) !== -1);
    this.dropdown_items = Select._dropdownItemBuild(options);
  }

  private static _dropdownItemBuild(options: Options): React.ReactNode {
    if (options.length === 0) return <li><a className="dropdown-item">查无此企业</a></li>
    return options.map(x => (
      <li key={x.label}><a className="dropdown-item" style={{ width: '100%' }}>{x.label}</a></li>
    ));
  }
}
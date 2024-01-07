
import { ReactNode } from 'react';

import { FormItems, FormItem } from '@/global/type';
import './form.component.css';

export default function Form(props: any) {
  const {
    form_items, form_id
  }: {
    form_items: FormItems, form_id: string
  } = props;
  const input_group: ReactNode = form_items.map((x, index) => {
    if (x.type === 'select' && x.selectOpt) {
      var select_opts: ReactNode = x.selectOpt.map((y, sub_index) => {
        return (
          <option key={sub_index} value={y.value}>{y.label}</option>
        );
      })
    }
    if (x.type === 'input')
      return (
        <div className="mb-3" key={index}>
          <label className="form-label">{x.label}</label>
          <input className="form-control" placeholder={x.label} type={ x.isPassword ? 'password' : 'text' }/>
        </div>
      );
    else if (x.type === 'textarea')
      return (
        <div className="mb-3" key={index}>
          <label className="form-label">{x.label}</label>
          <textarea className="form-control" placeholder={x.label} />
        </div>
      );
    else if (x.type === 'select')
      return (
        <div className="mb-3" key={index}>
          <label className="form-label">{x.label}</label>
          <select defaultValue={undefined} className="form-select" >
            <option value={undefined}>请选择</option>
            {select_opts}
          </select>
        </div>
      )
    else if (x.type === 'checked')
      return (
        <div className="mb-3" key={index}>
          <label className="form-label">{x.label}</label>
          <input className="form-check-input" type="checkbox" />
        </div>
      )
    return (
      <div key={index}></div>
    )
  })

  return (
    <>
      <form id={form_id}>
        {input_group}
      </form>
    </>
  )
}
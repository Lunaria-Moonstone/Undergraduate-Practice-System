'use client'

import React from "react";
import { Dropdown } from "bootstrap";

// import "./select-with-search.component.css";

// export default function Select(props: any) {
//   const {
//     opts,
//     placeholder,
//     component_id,
//   }: {
//     opts: { label: string, value: string | number }[],
//     placeholder: string,
//     component_id: string
//   } = props;

//   const opts_ref = useRef(opts);
//   const [input_value, changeInputValue] = useState<(string | number | undefined)[]>(['', '']) // 0位为显示标签，1位为实际值

//   useEffect(() => { 
//     opts_ref.current = opts;
//     // console.log(opts_ref.current);
//   }, [opts])

//   const dropdownMenuBuild = (filter?: string) => {
//     // console.log(opts_ref.current);
//     const filtered = opts_ref.current.filter(x => { return x.label.indexOf(filter ? filter : '') != -1 });
//     // console.log(filter, filtered);
//     const builded = filtered.map((x, index) => {
//       return (
//         <li key={index}><a className="dropdown-item" style={{ cursor: 'pointer' }} i-value={x.value} onClick={() => changeInputValue([x.label, x.value])}>{x.label}</a></li>
//       )
//     });
//     return builded;
//   };
//   const [dropdown_items, changeDropdownItems] = useState(dropdownMenuBuild(''));

//   const inputSearch = () => {
//     const search_input = (document.getElementById(component_id + '-input') as HTMLInputElement).value;
//     changeInputValue([search_input, undefined])
//     const filtered = dropdownMenuBuild(search_input);
//     if (filtered.length === 0) changeDropdownItems([<li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><a>未找到相关结果</a></li>])
//     else changeDropdownItems(filtered);
//   }

//   // const [dropdown_icon, changeDropdownIcon] = useState(
//   //   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
//   //     <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
//   //   </svg>
//   // );
//   // const dropdownChange = (state: boolean) => {
//   //   const dropdownMenu = document.querySelector('.dropdown-menu');
//   //   const selectInput = document.getElementById(component_id + '-input');
    
//   //   if (state) { // 如果激活输入框（获得焦点）
//   //     changeDropdownIcon(
//   //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
//   //         <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
//   //       </svg>
//   //     );
//   //     setTimeout(() => {
//   //       if (!dropdownMenu?.classList.contains('show')) selectInput?.click();
//   //     }, 300);
//   //   } else { // 输入框失去焦点
//   //     changeDropdownIcon(
//   //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
//   //         <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
//   //       </svg>
//   //     );
//   //     // dropdownMenu?.classList.remove('show');
//   //   }
//   // }

//   return (
//     <>
//       <div className="dropdown" id={component_id + '-dropdown'}>
//         {/* <input type="text" className="form-control dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" placeholder={placeholder}/> */}
//         <div className="input-group mb-3" data-bs-toggle="dropdown" aria-expanded="false">
//         {/* <div className="input-group mb-3"> */}
//           <input id={component_id + '-input'} type="text" className="form-control" placeholder={placeholder} aria-label="Username" aria-describedby="icon-for-select" onInput={inputSearch} value={input_value[0]} 
//             // onFocus={() => dropdownChange(true)} onBlur={() => dropdownChange(false)} 
//           />
//           {/* <span className="input-group-text" id="icon-for-select">
//             {dropdown_icon}
//           </span> */}
//         </div>
//         <ul className="dropdown-menu" id={component_id + '-dropdown-menu'} style={{ width: '100%' }}>
//           {dropdown_items}
//         </ul>
//       </div>
//     </>
//   )
// }
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
        <input data-bs-toggle="dropdown" className="form-control dropdown-toggle" placeholder={this.props.placeholder}/>
        <ul className="dropdown-menu">
          {this.dropdown_items}
        </ul>
      </>
    )
  }

  private static _dropdownItemBuild(options: Options): React.ReactNode {
    return options.map(x => (
      <li key={x.label}><a className="dropdown-item">{x.label}</a></li>
    ));
  }
}
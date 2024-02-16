export function formInput(form_ele: HTMLElement): Array<string | number | boolean | undefined> {
  let form_value: Array<string | number | boolean | undefined> = [];
  for (let child of form_ele.children as HTMLCollection) {
    let value = child.lastChild;
    if (value instanceof HTMLInputElement) {
      form_value.push(value.value);
    } else if (value instanceof HTMLSelectElement) {
      form_value.push(value.options[value.selectedIndex].value);
    } else if (value instanceof HTMLTextAreaElement) {
      form_value.push(value.value);
    }
  }
  return form_value;
}

export function ArrayBuffer2Base64(buffer: ArrayBuffer): string {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  for (let len = bytes.byteLength, i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function PhoneCheck(phone: string) {
  return (new RegExp(/^[+]{0,1}[0-9]{1,15}$/)).test(phone);
}

export function MailCheck(mail: string) {
  return (new RegExp(/^[a-zA-Z0-9.-]{1,16}@[a-zA-Z0-9.-]{1,16}$/)).test(mail);
}
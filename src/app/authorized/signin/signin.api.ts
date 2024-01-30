export default {
  authorize(username: string, password: string): number {
    if (username === 'admin' && password === '123456') return 0;
    if (username === 'student' && password === '123456') return 1;
    if (username === 'teacher' && password === '123456') return 2;
    if (username === 'company' && password === '123456') return 3;
    return -1;
  }
}
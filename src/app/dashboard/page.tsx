'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const role = Number(params.get('role') ?? -1);
  if (role === -1) router.replace('/authorized/signin');

  // const setRole = useContext(DashboardLayoutContext);
  // if (setRole === null) throw new Error("setRole is Null");
  
  switch(role) {
    case 0:
      // setRole(0);
      router.replace('/dashboard/admin-home');
      break;
    case 1: 
      // setRole(1);
      router.replace('/dashboard/student-home');
      break;
    case 2:
      // setRole(2);
      router.replace('/dashboard/teacher-home');
      break;
    case 3:
      // setRole(3);
      router.replace('/dashboard/company-home');
      break;
  }

  return (
    <></>
  )
}
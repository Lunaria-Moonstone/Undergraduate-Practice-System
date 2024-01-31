'use client';

import { useRouter } from "next/navigation";
import "./result.part.css";

export default function Layout({ children }: any) {
  const router = useRouter();
  const back = () => {
    router.back();
  }
  return (
    <>
      <div className="resultbox-background">
        <div className="resultbox-area">
          <div className="resultbox">
            <div className="inner-box">
              {children}
              <div>
                <button className="btn btn-primary" onClick={() => back()}>返回</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
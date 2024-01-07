import './authorized.part.css';

export default function Layout({ children }: { children: React.ReactNode}) {

  return (
    <>
      <div className="signbox-background">
        <div className="signbox-area">
          <h2>高校实习服务系统</h2>
          <hr />
          <div className='signbox'>
            { children }
          </div>
        </div>
      </div>
    </>
  );
}
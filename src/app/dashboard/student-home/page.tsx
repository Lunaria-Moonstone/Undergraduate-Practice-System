import './student-home.part.css';

export default function Page() {
  return (
    <>
      <div className="dashboard-base-panel" style={{ height: '100vh' }}>
        <div className="dashboard-model-title">
          <h2>个人中心</h2>
          <hr />
        </div>
        <div className="dashboard-model-body" style={{ display: 'flex', flexDirection: 'row', flex: 1, height: '100%' }}>
          <div style={{ width: '50%', paddingInlineEnd: 'calc(var(--standard-padding-width) / 2)' }}>
            <div className="card" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-title">个人信息</div>
                <div className="student-info-panel">
                  <div>
                    <span>姓名</span>
                    <p>lain</p>
                  </div>
                  <div>
                    <span>学号</span>
                    <p>20044231</p>
                  </div>
                  <div>
                    <span>联系电话</span>
                    <p>110</p>
                  </div>
                  <div>
                    <span>联系邮箱</span>
                    <p>110@outlook.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, paddingInlineStart: 'calc(var(--standard-padding-width))', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* <div className="card" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-title">通知</div>
              </div>
            </div> */}
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="notification-tab" data-bs-toggle="tab" data-bs-target="#notification" type="button" role="tab" aria-controls="profile-msg" aria-selected="true">通知</button>
                <button className="nav-link" id="announcement-tab" data-bs-toggle="tab" data-bs-target="#announcement" type="button" role="tab" aria-controls="account-msg" aria-selected="false">公告</button>
              </div>
            </nav>
            <div className="tab-content student-annex-card-body" id="nav-tabContent" style={{ flex: 1 }}>
              <div className="tab-pane fade show active" id="notification" role="tabpanel" aria-labelledby="notification-tab" style={{ width: '100%', height: '100%' }}>
                <div className="card" style={{ height: '100%', borderTop: '0', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
                  <div className="card-body notification-cards">
                    {/* <div className="card-title">
                      通知
                    </div> */}
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          新的投递进度
                        </h5>
                        <p className='card-text'>
                          您在国家安全局投递的简历有新进展！
                        </p>
                        <div className="notification-inline-btns">
                          <a className='btn btn-primary btn-sm'>详细</a>
                          <a className='btn btn-secondary btn-sm'>忽略</a>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          新的投递进度
                        </h5>
                        <p className='card-text'>
                          您在国家安全局投递的简历有新进展！
                        </p>
                        <div className="notification-inline-btns">
                          <a className='btn btn-primary btn-sm'>详细</a>
                          <a className='btn btn-secondary btn-sm'>忽略</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="announcement" role="tabpanel" aria-labelledby="announcement-tab" style={{ width: '100%', height: '100%' }}>
                <div className="card" style={{ height: '100%', borderTop: '0', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
                <div className="card-body notification-cards">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          企业海天酱油厂进驻
                        </h5>
                        <p className='card-text'>
                          新企业海天酱油厂进驻系统！
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
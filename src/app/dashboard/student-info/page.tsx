import '@/global/global-variable.css';

export default function Page() {
  return (
    <>
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>个人信息设置</h2>
        </div>
        <hr />

        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="profile-msg-tab" data-bs-toggle="tab" data-bs-target="#profile-msg" type="button" role="tab" aria-controls="profile-msg" aria-selected="true">名片信息</button>
            <button className="nav-link" id="account-msg-tab" data-bs-toggle="tab" data-bs-target="#account-msg" type="button" role="tab" aria-controls="account-msg" aria-selected="false">账号信息</button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="profile-msg" role="tabpanel" aria-labelledby="profile-msg-tab" >
            <form id="form-profile" style={{ marginBlockStart: 'var(--standard-padding-width)' }}>
              <div className="mb-3">
                <label className="form-label">编号</label>
                <input className="form-control" placeholder="编号" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">姓名</label>
                <input className="form-control" placeholder="姓名" />
              </div>
              <div className="mb-3">
                <label className="form-label">学号</label>
                <input className="form-control" placeholder="学号" />
              </div>
              <div className="mb-3">
                <label className="form-label">年级</label>
                <input className="form-control" placeholder="年级" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">联系电话</label>
                <input className="form-control" placeholder="联系电话" />
              </div>
              <div className="mb-3">
                <label className="form-label">邮箱</label>
                <input className="form-control" placeholder="邮箱" />
              </div>
              <div className="mb-3">
                <label className="form-label">是否实习中</label>
                <select className="form-select">
                  <option value="1">是</option>
                  <option value="2">否</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">姓名</label>
                <input className="form-control" placeholder="姓名" />
              </div>
            </form>
            <div style={{ width: '100%' }} className="d-grid gap-2">
              <button className="btn btn-primary btn-block">确认修改</button>
            </div>
          </div>

          <div className="tab-pane fade" id="account-msg" role="tabpanel" aria-labelledby="account-msg-tab" >
            <form id="form-account" style={{ marginBlockStart: 'var(--standard-padding-width)' }}>
              <div className="mb-3">
                <label className="form-label">用户名</label>
                <input className="form-control" placeholder="用户名" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">旧密码</label>
                <input className="form-control" placeholder="密码" type="password" />
              </div>
              <div className="mb-3">
                <label className="form-label">新密码</label>
                <input className="form-control" placeholder="密码" type="password" />
              </div>
              <div className="mb-3">
                <label className="form-label">重复新密码</label>
                <input className="form-control" placeholder="密码" type="password" />
              </div>
            </form>
            <div style={{ width: '100%' }} className="d-grid gap-2">
              <button className="btn btn-primary btn-block">确认修改</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
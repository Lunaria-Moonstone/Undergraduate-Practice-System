export default function Page() {
  return (
    <>
      <div className="dashboard-base-panel">
        <div className="dashboard-model-title">
          <h2>个人信息设置</h2>
        </div>
        <hr />
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
    </>
  )
}
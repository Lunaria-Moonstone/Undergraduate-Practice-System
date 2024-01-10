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
            <div className="card" style={{height: '100%'}}>
              <div className="card-body">
                <div className="card-title">个人信息</div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, paddingInlineStart: 'calc(var(--standard-padding-width))' }}>
            <div className="card" style={{height: '100%'}}>
              <div className="card-body">
                <div className="card-title">个人信息</div>
              </div>
            </div></div>
        </div>

      </div>
    </>
  );
}
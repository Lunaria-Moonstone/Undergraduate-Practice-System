import server from './student-annex.api';
import "./student-annex.part.css";

export default function Page() {

  const { resume, practice_document } = server.fetchAnnex()

  return (
    <>
      <div className="dashboard-base-panel">
        {/* 抬头 */}
        <div className="dashboard-model-title">
          <h2>个人材料上传</h2>
          <hr />
        </div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="resume-tab" data-bs-toggle="tab" data-bs-target="#resume" type="button" role="tab" aria-controls="profile-msg" aria-selected="true">简历</button>
            <button className="nav-link" id="practice-document-tab" data-bs-toggle="tab" data-bs-target="#practice-document" type="button" role="tab" aria-controls="account-msg" aria-selected="false">实习材料</button>
          </div>
        </nav>
        <div className="tab-content student-annex-card-body" id="nav-tabContent">
          <div className="tab-pane fade show active" id="resume" role="tabpanel" aria-labelledby="resume-tab" >
            <div className="card" style={{ width: '100%' }}>
              <img src={resume} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">本页面材料具有法律效力</p>
                <a className="btn btn-primary btn-sm">上传新材料</a>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="practice-document" role="tabpanel" aria-labelledby="practice-document-tab" >
            <div className="card" style={{ width: '100%' }}>
              <img src={practice_document} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">本页面材料具有法律效力</p>
                <a className="btn btn-primary btn-sm">上传新材料</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
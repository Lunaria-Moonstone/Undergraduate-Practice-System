INSERT INTO 
	`annex_history` 
VALUE (
	'8qdq3MN5Lw0id1PU_yct3',
	'resume',
	'1234',
	'2004-01-01 18:00:00'
);

INSERT INTO
	`user`
VALUE (
	'admin',
	'admin',
	'123456',
	0,
	'admin'
);

INSERT INTO
	`user`
VALUE (
	'student',
	'student',
	'123456',
	1,
	'y4z7CZcMRgWwk_vCevWkL'
);

SELECT * FROM `user` WHERE `name`='admin' AND `password`='123456';

SELECT * FROM `annex_history` WHERE `id` IN (
	"rIxefhckkJiESq3vNsTjK","ufByXai_xV2r9a1Nfmndn","0gKBCh2WMaHlrotpD1fge"
) AND `type`="resume";

DESC `job_audit`;

INSERT INTO `job_audit` (
	id, student_id, company_id, job_id, 
	progress, feedback, `resume`
) 
SELECT 
	'first_try' AS id, 
	'y4z7CZcMRgWwk_vCevWkL' AS student_id, 
	j.company_id AS company_id, 
	j.id AS job_id,
	'未读' AS progress,
	'暂无回复' AS feedback,
	'GtkVucGzZXuGGa5_6rTHt' AS `resume`
FROM `job` j
WHERE j.id='MoIujuuUGiTmcVxcl6CSp' LIMIT 1;

SELECT c.name AS company_name, j.* FROM `job` j 
LEFT JOIN `company` c ON c.id=j.company_id
WHERE j.id NOT IN (
	SELECT job_id FROM `job_audit` WHERE student_id='y4z7CZcMRgWwk_vCevWkL'
)

UPDATE student SET score=-1 WHERE id='y4z7CZcMRgWwk_vCevWkL';
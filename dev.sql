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
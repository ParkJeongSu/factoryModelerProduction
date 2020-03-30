﻿--DROP TABLE 테이블명 CASCADE CONSTRAINT;


-- Create FM_MENU 
CREATE TABLE FM_MENU
(
   MENUID              NUMBER NOT NULL,
   MENUNAME            VARCHAR2 (40),
   ISROOT              VARCHAR2 (1),
   POSITION            NUMBER,
   MENUTYPE            VARCHAR2 (40),
   PARENTMENUID        NUMBER,
   FM_METADATA         VARCHAR2 (40),
   FM_POLICYMETADATA   VARCHAR2 (40),
   ADMINFLAG           VARCHAR2 (1)
);

ALTER TABLE FM_MENU ADD CONSTRAINT PK_FM_MENU PRIMARY KEY(MENUID);


-- Create FM_METADATA
DROP TABLE FM_METADATA CASCADE CONSTRAINT;

CREATE TABLE FM_METADATA
(
   TABLENAME     VARCHAR2 (40),
   COLUMNNAME    VARCHAR2 (40),
   COLUMNORDER   NUMBER,
   ISKEY         VARCHAR2 (1),
   DATATYPE      VARCHAR2 (40),
   ISREQUIRED    VARCHAR2 (1),
   INPUTTYPE     VARCHAR2 (40),
   SELECTQUERY   VARCHAR2 (2000),
   PARIENTCOLUMNNAME VARCHAR2 (40)
);

ALTER TABLE FM_METADATA ADD CONSTRAINT PK_FM_METADATA PRIMARY KEY(TABLENAME,COLUMNNAME,COLUMNORDER);


CREATE TABLE FM_CREATE_CONSTRAINT
(
   TABLENAME           VARCHAR2(40),
   VALIDATIONQUERY     VARCHAR2 (2000),
   MESSAGE             VARCHAR2 (2000)
);


CREATE TABLE FM_UPDATE_CONSTRAINT
(
   TABLENAME           VARCHAR2(40),
   VALIDATIONQUERY     VARCHAR2 (2000),
   MESSAGE             VARCHAR2 (2000)
);


CREATE TABLE FM_DELETE_CONSTRAINT
(
   TABLENAME           VARCHAR2(40),
   VALIDATIONQUERY     VARCHAR2 (2000),
   MESSAGE             VARCHAR2 (2000)
);


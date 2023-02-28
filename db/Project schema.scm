create table rpa.processes(
	process_name varchar(30),
	package_name varchar(30) not null,
	package_version varchar(30) not null,
	process_priority varchar(10),
	process_id int unique not null,
	constraint processes_pk primary key (process_name)
);

create table rpa.machines(
	machine_name varchar(30),
	machine_type varchar(20),
	constraint machines_pk primary key (machine_name),
	user_no int unique,
	constraint machine_user_fk foreign key (user_no)
	references rpa.users(user_no)
);

create table rpa.assets(
	asset_name varchar(30) not null,
	asset_type varchar(20) not null,
	constraint asset_pk primary key (asset_name),
	process_id int unique not null,
	constraint process_asset_fk foreign key (process_id)
	references rpa.processes(process_id)
);

//--------------------------------------------------------------------------------------------------------------
SCHEMAS USED BY ABDO:

create table robots(
	id serial primary key not null,
	standard boolean not null,
	attended boolean not null,
	name text not null,
	user_id int not null,
	constraint user_id foreign key (user_id)
	references users(id)
);
//fk named user

create table users(
	id serial primary key not null,
	name varchar(20) not null,
	email varchar(30) not null,
	password varchar(30) not null,
);
name unique constraint
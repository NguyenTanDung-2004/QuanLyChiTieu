create database cnpm 
use cnpm 
create table project (
	project_id int not null primary key,
	name nvarchar(max),
	max_money float,
	end_date smalldatetime
)
create table [user](
	user_id int not null primary key,
	name nvarchar(max),
	email nvarchar(max),
	password nvarchar(max),
	img nvarchar(max)
)
create table user_project(
	user_id int not null,
	project_id int not null,
	constraint pk_user_project primary key (user_id, project_id),
	constraint fk_user_id_in_user_project foreign key (user_id) references [user](user_id),
	constraint fk_project_id_in_user_project foreign key (project_id) references project(project_id)
)
 create table parent_item(
	parent_item_id int not null primary key,
	name nvarchar(max)
 )
 create table user_parent_item(
	user_id int not null,
	project_id int not null,
	parent_item_id int not null,
	current_total_money float, -- cái này là tổng tiền hiện tại của cái parent_item nằm trong dự án đó của user đó.
	max_money float,
	constraint pk_user_parent_item primary key (user_id, project_id, parent_item_id),
	constraint fk_user_id_in_user_parent_item foreign key (user_id) references [user](user_id),
	constraint fk_project_id_in_user_parent_item foreign key (project_id) references project(project_id),
	constraint fk_parent_item_id_in_user_parent_item foreign key (parent_item_id) references parent_item(parent_item_id),
 )
 create table item (
	item_id int not null primary key,
	info nvarchar(max),
	money float,
	date smalldatetime,
	parent_item_id int,
	constraint fk_parent_item_id_in_item foreign key (parent_item_id) references parent_item(parent_item_id)
 )
create table user_item(
	user_id int not null,
	project_id int not null,
	item_id int not null,
	constraint pk_user_item primary key (user_id, project_id, item_id),
	constraint fk_user_id_in_user_item foreign key (user_id) references [user](user_id),
	constraint fk_project_id_in_user_item foreign key (project_id) references project(project_id),
	constraint fk_project_id_in_item_id foreign key (item_id) references item(item_id)
)
create table post(
	post_id int not null primary key,
	content nvarchar(max),
	user_id int,
	date smalldatetime,
	numebr_of_likes int,
	constraint fk_user_id_in_post foreign key (user_id) references [user](user_id)
)
create table comment(
	comment_id int not null primary key,
	post_id int,
	content nvarchar(max),
	date smalldatetime,
	user_id int,
	parent_user_id int -- cái id này là cái id mà thằng comment nó trả lời, nếu nó comment mà không tag ai thì có nghĩa là null
	constraint fk_user_id_in_comment foreign key (user_id) references [user](user_id),
	constraint fk_user_id_in_comment1 foreign key (parent_user_id) references [user](user_id)
)
create table user_like_post_or_comment(
	user_id int not null,
	post_id int not null, -- nếu như user_id like post thì nhét cái post_id voo ddaay
	comment_id int not null, -- nếu như user_id like cái comment thì nhét cái comment_id vô đây.
)

-- add data cho parent item
insert into parent_item (parent_item_id, name) values 
(0, 'Eating'),
(1, 'Study'),
(2, 'Moving'),
(3, 'Shopping'),
(4, 'Entertainment'),
(5, 'Friends'),
(6, 'Family'),
(7, 'Home'),
(8, 'Travel'),
(9, 'Work'),
(10, 'Health'),
(11, 'Others')

-- update project table 
alter table project 
add from_date smalldatetime

-- update project table 
alter table project 
add current_money float

-- update table item 
alter table item 
add type nvarchar(max) -- cái này nếu là "add" thì tổng tiền tăng lên, nếu là "subtract" thì tổng tiền giảm xuống.


-- create table notify 
create table notify(
	user_id int not null primary key, -- 1
	others_user_id nvarchar(max), -- (30 11 20 30 40)
	flag int, -- (1) or (0) -- nếu là 1 thì có nghĩa là chưa xem, nếu là 0 là xem rồi.
);
drop table notify;
-- sửa thành 
create table notify(
	user_id int not null, -- 1
	others_user_id int, -- (30)
	date smalldatetime not null,
	flag int, -- (1) or (0) -- nếu là 1 thì có nghĩa là chưa xem, nếu là 0 là xem rồi.
	primary key(user_id, others_user_id, date)
)
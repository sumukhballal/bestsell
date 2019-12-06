
create table brand (brand_id int not null auto_increment, name varchar(200) not null,email varchar(200) not null, description varchar(1000), primary key (brand_id));

insert into brand(name,email,description) values('Samsung','samsungordersupport@samsung.com','Samsung - Major korean retailer');
insert into brand(name,email,description) values('Apple','appleordersupport@apple.com','Apple - Major American retailer');
insert into brand(name,email,description) values('Asus','asusordersupport@samsung.com','Asus - Major korean retailer');
insert into brand(name,email,description) values('HP','hpordersupport@samsung.com','HP - Major korean retailer');

#insert into category() values();
drop table category;

CREATE TABLE `category` (
  `category_id`   INT            NOT NULL  AUTO_INCREMENT,
  `name`          VARCHAR(100)   NOT NULL,
  `description`   VARCHAR(1000),
  PRIMARY KEY (`category_id`)
);


INSERT INTO `category` (`category_id`,`name`, `description`) VALUES
       ( 1,'Mobiles',' Mobiles - ALL'),
       ( 2,'Cameras','Cameras - ALL'),
       ( 3,'Laptops', 'Laptops - ALL'),
       ( 4,'Tablets','Tablets - ALL'),
       ( 5,'Telvisions','Telvisions - ALL');


INSERT INTO `category` (`brand_id`, `name`, `description`) VALUES
       (1, 'Mobiles', 'Every Mobile here.'),
       (2, 'Televisions', ''),
       (3, 'Laptops', ''),
       (4, 'Tablets', ''),
       (5, 'Cameras', '');

drop table product;
#alter table product add brand_id int not null after product_id,add foreign key(brand_id) references brand(brand_id);
    
CREATE TABLE `product` (
  `product_id`       INT           NOT NULL  AUTO_INCREMENT,
  `brand_id` INT NOT NULL,
  `name`             VARCHAR(100)  NOT NULL,
  `description`      VARCHAR(1000) NOT NULL,
  `price`            DECIMAL(10,2) NOT NULL,
  `discounted_price` DECIMAL(10,2) NOT NULL  DEFAULT '0.00',
  `image`            VARCHAR(150),
  `image_2`          VARCHAR(150),
  `thumbnail`        VARCHAR(150),
  `display`          SMALLINT(6)   NOT NULL  DEFAULT '0',
  PRIMARY KEY  (`product_id`),
  foreign key (brand_id) references brand(brand_id)
);
select * from brand;
select * from category;

SELECT 
                        P.product_id AS 'ProductId',
                        P.name AS 'Name',
                        P.description AS 'Description',
                        P.price AS 'Price',
                        P.discounted_price AS 'DescountedPrice',
                        P.image AS 'PrimaryImage',
                        P.image_2 AS 'SecondaryImage',
                        P.thumbnail AS 'Thumbnail',
                        P.display AS 'Display'
                    FROM 
                        product P, 
                        brand B
                        where
                        B.brand_id=P.brand_id and
                        P.product_id = 1;

#delete from product p where p.product_id=1;
Insert into product values(1,2,"Iphone","Iphone 10",700,695,'iphone.gif','iphone.gif','iphone.gif',0);
select * from product p,brand b;
SELECT 
        P.product_id AS 'ProductId',
        P.name AS 'Name',
        P.description AS 'Description',
        P.price AS 'Price',
        P.discounted_price AS 'DescountedPrice',
        P.image AS 'PrimaryImage',
        P.image_2 AS 'SecondaryImage',
        P.thumbnail AS 'Thumbnail',
        P.display AS 'Display'
        from Product P;
select * from product;
select * from brand;

update product set brand_id=2 where product_id=5 or product_id=9 or product_id=13 or product_id=17;
Insert into product values(1,1,"Macbook","Macbook",1000,900,'apple-laptop.gif','apple-laptop.gif','apple-laptop.gif',0);
Insert into product values(2,2,"Notebook","notebook",900,850,'samsung-laptop.gif','samsung-laptop.gif','samsung-laptop.gif',0);
Insert into product values(3,3,"Zenbook","Zenbook",850,800,'asus-laptop.gif','asus-laptop.gif','asus-laptop.gif',0);
Insert into product values(4,4,"Pavillion","Pavillion",850,820,'hp-laptop.gif','hp-laptop.gif','hp-laptop.gif',0);

Insert into product values(5,1,"Iphone","Iphone",700,695,'mobile-apple_gif.gif','mobile-apple_gif.gif','mobile-apple_gif.gif',0);
Insert into product values(6,2,"Galaxy","Galaxy",900,750,'mobile-samsung-gif.gif','mobile-samsung-gif.gif','mobile-samsung-gif.gif',0);
Insert into product values(7,3,"Zenfone","Zenfone",600,565,'mobile_asus_gif.gif','mobile_asus_gif.gif','mobile_asus_gif.gif',0);
Insert into product values(8,4,"Elite X","Elite X",600,550,'mobile_hp_gif.gif','mobile_hp_gif.gif','mobile_hp_gif.gif',0);

Insert into product values(9,1,"Icam","Icam",1400,1350,'camera_apple_gif.gif','camera_apple_gif.gif','camera_apple_gif.gif',0);
Insert into product values(10,2,"Galaxy-Camera","Galaxy-Camera",1200,1100,'camera-samsung_gif.gif','camera-samsung_gif.gif','camera-samsung_gif.gif',0);
Insert into product values(11,3,"Xtion","Xtion",1000,900,'camera-asus_gif.gif','camera-asus_gif.gif','camera-asus_gif.gif',0);
Insert into product values(12,4,"Photosmart","Photosmart",1000,900,'camera_hp_gif.gif','camera_hp_gif.gif','camera_hp_gif.gif',0);

Insert into product values(13,1,"AppleTv","AppleTv",2000,1800,'tele_apple_gif.gif','tele_apple_gif.gif','tele_apple_gif.gif',0);
Insert into product values(14,2,"UHD 4K","UHD 4K",1900,1850,'tele_samsung_gif.gif','tele_samsung_gif.gif','tele_samsung_gif.gif',0);
Insert into product values(15,3,"Nexus","Nexus",1700,1650,'tele_asus_gif.gif','tele_asus_gif.gif','tele_asus_gif.gif',0);
Insert into product values(16,4,"Omen X Emperium","Omen X Emperium",2000,1950,'tele_hp_gif.gif','tele_hp_gif.gif','tele_hp_gif.gif',0);

Insert into product values(17,1,"Ipad","Ipad",500,400,'tablet_apple_gif.gif','tablet_apple_gif.gif','tablet_apple_gif.gif',0);
Insert into product values(18,2,"Galaxy-tab","Galaxy-tab",400,300,'tablet-samsung_gif.gif','tablet-samsung_gif.gif','tablet-samsung_gif.gif',0);
Insert into product values(19,3,"Transformer-Prime","Transformer-Prime",300,200,'tablet-asus_gif.gif','tablet-asus_gif.gif','tablet-asus_gif.gif',0);
Insert into product values(20,4,"Touchpad","Touchpad",350,250,'tablet_hp-gif.gif','tablet_hp-gif.gif','tablet_hp-gif.gif',0);
-- Create product_category table
-- Drop the table First -- 
CREATE TABLE `product_category` (
  `product_id`  INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `category_id`),
  foreign key(product_id) references product(product_id),
  foreign key(category_id) references category(category_id)
);

Insert into product_category values(1,3) ;
Insert into product_category values(2,3) ;
Insert into product_category values(3,3) ;
Insert into product_category values(4,3) ;
							 	  
Insert into product_category values(5,1) ;
Insert into product_category values(6,1) ;
Insert into product_category values(7,1) ;
Insert into product_category values(8,1) ;
							 	  
Insert into product_category values(9,2) ;
Insert into product_category values(10,2);
Insert into product_category values(11,2);
Insert into product_category values(12,2);
							 	  
Insert into product_category values(13,5);
Insert into product_category values(14,5);
Insert into product_category values(15,5);
Insert into product_category values(16,5);
							 	  
Insert into product_category values(17,4);
Insert into product_category values(18,4);
Insert into product_category values(19,4);
Insert into product_category values(20,4);

delete from brand where brand_id=1;
select p.name,b.name,c.name from product as p,product_category as pc,category as c,brand as b where 
pc.product_id=p.product_id and 
pc.category_id=c.category_id and 
p.brand_id=b.brand_id;


select * from product_category;
select * from category;
select * from customer;

SELECT 
                        P.product_id AS 'ProductId',
                        P.name AS 'Name',
                        P.description AS 'Description',
                        P.price AS 'Price',
                        P.discounted_price AS 'DescountedPrice',
                        P.image AS 'PrimaryImage',
                        P.image_2 AS 'SecondaryImage',
                        P.thumbnail AS 'Thumbnail',
                        P.display AS 'Display',
                        C.category_id AS 'CategoryId',
                        C.name AS 'CategoryName'
                    FROM product P, category C, brand B, product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id
                        AND P.brand_id=B.brand_id;
                        
insert into orders(order_id,total_amount,created_on,customer_id) values(2,900,curdate(),1);

alter table customer add fname varchar(40) NOT NULL after name;
alter table customer modify lname varchar(40) NOT NULL after fname;
alter table customer drop name;
update customer set fname="Sumukh" where customer_id=1;
update customer set fname="BAllal" where customer_id=1;
ALTER TABLE customer ENGINE=InnoDB;
ALTER TABLE orders ENGINE=InnoDB;
create table payment(payment_id int not null auto_increment, amount int, payment_type varchar(100),card_id int, order_id int,primary key(payment_id),foreign key(card_id) references card_details(card_id), foreign key(order_id) references orders(order_id));
create table card_details(card_id int auto_increment, card_number varchar(100), cvv int, expiry_month int, expiry_year int, customer_id int, primary key(card_id),foreign key(customer_id) references customer(customer_id));
select * from customer;
insert into shipping values(8,"Free Delivery",0,1);

select * from order_detail;

alter table order_detail drop attributes; 
alter table order_detail drop unit_cost;
alter table order_detail drop product_name;
alter table order_detail drop item_id;
alter table order_detail ADD primary key(order_id,product_id),ADD foreign key(order_id) references orders(order_id), ADD foreign key(product_id) references product(product_id);


select * from orders o ,customer c where c.customer_id=o.customer_id; 

select * from orders;
create table store(store_id int auto_increment not null,name varchar(100),address varchar(100),primary key(store_id));
alter table store add column city varchar(100);
alter table orders add column store_id int, add foreign key(store_id) references store(store_id);
alter table orders drop column reference,drop column tax_id,drop column auth_code;
alter table orders drop column shipped_on;
update orders set store_id=1 where store_id is null;
insert into store values(2,'Bronx BestSell','500 East Bronx','New York'),(3,'Loop BestSell','3440 Loop','Chicago');

rename table shipping to shipping_type;
rename table shopping_cart to cart;
select * from cart;
alter table cart drop column attributes,drop column buy_now,add column customer_id int,modify cart_id int not null auto_increment, add primary key(cart_id),add foreign key(customer_id) references customer(customer_id);
alter table cart drop column product_id;
alter table cart ENGINE=InnoDB;
alter table shipping_type ENGINE=InnoDB;

alter table product add column cart_id int,add foreign key(cart_id) references cart(cart_id);
select * from shipping;
alter table shipping_type change `shipping_id` `shipping_type_id` int;

create table shipping(shipping_id int auto_increment not null, shipping_type_id int, delivery_date varchar(100),primary key(shipping_id),foreign key(shipping_type_id) references shipping_type(shipping_type_id));
alter table shipping add column shipper_id int, add foreign key(shipper_id) references shipper(shipper_id),add column order_id int, add foreign key(order_id) references orders(order_id);
create table shipper(shipper_id int auto_increment not null, name varchar(100),primary key(shipper_id));
alter table shipping add column status int;


alter table order_detail add foreign key(order_id) references orders(order_id);
alter table order_detail add foreign key(product_id) references product(product_id);
alter table cart add foreign key(customer_id) references customer(customer_id);
alter table shipping_type add foreign key(shipping_region_id) references shipping_region(shipping_region_id);

create table inventory(store_id int not null, product_id int not null, current_quantity int not null, primary key(store_id,product_id),foreign key(store_id) references store(store_id), foreign key(product_id) references product(product_id));

insert into card_details values(1,"4200620072008200",345,12,2021,1);

select * from card_details;
select card_id as 'cardId',
        card_number as 'cardNumber',
        expiry_month as 'expiryMonth',
        expiry_year as 'expiryYear',
        cvv as 'cvv'
        from card_details 
        where customer_id=1;
        select * from category;
        select * from product_category;
        select * from orders;
select o.order_id,p.name,od.quantity,p.price,b.name,c.name from product p,product_category pc,orders o,order_detail od,brand b,category c where o.order_id=od.order_id and p.product_id=od.product_id and b.brand_id=p.brand_id and c.category_id=pc.category_id and pc.product_id=p.product_id and o.customer_id=1 and o.order_id=7;

alter table product drop foreign key product_ibfk_2;
alter table cart_details add primary key(cart_id,product_id);

create table cart_details(cart_id int not null,product_id int not null, primary key(cart_id,product_id),foreign key(cart_id) references cart(cart_id), foreign key(product_id) references product(product_id));

SELECT * FROM bestsell.card_details;

select * from card_details;

select o.order_id as "OrderID",
    p.product_id as"ProductID",
    p.name as "ProductName",
    od.quantity as "Quantity",
    p.price as "Price",
    b.name as "BrandName",
    c.name  as "CategoryName"
    from product p,product_category pc,orders o,order_detail od,brand b,category c 
    where o.order_id=od.order_id 
    and p.product_id=od.product_id 
    and b.brand_id=p.brand_id 
    and c.category_id=pc.category_id 
    and pc.product_id=p.product_id 
    and o.customer_id=1 and o.order_id=7;
    
    select * from customer;
    
    
    
    alter table customer drop column eve_phone;
    
    select * from store;
    
   select * from card_details;
    select * from order_detail;
    
    alter table card_details modify column credit_used integer after card_number;
    update card_details
    set credit_limit=10000
    where card_id=1;
    
    update store
    set address="Warehouse", city="Warehouse"
    where store_id=1;
    
    select * from orders o;
    
    select * from shipping;
    select * from shipping_type;
    select * from shipper;
    insert into shipper values(1,"FedEx");
	update orders set status=0 where order_id=133459;
    update orders set status=0 where order_id=133458;
insert into shipper values(3,"USPS");
select * from orders;
select * from shipping;
insert into shipping(shipping_type_id,delivery_date,shipper_id,order_id,status) values(8,"2019/12/6",1,10,1);

select * from orders o, order_detail od where o.order_id=od.order_id;
insert into order_detail values(13,1,1);
select * from order_detail;
  SELECT s.sh
                        s.shipping_region_id AS 'RegionId',
                        s.shipping_region AS 'Region'
                    FROM shipping s,shipper sh,shipping_type st
                    where s.shipper_id=sh.shipper_id and st.shipping_type_id=s.shipping_type_id
                    and s.order_id=133459;
    select s.name,p.name,b.name,c.name,i.current_quantity from inventory i,product p,store s,brand b,product_category pc,category c where s.store_id=i.store_id and i.product_id=p.product_id
    and p.brand_id=b.brand_id and pc.category_id=c.category_id and pc.product_id=p.product_id;
    
    select * from product_category;
select * from orders;
select * from shipping;

select * from customer;

select * from card_details;
SELECT 
                    s.shipping_id as 'ShippingId',
                    st.shipping_type as 'ShippingType',
                    sh.name as 'ShipperName',
                    sh.delivery_date as 'DeliveryDate',
                    s.status as 'Status'
                    FROM shipping s,shipper sh,shipping_type st
                    where 
                    s.shipper_id=sh.shipper_id and 
                    st.shipping_type_id=s.shipping_type_id
                    and s.order_id=133459;

select * from shipping s, shipping_type st,shipper sh where s.shipping_type_id=st.shipping_type_id and s.shipper_id=sh.shipper_id;
insert into inventory(store_id,current_quantity,product_id) values(2,59,1);
insert into inventory(store_id,current_quantity,product_id) values(2,24,2 );
insert into inventory(store_id,current_quantity,product_id) values(2,78,3 );
insert into inventory(store_id,current_quantity,product_id) values(2,14,4 );
insert into inventory(store_id,current_quantity,product_id) values(2,52,5 );
insert into inventory(store_id,current_quantity,product_id) values(2,88,6 );
insert into inventory(store_id,current_quantity,product_id) values(2,27,7 );
insert into inventory(store_id,current_quantity,product_id) values(2,39,8 );
insert into inventory(store_id,current_quantity,product_id) values(2,45,9 );
insert into inventory(store_id,current_quantity,product_id) values(2,69,10);

insert into inventory(store_id,current_quantity,product_id) values(3,54,1  );
insert into inventory(store_id,current_quantity,product_id) values(3,41,2  );
insert into inventory(store_id,current_quantity,product_id) values(3,76,3  );
insert into inventory(store_id,current_quantity,product_id) values(3,45,4  );
insert into inventory(store_id,current_quantity,product_id) values(3,22,5  );
insert into inventory(store_id,current_quantity,product_id) values(3,26,6  );
insert into inventory(store_id,current_quantity,product_id) values(3,36,7  );
insert into inventory(store_id,current_quantity,product_id) values(3,67,8  );
insert into inventory(store_id,current_quantity,product_id) values(3,79,9  );
insert into inventory(store_id,current_quantity,product_id) values(3,76,10 );

insert into inventory(store_id,product_id,current_quantity) values(1,11,73);
insert into inventory(store_id,product_id,current_quantity) values(1,12,99);
insert into inventory(store_id,product_id,current_quantity) values(1,13,55);
insert into inventory(store_id,product_id,current_quantity) values(1,14,10);
insert into inventory(store_id,product_id,current_quantity) values(1,15,38);
insert into inventory(store_id,product_id,current_quantity) values(1,16,33);
insert into inventory(store_id,product_id,current_quantity) values(1,17,43);
insert into inventory(store_id,product_id,current_quantity) values(1,18,13);
insert into inventory(store_id,product_id,current_quantity) values(1,19,76);
insert into inventory(store_id,product_id,current_quantity) values(1,20,93);

insert into inventory(store_id,product_id,current_quantity) values(2,11,99);
insert into inventory(store_id,product_id,current_quantity) values(2,12,20);
insert into inventory(store_id,product_id,current_quantity) values(2,13,96);
insert into inventory(store_id,product_id,current_quantity) values(2,14,11);
insert into inventory(store_id,product_id,current_quantity) values(2,15,64);
insert into inventory(store_id,product_id,current_quantity) values(2,16,71);
insert into inventory(store_id,product_id,current_quantity) values(2,17,4);
insert into inventory(store_id,product_id,current_quantity) values(2,18,86);
insert into inventory(store_id,product_id,current_quantity) values(2,19,40);
insert into inventory(store_id,product_id,current_quantity) values(2,20,9);

insert into inventory(store_id,product_id,current_quantity) values(3,11,14);
insert into inventory(store_id,product_id,current_quantity) values(3,12,83);
insert into inventory(store_id,product_id,current_quantity) values(3,13,31);
insert into inventory(store_id,product_id,current_quantity) values(3,14,13);
insert into inventory(store_id,product_id,current_quantity) values(3,15,58);
insert into inventory(store_id,product_id,current_quantity) values(3,16,49);
insert into inventory(store_id,product_id,current_quantity) values(3,17,61);
insert into inventory(store_id,product_id,current_quantity) values(3,18,99);
insert into inventory(store_id,product_id,current_quantity) values(3,19,86);
insert into inventory(store_id,product_id,current_quantity) values(3,20,83);
    select product_id from product order by product_id asc;
    
    select * from store;
    
    update customer c
    set c.frequentCustomer=true
    where customer_id=1;
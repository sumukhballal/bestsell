
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
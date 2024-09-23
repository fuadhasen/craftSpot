INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES
(1, 'John Doe', 'john@example.com', '$2b$12$Cg9W9/qtRsEebZfmmEkwPuMTF9VZy1u5b63TleUwFkLYDpuGo9fA.', now(), now()),
(2, 'Jane Smith', 'jane@example.com', '$2b$12$Cg9W9/qtRsEebZfmmEkwPuMTF9VZy1u5b63TleUwFkLYDpuGo9fA.', now(), now()),
(3, 'Alice Johnson', 'alice@example.com', '$2b$12$Cg9W9/qtRsEebZfmmEkwPuMTF9VZy1u5b63TleUwFkLYDpuGo9fA.', now(), now()),
(4, 'Bob Brown', 'bob@example.com', '$2b$12$Cg9W9/qtRsEebZfmmEkwPuMTF9VZy1u5b63TleUwFkLYDpuGo9fA.', now(), now()),
(5, 'Charlie Black', 'charlie@example.com', '$2b$12$Cg9W9/qtRsEebZfmmEkwPuMTF9VZy1u5b63TleUwFkLYDpuGo9fA.', now(), now());


INSERT INTO profiles (id, bio, picture, addresse, phone, user_id) VALUES
(1, 'Loves to fix things', 'profile_pic_1.jpg', '123 Main St', '123-456-7890', 1),
(2, 'Expert in carpentry', 'profile_pic_2.jpg', '456 Oak St', '987-654-3210', 2),
(3, 'Electrical wizard', 'profile_pic_3.jpg', '789 Pine St', '555-555-5555', 3),
(4, 'Master plumber', 'profile_pic_4.jpg', '321 Cedar St', '666-666-6666', 4),
(5, 'Tech enthusiast', 'profile_pic_5.jpg', '654 Maple St', '777-777-7777', 5);


INSERT INTO services (id, name, type, image, description, pricing,location, latitude, longitude, available, created_at, updated_at, user_id) VALUES
(1, 'Plumbing', 'home repair', 'service_image_1.jpg', 'Fixes pipes and leaks', 150.00 ,'New York', 40.7128, -74.0060, true, now(), now(), 1),
(2, 'Carpentry', 'woodwork', 'service_image_2.jpg', 'Builds and repairs wooden structures', 220.00,'San Francisco', 37.7749, -122.4194, true, now(), now(), 2),
(3, 'Electrical Repair', 'electrical', 'service_image_3.jpg', 'Handles electrical repairs and installations', 100.00,'Los Angeles', 34.0522, -118.2437, true, now(), now(), 3),
(4, 'Plumbing', 'home repair', 'service_image_4.jpg', 'Expert in residential plumbing', 80.00,'Miami', 25.7617, -80.1918, true, now(), now(), 4),
(5, 'Computer Repair', 'tech support', 'service_image_5.jpg', 'Fixes computers and tech devices', 230.00,'Chicago', 41.8781, -87.6298, true, now(), now(), 5);




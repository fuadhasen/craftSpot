-- Insert Users

-- Insert Profiles
INSERT INTO profiles (id, bio, picture, addresse, phone, user_id)
VALUES
(1, 'Plumber with 10 years of experience', 'john_pic.png', '123 Main St', '1234567890', 1),
(2, 'Electrician specializing in residential wiring', 'jane_pic.png', '456 Elm St', '0987654321', 2),
(3, 'Carpenter expert in custom furniture', 'bob_pic.png', '789 Oak St', '1122334455', 3),
(4, 'Painter and decorator', 'alice_pic.png', '101 Maple St', '6677889900', 4),
(5, 'Handyman for all your needs', 'charlie_pic.png', '202 Pine St', '5544332211', 5);

-- Insert Services
INSERT INTO services (id, type, description, location, latitude, longitude, available, created_at, updated_at, user_id)
VALUES
(1, 'Plumbing', 'Fixing leaks and installing pipes', 'City A', 10.1234, 20.5678, TRUE, NOW(), NOW(), 1),
(2, 'Electrical', 'Installing and repairing wiring', 'City B', 15.1234, 25.5678, TRUE, NOW(), NOW(), 2),
(3, 'Carpentry', 'Custom furniture and woodwork', 'City C', 12.1234, 22.5678, TRUE, NOW(), NOW(), 3),
(4, 'Painting', 'House painting services', 'City D', 18.1234, 28.5678, TRUE, NOW(), NOW(), 4),
(5, 'Handyman', 'General repairs and maintenance', 'City E', 20.1234, 30.5678, TRUE, NOW(), NOW(), 5);

-- Insert Bookings
INSERT INTO bookings (id, status, schedule_time, rating, review, created_at, updated_at, user_id, service_id)
VALUES
(1, 'pending', '2024-10-05 14:00:00', 5, 'Excellent work', NOW(), NOW(), 1, 2),
(2, 'completed', '2024-09-25 10:00:00', 4, 'Good service', NOW(), NOW(), 2, 1),
(3, 'accepted', '2024-09-30 16:00:00', 3, 'Average experience', NOW(), NOW(), 3, 4),
(4, 'rejected', '2024-10-02 11:00:00', NULL, NULL, NOW(), NOW(), 4, 3),
(5, 'cancelled', '2024-09-20 09:00:00', NULL, NULL, NOW(), NOW(), 5, 5);

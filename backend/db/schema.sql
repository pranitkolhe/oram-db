CREATE DATABASE oramdb;
USE oramdb;

CREATE TABLE data_blocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    block_key VARCHAR(100),
    block_value TEXT,
    is_dummy BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
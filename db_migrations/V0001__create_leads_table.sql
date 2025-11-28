-- Create leads table to store car buyout requests
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    car_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on created_at for faster queries
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
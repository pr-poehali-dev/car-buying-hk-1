ALTER TABLE t_p43245144_car_buying_hk_1.optiai_blog_articles
    ADD COLUMN IF NOT EXISTS schema_json JSONB NOT NULL DEFAULT '[]'::jsonb;
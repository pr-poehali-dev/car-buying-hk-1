-- Apply in the Poehali project database before connecting OptiAI.
-- The lead table and its data are not changed.
CREATE TABLE IF NOT EXISTS t_p43245144_car_buying_hk_1.optiai_blog_media (
    id BIGSERIAL PRIMARY KEY,
    sha256 CHAR(64) NOT NULL UNIQUE,
    mime VARCHAR(32) NOT NULL,
    bytes BYTEA NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS t_p43245144_car_buying_hk_1.optiai_blog_articles (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(300) NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    html TEXT NOT NULL,
    render_html TEXT NOT NULL,
    html_sha256 CHAR(64) NOT NULL,
    seo JSONB NOT NULL DEFAULT '{}'::jsonb,
    cover_media_id BIGINT NOT NULL REFERENCES t_p43245144_car_buying_hk_1.optiai_blog_media(id),
    image_alt TEXT NOT NULL DEFAULT '',
    media_map JSONB NOT NULL DEFAULT '{}'::jsonb,
    faq JSONB NOT NULL DEFAULT '[]'::jsonb,
    schema_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE t_p43245144_car_buying_hk_1.optiai_blog_articles
    ADD COLUMN IF NOT EXISTS schema_json JSONB NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS optiai_blog_articles_updated_idx
    ON t_p43245144_car_buying_hk_1.optiai_blog_articles (updated_at DESC);

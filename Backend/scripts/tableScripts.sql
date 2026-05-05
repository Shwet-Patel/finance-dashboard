-- scripts to create tables for the finance dashboard application

-- Table: user
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(512) NOT NULL,
    password TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER,
    created_dtm TIMESTAMPTZ DEFAULT NOW(),
    updated_by INTEGER,
    updated_dtm TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_user_created_by
        FOREIGN KEY (created_by)
        REFERENCES "user"(user_id)
        ON DELETE SET NULL,

    CONSTRAINT fk_user_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES "user"(user_id)
        ON DELETE SET NULL
);

-- Table: record
CREATE TABLE record (
    record_id SERIAL PRIMARY KEY,
    amount INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    note TEXT,
    created_by INTEGER,
    created_dtm TIMESTAMPTZ DEFAULT NOW(),
    updated_by INTEGER,
    updated_dtm TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_record_created_by
        FOREIGN KEY (created_by)
        REFERENCES "user"(user_id),

    CONSTRAINT fk_record_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES "user"(user_id)
);
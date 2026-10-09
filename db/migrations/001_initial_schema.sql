-- RogueByte Cyber Lab - Initial Relational Schema
-- Architect: SID AHMED FARES (SidoDev-Dz)
-- Organization: RogueByte

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Roles and Permissions Table
CREATE TABLE IF NOT EXISTS roles (
    name VARCHAR(32) PRIMARY KEY,
    description TEXT NOT NULL,
    permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description, permissions) VALUES
('student', 'Student learner with access to courses, challenges, and their own lab sessions', '["labs:start", "labs:stop", "labs:reset", "challenges:submit", "courses:read"]'::jsonb),
('instructor', 'Course instructor capable of creating challenges, reviewing submissions, and monitoring student labs', '["courses:manage", "challenges:manage", "submissions:review", "students:monitor"]'::jsonb),
('admin', 'Full platform administrator with node management, audit access, and system quotas', '["*"]'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL REFERENCES roles(name) DEFAULT 'student',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    track VARCHAR(64) NOT NULL, -- 'web', 'linux', 'network', 'blue_team', 'fundamentals'
    difficulty VARCHAR(32) NOT NULL DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Challenges Table
CREATE TABLE IF NOT EXISTS challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(64) NOT NULL,
    difficulty VARCHAR(32) NOT NULL DEFAULT 'easy',
    points INT NOT NULL DEFAULT 100,
    description TEXT NOT NULL,
    learning_objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
    safety_notes TEXT,
    hints JSONB NOT NULL DEFAULT '[]'::jsonb,
    flag_hash VARCHAR(255) NOT NULL,
    is_dynamic BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Lab Templates Table
CREATE TABLE IF NOT EXISTS lab_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    container_image VARCHAR(255) NOT NULL,
    exposed_port INT NOT NULL,
    env_vars JSONB NOT NULL DEFAULT '{}'::jsonb,
    memory_limit VARCHAR(32) NOT NULL DEFAULT '512m',
    cpu_limit VARCHAR(32) NOT NULL DEFAULT '0.5',
    is_isolated BOOLEAN NOT NULL DEFAULT TRUE,
    readiness_path VARCHAR(255) DEFAULT '/health',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Lab Sessions Table (Ephemeral Execution)
CREATE TABLE IF NOT EXISTS lab_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    template_id UUID REFERENCES lab_templates(id),
    status VARCHAR(32) NOT NULL DEFAULT 'STOPPED', -- 'STOPPED', 'PROVISIONING', 'READY', 'RUNNING', 'RESETTING', 'STOPPING', 'FAILED'
    target_host VARCHAR(128),
    target_port INT,
    started_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    stopped_at TIMESTAMP WITH TIME ZONE,
    reset_count INT NOT NULL DEFAULT 0,
    failure_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lab_sessions_user ON lab_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_lab_sessions_status ON lab_sessions(status);

-- 7. Lab Events Table
CREATE TABLE IF NOT EXISTS lab_events (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES lab_sessions(id) ON DELETE CASCADE,
    event_type VARCHAR(64) NOT NULL,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    submitted_flag VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    points_awarded INT NOT NULL DEFAULT 0,
    ip_address VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_user_challenge ON submissions(user_id, challenge_id);

-- 9. Scores Table (Academic Records - Preserved across resets)
CREATE TABLE IF NOT EXISTS scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_points INT NOT NULL DEFAULT 0,
    rank INT DEFAULT 1,
    challenges_completed INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Audit Logs Table (Tamper-Resistant)
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_role VARCHAR(32),
    action VARCHAR(64) NOT NULL,
    resource_type VARCHAR(64) NOT NULL,
    resource_id VARCHAR(128),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

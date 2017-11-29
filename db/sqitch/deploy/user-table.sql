-- Deploy discordbot:user-table to pg
-- requires: botschema

BEGIN;

CREATE TABLE bot.users(
    discord_id TEXT PRIMARY KEY,
    good_boy_points INTEGER NOT NULL DEFAULT 0
);

COMMIT;

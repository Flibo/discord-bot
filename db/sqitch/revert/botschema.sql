-- Revert discordbot:botschema from pg

BEGIN;

DROP SCHEMA bot;

COMMIT;

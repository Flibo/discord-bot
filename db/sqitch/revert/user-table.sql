-- Revert discordbot:user-table from pg
-- requires: botschema

BEGIN;

DROP TABLE bot.users;

COMMIT;

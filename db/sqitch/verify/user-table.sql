-- Verify discordbot:user-table on pg
-- requires: botschema

BEGIN;

SELECT discord_id, good_boy_points
  FROM bot.users
 WHERE FALSE;

ROLLBACK;

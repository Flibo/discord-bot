-- Verify discordbot:botschema on pg

BEGIN;

SELECT 1/COUNT(*) FROM information_schema.schemata WHERE schema_name = 'bot';

ROLLBACK;

CREATE OR REPLACE RULE prevent_direct_insert AS
    ON INSERT TO community_history
    DO INSTEAD NOTHING;

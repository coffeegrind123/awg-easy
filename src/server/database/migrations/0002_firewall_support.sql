-- Add firewall support for per-client traffic filtering
-- Add firewallIps field to clients table for firewall-enforced allowed IPs
ALTER TABLE `clients_table` ADD COLUMN `firewall_ips` text;-->statement-breakpoint
-- Add firewallEnabled field to interfaces table (enabled by default per user preference)
ALTER TABLE `interfaces_table` ADD COLUMN `firewall_enabled` integer DEFAULT 1 NOT NULL;-->statement-breakpoint
-- Add AmneziaWG parameters to clients table (matching our superior implementation)
ALTER TABLE `clients_table` ADD COLUMN `j_c` integer;-->statement-breakpoint
ALTER TABLE `clients_table` ADD COLUMN `j_min` integer;-->statement-breakpoint
ALTER TABLE `clients_table` ADD COLUMN `j_max` integer;-->statement-breakpoint
ALTER TABLE `clients_table` ADD COLUMN `i1` text;-->statement-breakpoint
ALTER TABLE `clients_table` ADD COLUMN `i2` text;-->statement-breakpoint
ALTER TABLE `clients_table` ADD COLUMN `i3` text;-->statement-breakpoint
ALTER TABLE `clients_table` ADD COLUMN `i4` text;-->statement-breakpoint
ALTER TABLE `clients_table` ADD COLUMN `i5` text;

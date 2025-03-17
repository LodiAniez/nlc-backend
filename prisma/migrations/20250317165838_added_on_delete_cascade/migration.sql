-- DropForeignKey
ALTER TABLE `serviceorder` DROP FOREIGN KEY `ServiceOrder_project_id_fkey`;

-- DropIndex
DROP INDEX `ServiceOrder_project_id_fkey` ON `serviceorder`;

-- AddForeignKey
ALTER TABLE `ServiceOrder` ADD CONSTRAINT `ServiceOrder_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

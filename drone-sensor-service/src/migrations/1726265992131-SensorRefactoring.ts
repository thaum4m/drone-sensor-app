import {
    MigrationInterface,
    QueryRunner,
    Table,
} from "typeorm"

export class SensorRefactoring1726265992131 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sensors",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "serial_number",
                        type: "varchar",
                        length: "32",
                        isUnique: true,
                    },
                    {
                        name: "firmware_ver",
                        type: "varchar",
                        length: "10",                        
                    },
                    {
                        name: "status",
                        type: "varchar",
                        length: "15",
                        enum: ["offline", "online"],
                    },
                    {
                        name: "created_at",
                        type: "timestamptz",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamptz",
                        default: "now()",
                    }
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sensors")
    }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class User1634728673310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (\n" +
          "  `id` varchar(36) NOT NULL,\n" +
          "  `name` varchar(255) NOT NULL,\n" +
          "  `email` varchar(255) NOT NULL,\n" +
          "  `password` varchar(255) NOT NULL,\n" +
          "  PRIMARY KEY (`id`)\n" +
          ") ENGINE=InnoDB DEFAULT CHARSET=latin1;")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }

}

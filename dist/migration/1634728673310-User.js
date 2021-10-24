"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User1634728673310 = void 0;
class User1634728673310 {
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `user` (\n" +
            "  `id` varchar(36) NOT NULL,\n" +
            "  `name` varchar(255) NOT NULL,\n" +
            "  `email` varchar(255) NOT NULL,\n" +
            "  `password` varchar(255) NOT NULL,\n" +
            "  PRIMARY KEY (`id`)\n" +
            ") ENGINE=InnoDB DEFAULT CHARSET=latin1;");
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user');
    }
}
exports.User1634728673310 = User1634728673310;
//# sourceMappingURL=1634728673310-User.js.map
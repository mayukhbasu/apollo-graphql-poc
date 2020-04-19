import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Table, OneToMany} from "typeorm";

@Entity("users")
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}

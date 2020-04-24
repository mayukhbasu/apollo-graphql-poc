import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Table, OneToMany} from "typeorm";

@Entity("users")
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column() 
    password: string;

    @Column("boolean", { default: false })
    confirmed: boolean;
}

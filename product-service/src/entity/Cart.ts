import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Cart extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userID: string;
    
    @Column()
    products: [Product]
}
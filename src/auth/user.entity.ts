import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', unique: true })
    username: string;
    @Column({ type: 'text' })
    password: string
}
/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks.model";
@Entity({ name: 'task' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', nullable: true })
    title: string;
    @Column({ type: 'text', nullable: true })
    description: string;
    @Column({ type: 'text', nullable: true })
    status: TaskStatus;
}
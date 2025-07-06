import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventId: string;

    @Column()
    content: string;

    @Column()
    sender: string;

    @Column({ type: 'int', nullable: false })
    score: number;

    @CreateDateColumn()
    createdAt: Date;
}

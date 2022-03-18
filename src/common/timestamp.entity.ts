import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class timeStamp {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

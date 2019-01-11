import {Entity, PrimaryGeneratedColumn, Column} from 'loopback4-typeorm';
import {property, model} from '@loopback/repository';

@model()
@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  @property({type: 'number', id: true})
  id: number;

  @Column()
  @property({type: 'string', required: true})
  name: string;

  @Column()
  @property({type: 'string', required: true})
  image: string;

  @Column()
  @property({type: 'string', required: true})
  description: string;
}
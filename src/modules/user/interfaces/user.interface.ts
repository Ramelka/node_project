import {Document} from 'mongoose';

export interface UserInterface extends Document {
    readonly name: string;
    readonly email: string;
    readonly gender: string | null;
    readonly avatar: string | null
}
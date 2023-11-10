import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

@Schema()
export class User {
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    gender: string;
    @Prop()
    avatar: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
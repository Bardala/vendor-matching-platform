import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ResearchDocument extends Document {
  @Prop({ required: true })
  projectId: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const ResearchDocumentSchema =
  SchemaFactory.createForClass(ResearchDocument);

ResearchDocumentSchema.index(
  { title: 'text', content: 'text' },
  { weights: { title: 5, content: 1 } },
);

import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
    cuisine: {
      type: String,
      trim: true,
      required: true,
    },
    prepTimeMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    difficulty: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    ingredients: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: 'Ingredients must not be empty',
      }
    },
  },
  {
    timestamps: true,
  },
);

export type Recipe = InferSchemaType<typeof recipeSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const RecipeModel = model('Recipe', recipeSchema);

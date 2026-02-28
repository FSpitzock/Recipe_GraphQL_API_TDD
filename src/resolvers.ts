import { GraphQLError } from 'graphql';
import { RecipeModel } from './models/recipe';

type CreateRecipeInput = {
  title: string;
  cuisine: string;
  prepTimeMinutes: number;
  difficulty: string;
  slug: string;
  ingredients: string[];
};

type UpdateRecipeInput = {
  title?: string;
  cuisine?: string;
  prepTimeMinutes?: number;
  difficulty?: string;
  slug?: string;
  ingredients?: string[];
};


export const resolvers = {
  Query: {
    recipes: async () => {
      return RecipeModel.find();
    },
    recipe: async (_parent: unknown,{id}: {id: string}) => {
      //return recipe by ID search
      return RecipeModel.findOne({_id: id});
    },
  },
  Mutation: {
  createRecipe: async (_parent: unknown, args: { input: CreateRecipeInput }) => {
    try {
      const recipe = await RecipeModel.create(args.input);
      return recipe;
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        throw new GraphQLError('validation failed');
      }

      if (err.code === 11000) {
        throw new GraphQLError('duplicate key error');
      }

      throw err;
    }
  },

  updateRecipe: async (
    _parent: unknown,
    args: { id: string; input: UpdateRecipeInput },
  ) => {
    try {
      const updated = await RecipeModel.findByIdAndUpdate(
        args.id,
        args.input,
        { new: true, runValidators: true }
      );

      if (!updated) {
        throw new GraphQLError('Recipe not found',
        {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      }

      return updated;
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        throw new Error('Validation failed');
      }

      if (err.code === 11000) {
        throw new GraphQLError('duplicate key error');
      }

      throw err;
    }
  },

  deleteRecipe: async (_parent: unknown, args: { id: string }) => {
    const deleted = await RecipeModel.findByIdAndDelete(args.id);

    if (!deleted) {
      throw new Error('Recipe not found');
    }

    return deleted;
  },
},
};


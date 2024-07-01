import { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe.types';
import { fetchAllRecipes, fetchSpecificRecipe } from '@/services/recipes-api';
import { filterSearchedRecipes } from '@/lib/utils';

/**
 * Custom hook to display recipes based on search parameters.
 *
 * @param {string} searchParams - The search parameters to filter the recipes.
 * @return {{ recipes: Recipe[]; loading: boolean }} The recipes and loading state.
 */
export const useDisplayRecipes = (
    searchParams: string
): { recipes: Recipe[]; loading: boolean } => {
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = await fetchAllRecipes();

            if (recipes === null) {
                setRecipes(null);
                return;
            }

            if (searchParams) {
                const filteredRecipes = filterSearchedRecipes(
                    searchParams,
                    recipes
                );
                return setRecipes(filteredRecipes);
            }

            setRecipes(recipes);
        };

        fetchRecipes();
        setLoading(false);
    }, [searchParams]);

    return { recipes: recipes ?? [], loading };
};

export const useDisplayRecipeDetails = (
    recipeName: string
): { recipe: Recipe | null; loading: boolean } => {
    const [recipe, setRecipe] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            const fetchedRecipe = await fetchSpecificRecipe(recipeName);
            setRecipe(fetchedRecipe);
            setLoading(false);
        };

        fetchRecipe();
    }, [recipeName]);

    return { recipe, loading };
};

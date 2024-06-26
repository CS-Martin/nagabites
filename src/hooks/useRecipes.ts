import { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe.types';
import { fetchAllRecipes } from '@/services/recipes-api';

export const useDisplayRecipes = (
  searchParams: string
): { recipes: Recipe[]; loading: boolean } => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const recipes = await fetchAllRecipes();

      if (searchParams) {
        console.log('Search', searchParams);
        const filteredRecipes = useFilterSearchedRecipes(searchParams, recipes);
        return setRecipes(filteredRecipes);
      }

      setRecipes(recipes);
      setLoading(false);
    };

    fetchRecipes();
  }, [searchParams]);

  return { recipes, loading };
};

export const useFilterSearchedRecipes = (
  searchParams: string,
  recipes: Recipe[]
): Recipe[] => {
  const searchedRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchParams.toLowerCase())
  );

  return searchedRecipes as Recipe[];
};

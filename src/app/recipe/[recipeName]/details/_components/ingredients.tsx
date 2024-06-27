import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

type IngredientsComponentProps = {
    index: number;
    ingredients: string;
};

const IngredientsComponent: React.FC<IngredientsComponentProps> = ({
    index,
    ingredients
}): JSX.Element => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    // Regular expression to capture quantity and ingredient
    const ingredientRegex =
        /^([\d/.\s-]+(?:cups|kg|pieces|tablespoons|head|thumb-sized|to taste)?\s*)?(.*)$/i;
    const matches = ingredients.match(ingredientRegex);

    const quantity: string = matches?.[1]?.trim() || '';
    const ingredientName: string = matches?.[2]?.trim() || ingredients;
    const ingredientsLength: number = ingredients.length;

    return (
        <div className="flex justify-between border-b px-3 py-4">
            <div className="flex gap-x-2">
                <p className="w-[60px] text-4xl font-bold">
                    {ingredientsLength >= 10
                        ? `${String(index + 1).padStart(2, '0')}`
                        : 'Ingredient'}
                </p>
                <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <p
                    className={`relative ${isChecked ? 'text-slate-500' : ''} transition-all duration-500 ease-in-out`}>
                    {ingredientName.charAt(0).toUpperCase() +
                        ingredientName.slice(1)}
                    <span
                        className={`absolute left-0 top-1/4 h-[1px] w-full transform bg-current transition-transform duration-500 ease-in-out ${
                            isChecked ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        style={{ transformOrigin: 'left' }}></span>
                </p>
            </div>
            <div>
                <p className="text-slate-500">{quantity}</p>
            </div>
        </div>
    );
};

export default IngredientsComponent;

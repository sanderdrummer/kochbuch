import { useRecipe } from "@sander/storage/recipes";
import { Option, Select } from "@sander/ui/input";
import {
	Content,
	FlexContainer,
	HeaderNav,
} from "@sander/ui/layout";
import { List } from "@sander/ui/list";
import { H1, P } from "@sander/ui/typography";
import { useState } from "react";
import { useParams } from "../router.tsx";
import { RecipeSearch } from "./recipe-search.tsx";
import { AppFooter } from "../footer.tsx";

const getAmount = (amount: string, modifier = 1) => {
	if (Number(amount) === 0) return "";
	if (modifier === 1) return amount;

	return `${Number(amount) * modifier}`;
};

export const RecipeDetails = () => {
	const context = useParams();
	const { data: recipe } = useRecipe(context.id);
	const [modifier, setModifier] = useState(1);
	const scales = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

	return (
		<FlexContainer>
			<HeaderNav>
				<RecipeSearch />
			</HeaderNav>
			<Content>
				<H1>{recipe?.title}</H1>
				<div>
					<Select
						value={modifier}
						onChange={(e) => setModifier(Number(e.currentTarget.value))}
						label="Menge"
					>
						{scales.map((scale) => (
							<Option key={scale} value={scale}>
								{scale}
							</Option>
						))}
					</Select>
				</div>
				<List className="sm:order-1 w-full mb-4 mt-4 lg:mt-8 lg:mb-8">
					{recipe?.ingredients.map((ingredient) => (
						<li className="text-lg" key={ingredient.name + ingredient.amount}>
							<span className="text-primary-600">
								{getAmount(ingredient.amount, modifier)}
								{ingredient.scale}
							</span>
							<span> {ingredient.name} </span>
						</li>
					))}
				</List>
				<P>{recipe?.description}</P>
			</Content>
			<AppFooter />
		</FlexContainer>
	);
};

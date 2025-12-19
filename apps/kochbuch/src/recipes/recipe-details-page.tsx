import { useRecipe } from "@sander/storage/recipes";
import { Option, Select } from "@sander/ui/input";
import { Content, Divider, FlexContainer, HeaderNav } from "@sander/ui/layout";
import { List, ListItem } from "@sander/ui/list";
import { H1, H2, P } from "@sander/ui/typography";
import { useEffect, useState } from "react";
import { AppFooter } from "../footer.tsx";
import { useParams } from "../router.tsx";
import { AddRecipeToListButton } from "./add-recipe-to-list-button.tsx";
import { RecipeSearch } from "./recipe-search.tsx";

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<FlexContainer>
			<HeaderNav>
				<RecipeSearch />
			</HeaderNav>
			<Content>
				<H1>{recipe?.title}</H1>
				<Divider />
				<H2>Zutaten</H2>
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
						<ListItem
							className="text-lg"
							key={ingredient.name + ingredient.amount}
						>
							<span className="text-primary-600">
								{getAmount(ingredient.amount, modifier)}
								{ingredient.scale}
							</span>
							<span> {ingredient.name} </span>
						</ListItem>
					))}
				</List>
				<Divider />
				<H2>Zubereitung</H2>

				<P>{recipe?.description}</P>
				<Divider />
				{recipe && (
					<AddRecipeToListButton
						title={recipe.title}
						ingredients={recipe.ingredients}
					/>
				)}
			</Content>
			<AppFooter />
		</FlexContainer>
	);
};

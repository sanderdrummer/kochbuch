import { bulkAddRecipes, Recipe } from "./db";

let items = 10000;

let recipe = (index: number): Recipe => {
  return {
    title: "recipe-" + index,
    tags: "nice",
    ingredients: `
       1 Zutatat-${index}
       2 Zutatat-${index}
       3 Zutatat-${index}
       4 Zutatat-${index}
       5 Zutatat-${index}
       6 Zutatat-${index}
       7 Zutatat-${index}
       8 Zutatat-${index}
       9 Zutatat-${index}
       0 Zutatat-${index}
      `,
    description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
    
    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
    
    no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, s
    ed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
    et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
    
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam 
    erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
      `
  };
};

export const fillDB = () => {
  while (items--) {
    bulkAddRecipes([recipe(items)]);
  }
};

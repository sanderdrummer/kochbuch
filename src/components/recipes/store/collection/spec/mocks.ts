import { RecipeCollection } from '../state';

export const collectionWithOneItem = (): RecipeCollection => ({
    'recipe1': {
        title: 'recipe1',
        description: '',
        products: []
    }
});

export const collectionWithTwoItems = (): RecipeCollection => ({
    'recipe1': {
        title: 'recipe1',
        description: '',
        products: []
    },
    'recipe2': {
        title: 'recipe2',
        description: 'with description',
        products: []
    }
});

export const collectionWithThreeItems = (): RecipeCollection => ({
    'recipe1': {
        title: 'recipe1',
        description: '',
        products: []
    },
    'recipe2': {
        title: 'recipe2',
        description: 'with description',
        products: []
    },
    'recipe3': {
        title: 'recipe3',
        description: 'with another description',
        products: []
    }
});

export const item3 = () => ({
    title: 'recipe3',
    description: 'with another description',
    products: []
});
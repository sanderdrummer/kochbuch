import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../../shared/models/recipe.model";
import {Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {RecipeStore} from "../../shared/stores/recipe.store";
import {FormArray, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RecipeState} from "../../shared/stores/recipe.state";

@Component({
    selector: 'kb-recipe-create',
    templateUrl: './recipe-create.component.html',
    styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {

    recipe: RecipeModel;
    recipeSubscription: Subscription;
    recipeForm:FormGroup;
    products:FormArray;
    categories: string[];
    title:string;
    submitButtonLabel:string;

    constructor(private fb:FormBuilder, private router: Router, private route: ActivatedRoute, private store: RecipeStore) {

        this.recipe = new RecipeModel({});
        this.categories = [];
        this.recipeSubscription = store.state$.subscribe((state:RecipeState)=> {
            this.products = new FormArray([this.createProduct()]);
            this.recipeForm = fb.group({
                title: ['', Validators.required],
                description: [],
                categories: [],
                products: this.products
            });

            if (state.selectedRecipe) {
                this.recipe = state.selectedRecipe;
                this.initUpdate();
            } else {
                const title = route.snapshot.params['title'];
                store.setSelectedRecipeByTitle(title);
                this.initCreate();
            }

            this.categories = state.categories || [];
        });
    }

    ngOnInit() {
    }

    initUpdate(){
        this.initializeChildForms(this.recipe.products, this.recipe.categories);
        this.recipeForm.patchValue(this.recipe);

        this.title = this.recipe.title;
        this.submitButtonLabel = this.title + ' aktualisieren';
    }

    initCreate(){
        this.recipeForm.reset();
        this.title = 'Neues Rezept';
        this.submitButtonLabel = 'Neues Rezept anlegen';

    }

    initializeChildForms(products, categories) {
        products.forEach(() => {
            this.addProduct()
        });
    }

    createCategory() {
        return this.fb.group({
            category: []
        })
    }

    createProduct() {
        return this.fb.group({
            title: [],
            amount: []
        })
    }

    addProduct() {
        this.products.push(this.createProduct());
    }

    removeItem(type: string, index: number) {
        const control = <FormArray>this.recipeForm.controls[type];
        control.removeAt(index);
    }

    createOrUpdateRecipe(values: RecipeModel) {
        this.store.updateRecipe(values).then((recipe) => {
            console.log(recipe);
            this.router.navigate(['../'], {relativeTo: this.route});
        });
    }

    deleteRecipe(){
        this.store.deleteRecipe(this.recipe).then( () => {
            this.router.navigate(['recipes']);
        });
    }

}

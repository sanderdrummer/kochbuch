import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryStore} from '../shared/category.store';
import {CategoryModel} from '../shared/category.model';
import {Router} from '@angular/router';
import {CategoryService} from '../shared/category.service';

@Component({
  selector: 'kb-recipe-categories-update',
  templateUrl: './recipe-categories-update.component.html',
  styleUrls: ['./recipe-categories-update.component.scss']
})
export class RecipeCategoriesUpdateComponent implements OnInit {

  categoryForm:FormGroup;
  category:CategoryModel;
  constructor(fb:FormBuilder,
              private router:Router,
              private categoryStore:CategoryStore,
              private categoryService:CategoryService) {

    this.categoryForm = fb.group({
      title: ['', Validators.required]
    });

    this.categoryStore.state$.map(state => state.selectedCategory).subscribe(category => {
      this.category = category;
    });
  }

  ngOnInit() {}

  updateCategory(value) {
    if (value) {
      const category = new CategoryModel({title:value});
      this.categoryService.updateCategory(category).then(()=> {
        this.router.navigate(['../']);
      })
    }
  }
}

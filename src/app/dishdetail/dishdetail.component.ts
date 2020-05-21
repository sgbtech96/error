import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    @ViewChild('fform') feedbackFormDirective;

    // @Input()
    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    ratingForm: FormGroup;
    rating: Comment;
    dishcopy: Dish;
    formErrors = {
      comment: '',
      author: ''
    };
    errMess: string;
  
    validationMessages = {
      'author': {
        'required':      'Author Name is required.',
        'minlength':     'Author Name must be at least 2 characters long.',
        'maxlength':     'Author cannot be more than 25 characters long.'
      },
      'comment': {
        'required': 'Comment is required.'
      }
    };
    constructor(private dishservice: DishService, private route: ActivatedRoute, private location: Location, private fb: FormBuilder,
      @Inject('baseURL') private baseURL) {
      this.createForm();
     }

    ngOnInit() {
      // let id = this.route.snapshot.params['id'];
      // this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
      this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess );
    }
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
    createForm() {
      this.ratingForm = this.fb.group({
        rating: 5,
        comment: '',
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
      });
      this.ratingForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
  
      this.onValueChanged();
    }
  
    onSubmit() {
      this.rating = this.ratingForm.value;
      this.rating.date = Date().toString();
      console.log(this.rating);
      this.dishcopy.comments.push(this.rating);
      this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
      
      this.ratingForm.reset({
        rating: 5,
        comment: '',
        author: ''
      });
      this.feedbackFormDirective.resetForm();
    }
    onValueChanged(data?: any) {
      if (!this.ratingForm) { return; }
      const form = this.ratingForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
    goBack(): void {
      this.location.back();
    }

}

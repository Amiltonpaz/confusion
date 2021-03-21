import { Dish } from './../../../shared/dish';
import { DishService } from './../../dish.service';
import { DataService } from './../../data.service';
import { Comment } from './../../../shared/comment';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.page.html',
  styleUrls: ['./add-comment.page.scss'],
  providers: [FormBuilder]
})
export class AddCommentPage implements OnInit {

  @Input() id: number;

  formulario: FormGroup;
  data = new Date();
  comment: Comment;
  dish: Dish;


  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private dataService: DataService,
    private dishService: DishService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {

    this.formulario = this.fb.group({
      rating: [null, Validators.required],
      comment: [null, Validators.required],
      author: [null, Validators.required]
    });
  }

  async onSubmit() {

    const loading = await this.loadingCtrl.create({
      message: 'Adicionando seu comentário...',
      duration: 3000
    });

    const toastSuccess = await this.toastCtrl.create({
      message: 'Avaliado com sucesso!',
      duration: 3000,
      position: 'bottom'
    });

    const toastFail = await this.toastCtrl.create({
      message: 'Falha ao gravar comentário!',
      duration: 3000,
      position: 'bottom'
    })

    this.comment = this.formulario.value;
    this.comment.date = this.data.toDateString();

    this.dishService.getDish(this.id).pipe(
      map((dish: Dish) => {dish.comments.push(this.comment); this.dataService.putComment(dish)}),
    ).subscribe(() => {
      loading.present();this.modalDismiss()
    }, () => {toastFail.present(), this.modalDismiss()} );

    this.dish.comments.push(this.comment);

    toastSuccess.present()

  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }

}

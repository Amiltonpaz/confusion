import { LeaderService } from './../../leader.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Leader } from 'src/shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  readonly API = 'http://10.0.0.7:3000/';
  leaders: Leader[];

  constructor(
    private navCtrl: NavController,
    private dataLeader: LeaderService
    ) { }

  ngOnInit() {
    this.getLeaders();
  }

  getLeaders() {
    this.dataLeader.getLeaders().subscribe(lideres => {
      this.leaders = lideres
    })
  }

  goBack(event){
    this.navCtrl.back()
  }

}

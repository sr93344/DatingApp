import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit{
  member: Member | undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];


  constructor(private _memberService: MembersService, private _route:ActivatedRoute){}

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  getImages(){
    if(!this.member) return []; 
    const ImgUrls = [];
    for(const photo of this.member.photos){
      ImgUrls.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url
      })
    }

    return ImgUrls;
  }

  loadMember(){
    const username = this._route.snapshot.paramMap.get('username');
    if(!username) return;
    this._memberService.getMember(username).subscribe({
      next: res => {
        this.member = res;
        this.galleryImages = this.getImages();
      }
      
    })
  }
}

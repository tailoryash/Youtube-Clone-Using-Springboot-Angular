import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from "../upload-video/video.service";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent {
    videoId !: string;
    videoUrl !: string;
    videoAvailable: boolean = false;
    videoTitle!: string;
    videoDescription!: string;
    tags: Array<string> = [];


    constructor(private router: ActivatedRoute, private videoService: VideoService){
         this.videoId = this.router.snapshot.params['videoId'];
         this.videoService.getVideo(this.videoId).subscribe(data=>{
                 this.videoUrl = data.videoUrl;
                 this.videoAvailable = true;
                 this.videoTitle = data.title;
                 this.videoDescription = data.description;
                 this.tags = data.tags;
         })
    }

}

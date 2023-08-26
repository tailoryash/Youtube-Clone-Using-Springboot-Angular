import { Component , OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatIconModule} from '@angular/material/icon';
import {NgFor} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {VideoService} from "../upload-video/video.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {VideoDto} from "../video-dto";

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent implements OnInit{

  saveVideoDetailsForm : FormGroup;
  title:FormControl = new FormControl('');
  description:FormControl = new FormControl('');
  videoStatus:FormControl = new FormControl('');
  tags: string[] = [];
  selectedFile! : File;
  selectedFileName =  '';
  videoId ='';
  fileSelected = false;
  videoUrl!:string;
  thumbnailUrl!:string;

  addOnBlur = true;
  readonly separatorKeysCodes:number[] = [ENTER, COMMA];
  removable = true;

  constructor(private snackBar: MatSnackBar, private router: ActivatedRoute, private videoService: VideoService){
    this.videoId = this.router.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data=>{
        this.videoUrl = data.videoUrl;
        this.thumbnailUrl = data.thumbnailUrl;
    })
    this.saveVideoDetailsForm = new FormGroup({
        title: this.title,
        description: this.description,
        videoStatus: this.videoStatus,
    })
  }
  ngOnInit():void{
  }

   add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }

    remove(tag: string): void {
      const index = this.tags.indexOf(tag);

      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }

    onFileSelected(event: any){
        this.selectedFile = event.target.files[0];
        this.selectedFileName = this.selectedFile.name;
        this.fileSelected = true;
    }

    onUpload(){
        this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
        .subscribe(data=>{
            console.log(data);
            // show an upload success notification
            this.snackBar.open("Thumbnail uploaded successfully", "OK");
        })
    }

    saveVideo(){
        // call the video service to make a http call to our backend
        const videoMetaData: VideoDto = {
            "id": this.videoId,
            "title": this.saveVideoDetailsForm.get('title')?.value,
            "description": this.saveVideoDetailsForm.get('description')?.value,
            "tags": this.tags,
            "videoStatus" : this.saveVideoDetailsForm.get('videoStatus')?.value,
            "videoUrl": this.videoUrl,
            "thumbnailUrl": this.thumbnailUrl
        }
        this.videoService.saveVideo(videoMetaData).subscribe(data=>{
            this.snackBar.open("Video Metadata updated successfully", "OK");
        })
    }

}

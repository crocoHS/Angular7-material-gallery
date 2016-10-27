﻿import { Component, OnInit, OnDestroy,
        NgZone }                  from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Album,
    AlbumPhotoByAlbum }           from '../model/album';
import { AlbumService }           from '../services/album.service';
import { DialogService }          from '../services/dialog.service';
import { Observable }             from 'rxjs/Observable';
import { Subscription }           from 'rxjs/Subscription';
import { Photo, SelectablePhoto } from '../model/photo';
import { PhotoService }           from '../services/photo.service';
import '../rxjs-operators';
import { AuthService }            from '../services/auth.service';
import { DebugLogging }           from '../app.setting';

@Component({
    selector: 'acgallery-album-orgphoto',
    templateUrl: 'app/views/album/album.orgphoto.html'
})

export class AlbumOrgPhotoComponent implements OnInit {
    public albumid: number;
    public allPhoto: SelectablePhoto[];
    public assignedPhoto: SelectablePhoto[];
    private subCurAlbum: Subscription;
    private routerID: number = -1;

    constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        public dialogService: DialogService,
        private albumService: AlbumService,
        private photoService: PhotoService) {
        if (DebugLogging) {
            console.log("Entering constructor of AlbumOrgPhotoComponent");
        }        
    }

    ngOnInit() {
        if (DebugLogging) {
            console.log("Entering ngOnInit of AlbumOrgPhotoComponent");
        }        

        let aid: number = -1;
        this.route.params.forEach((next: { id: number }) => {
            aid = next.id;
        });

        if (aid !== -1 && aid != this.routerID) {
            this.routerID = aid;
            /*
            Observable.forkJoin(
                this.albumService.loadAlbum(this.routerID),
                this.photoService.getFiles()
            ).subscribe(res => {
                var album = res[0];
                var all = res[1];

                if (album.Photoes.length > 0) {
                    for (let i = 0; i < album.Photoes.length; i++) {
                        let foundIdx = -1;
                        for (let j = 0; j < all.length; j++) {
                            if (all[j].photoId === album.Photoes[i].photoId) {
                                foundIdx = j;
                                break;
                            }
                        }

                        if (foundIdx != -1) {
                            all.splice(foundIdx, 1);
                        }
                    }
                }

                this.zone.run(() => {
                    this.assignedPhoto = new Array<SelectablePhoto>();
                    this.allPhoto = new Array<SelectablePhoto>();
                    for (let k = 0; k < album.Photoes.length; k++) {
                        var alb = <SelectablePhoto>album.Photoes[k];
                        this.assignedPhoto.push(alb);
                    }

                    for (let k = 0; k < all.length; k++) {
                        var alb = <SelectablePhoto>all[k];
                        this.allPhoto.push(alb);
                    }
                });
            });*/        
        }
    }

    onAddAssignedPhoto() {    
        if (DebugLogging) {
            console.log("Entering onAddAssignedPhoto of AlbumOrgPhotoComponent");
        }

        let tmpPhoto = new Array<SelectablePhoto>();
        for (let i = this.allPhoto.length - 1; i >= 0; i--) {
            if (this.allPhoto[i].isSelected) {
                tmpPhoto.push(this.allPhoto[i]);
                this.allPhoto.splice(i, 1);
            }
        }
        if (tmpPhoto.length > 0) {
            for (let k = 0; k < tmpPhoto.length; k++) {
                this.assignedPhoto.push(tmpPhoto[k]);
            }
        }
    }

    onRemoveAssignedPhoto() {
        if (DebugLogging) {
            console.log("Entering onRemoveAssignedPhoto of AlbumOrgPhotoComponent");
        }

        let tmpPhoto = new Array<SelectablePhoto>();
        for (let i = this.assignedPhoto.length - 1; i >= 0; i--) {
            if (this.assignedPhoto[i].isSelected) {
                tmpPhoto.push(this.assignedPhoto[i]);
                this.assignedPhoto.splice(i, 1);
            }
        }
        if (tmpPhoto.length > 0) {
            for (let k = 0; k < tmpPhoto.length; k++) {
                this.allPhoto.push(tmpPhoto[k]);
            }
        }
    }

    onSubmit() {
        if (DebugLogging) {
            console.log("Entering onSubmit of AlbumOrgPhotoComponent");
        }

        /*
        let apba = new AlbumPhotoByAlbum();
        apba.AlbumId = this.albumid;
        apba.PhotoIDList = new Array<string>();
        for (let i = 0; i < this.assignedPhoto.length; i++) {
            apba.PhotoIDList.push(this.assignedPhoto[i].photoId);
        }
        this.albumService.updateAlbumPhotoByAlbum(apba).subscribe(
            x => {
                if (x) {
                    this.dialogService.log("Save successfully!", "success");
                    this.router.navigate(['/album']);
                } else {
                    this.dialogService.log("Save failed!", "error");
                }
            }
        );*/
    }

    onCancel() {
        if (DebugLogging) {
            console.log("Entering onCancel of AlbumOrgPhotoComponent");
        }

        this.router.navigate(['/album']);
    }
}

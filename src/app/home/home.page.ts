import { Component } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  profileName: string = '';
  profileName1: string = '';
  isLoadingCrop = false;

  cropOptions: CropOptions = {
    quality: 50
  }
  logoURL: any;

  public category: any = {
    lightBlue: true,
  }
  constructor(public imagePicker: ImagePicker, public camera: Camera, public actionSheetController: ActionSheetController, private file: File, private crop: Crop) {   }

  cropImage(imgPath) {
    console.log(imgPath);
    this.crop.crop(imgPath, this.cropOptions)
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          console.log('Error cropping image', error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    this.isLoadingCrop = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.logoURL = base64;
      console.log(this.logoURL);
      this.isLoadingCrop = false;
    }, error => {
      alert('Error in showing image' + error);
      this.isLoadingCrop = false;
    });
  }

  pickImage2(sourceType) {
    const options: CameraOptions = {
      quality: 80,
      sourceType: sourceType,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {

      this.cropImage(imageData);
    }, (err) => {
      // Handle error
    });
  }

  async selectImage2() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage2(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage2(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  addName() {
    this.profileName1 = this.profileName;
  }
}

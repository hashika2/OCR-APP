  import 'dart:io';
  import 'package:flutter/material.dart';
  import 'package:image_picker/image_picker.dart';
  import 'package:dio/dio.dart';
  import 'package:flutter/cupertino.dart';
  //import 'package:image_cropper/image_cropper.dart';
  //import 'package:flutter_image_ppicker/image_picker_dialog.dart';
  //import '../ui/imageCroper.dart';



  class Home extends StatefulWidget {

    @override
    _HomeState createState() => _HomeState();
  }
  class _HomeState extends State<Home> {
    File _image;
    String getText;
    bool isCamera=true;
    var image;

    Future<void> _showChoiceDialog(BuildContext context){
            return showDialog(context: context,builder: (BuildContext context){
              return AlertDialog(
                title: Text("Make A Choice"),
                content: SingleChildScrollView(
                  child: ListBody(
                    children: <Widget>[
                      RaisedButton(
                        color: Colors.pinkAccent,
                        child: Text("Gallery",),
                        onPressed: (){
                          _openGallery(context);
                        },
                      ),
                      Padding(padding: EdgeInsets.all(8.0),),
                      RaisedButton(
                        color: Colors.pinkAccent,//
                        child: Text("Camera"),
                        onPressed: (){
                          print("hashika");
                          openCamera();
                        },
                      )
                    ],
                  ),
                ),);
            });
    }


  upload() async {
      String fileName = _image.path;
      print(fileName);
      //String torken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZHVzaGFua2FrYWhhd2FAZ21haWwuY29tIiwiX2lkIjoiNWUwZGNhYTZiODdkZTcwMDA0N2I5MDE2IiwiaWF0IjoxNTc3OTg0MDgzLCJleHAiOjE1Nzc5ODc2ODN9.hU-UXQLqU3ogPUXzM6skJXMwub5U42joIYs2bef_NLQ";
      try {
        FormData formData =
              new FormData.from({"filePath": new UploadFileInfo(_image, fileName)});
          var response =
              await Dio().post('http://192.168.8.102:8080/read', data: formData);
          print(response.data);
          _showonTapMessage(context, response.data);

          var state=response.data;
          getText=state;
          setState(() {
            getText=state;
          });
        } catch (err) {
          print(err.message);
        }
      }

      File imageFile;

      Widget _desideImageView(){
        if(_image == null)
              return Text("No profile");
              else{
                return (
                  Image.file(_image,width:400,height:300,alignment: Alignment.center,));
              }
          }

      @override
      Widget build(BuildContext context) {

        // var imageCropper =new ImageCropper();
        // imageCropper.build(context);

        return Scaffold(
          appBar: new AppBar(
            title: new Text("Gallery"),
            centerTitle: true,

          ),
          //backgroundColor: Colors.white38,
          
          body: new Form(
            
            child:Center(
              child: new Column(
            // mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                _desideImageView(),
                Text("welcome !",style: new TextStyle(fontSize: 10.4,color: Colors.black),),
                ButtonTheme(
                  minWidth: 300.0,
                  child:RaisedButton(
                  onPressed: (){
                    _showChoiceDialog(context);
                  },
                  padding: const EdgeInsets.all(0.0),
                    child: Container(
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          colors: <Color>[
                            Color(0xFF0D47A1),
                            Color(0xFF1976D2),
                            Color(0xFF42A5F5),
                          ],
                        ),
                      ),
                      padding: const EdgeInsets.all(10.0),
                      child: Text("select Image",style:TextStyle(fontSize: 20.0,color: Colors.white),)
                    ),
                    ) ,
                ),
              
                    // child: Text("select Image",style:TextStyle(fontSize: 20.0),)
                RaisedButton(
                  color: Colors.blueAccent,
                child: Text("Upload",style: TextStyle(color: Colors.white),),
                onPressed:// _image != null ? upload :null ,
                (){
                  
                  if(_image!=null){
                    upload();
                  }
                  else{
                    _showonTapMessage(context, "error");
                  }
                }
              ),
                              ],
                            ),
                            )
                          ),
                        );
                      }

      _openGallery(BuildContext context) async{
        var image =await ImagePicker.pickImage(source: ImageSource.gallery);
        //cropImage(image);
        this.setState((){
          _image = image;
        });
        Navigator.of(context).pop();

      }
     
      Future openCamera() async{

      var image = await ImagePicker.pickImage(source: ImageSource.camera);

      setState(() {
        _image = image;
      });
    }
     
    void _showonTapMessage(BuildContext context, String message) {
    var alert = new AlertDialog(
      title: Text("Text Output",style: TextStyle(color: Colors.red),),
      content: Text(message),
        actions: <Widget>[
          FlatButton(
            child: Text("OK",style: TextStyle(color: Colors.green),),
            onPressed: () {
                Navigator.pop(context);
            }, )
        ],
    );
    // showDialog(context: context, child: alert);
    showDialog(context: context, builder: (context) => alert);
    }
    } 
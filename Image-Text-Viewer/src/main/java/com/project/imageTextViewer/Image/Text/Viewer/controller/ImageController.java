package com.project.imageTextViewer.Image.Text.Viewer.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.imageTextViewer.Image.Text.Viewer.jpa.ImageRepository;
import com.project.imageTextViewer.Image.Text.Viewer.model.ImageModel;
import com.project.imageTextViewer.Image.Text.Viewer.service.DataTypeConvertionService;
import com.project.imageTextViewer.Image.Text.Viewer.service.ReadText;

@RestController
public class ImageController {
	
	@Autowired
	ReadText readText;
	
	@Autowired
	ImageRepository imageRepository;
	
	@RequestMapping("/read")
	@CrossOrigin(origins = "*")
	public String getImage(@RequestParam MultipartFile filePath) throws IOException {
		File imageFile = DataTypeConvertionService.convert(filePath);
		String results = readText.readText(imageFile);
		imageRepository.save(new ImageModel(results, filePath.getBytes()));
		return results;   
    }
	
}

package com.project.imageTextViewer.Image.Text.Viewer.service;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DataTypeConvertionService {

	public static File convert(MultipartFile multipart) throws IllegalStateException, IOException {
		
		File convFile = new File(System.getProperty("java.io.tmpdir")+"/"+"fileName");
	    multipart.transferTo(convFile);
	    return convFile;
    }
}

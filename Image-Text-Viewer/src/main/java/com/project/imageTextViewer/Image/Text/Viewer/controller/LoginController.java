package com.project.imageTextViewer.Image.Text.Viewer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.imageTextViewer.Image.Text.Viewer.model.LoginModel;
import com.project.imageTextViewer.Image.Text.Viewer.service.VerificationService;

@RestController
public class LoginController {
	
	@Autowired
	VerificationService verificationService;

	@RequestMapping("/login")
	@CrossOrigin(origins = "*")
	public boolean handleLoginRequest(@RequestBody LoginModel loginModel) {
		return verificationService.validateUser(loginModel.getemail(), loginModel.getPassword());
	}
}

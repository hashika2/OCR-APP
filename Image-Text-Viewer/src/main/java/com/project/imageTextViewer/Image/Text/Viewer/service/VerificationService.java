package com.project.imageTextViewer.Image.Text.Viewer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.imageTextViewer.Image.Text.Viewer.model.LoginModel;

@Component
public class VerificationService {

	@Autowired
	LoginService loginService;
	
	public boolean validateUser(String username, String password) {
		List<LoginModel> lists = loginService.getLoginDetailsList();
		for(LoginModel list : lists) {
			if(username.equalsIgnoreCase(list.getemail().toString()) && password.equals(list.getPassword().toString())) {
				return true;
			}
		}
		return false;
	}
}

package com.project.imageTextViewer.Image.Text.Viewer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.imageTextViewer.Image.Text.Viewer.model.LoginModel;

@Service
public class UserEmailSearch {
	
	@Autowired
	LoginService loginService;

	public boolean searchEmail(String email) {
		boolean data = false;
		for(LoginModel loginData : loginService.getLoginDetailsList()) {
			if(loginData.getemail().contains(email)) {
				data = true;
			}
			else {
				data = false;
			}
		}
		return data;
	}
}

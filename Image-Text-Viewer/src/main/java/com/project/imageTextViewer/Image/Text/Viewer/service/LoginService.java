package com.project.imageTextViewer.Image.Text.Viewer.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.imageTextViewer.Image.Text.Viewer.jpa.LoginRepository;
import com.project.imageTextViewer.Image.Text.Viewer.model.LoginModel;

@Service
public class LoginService {

	@Autowired
	LoginRepository loginRepository;
	
	public List<LoginModel> getLoginDetailsList() {
		List<LoginModel> list = new ArrayList<>();
		
		for (LoginModel loginModel : loginRepository.findAll()) {
			list.add(loginModel);
		}
		
		return list;
	}
}

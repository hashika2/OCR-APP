package com.project.imageTextViewer.Image.Text.Viewer.controller;

import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.imageTextViewer.Image.Text.Viewer.jpa.LoginRepository;
import com.project.imageTextViewer.Image.Text.Viewer.model.LoginModel;
import com.project.imageTextViewer.Image.Text.Viewer.model.UUIDModel;
import com.project.imageTextViewer.Image.Text.Viewer.service.UserEmailSearch;

@RestController
public class SignUpController {
	
	@Autowired
	JavaMailSender javaMailSender;
	
	@Autowired
	UserEmailSearch userEmailSearch;
	
	@Autowired
	LoginRepository loginRepository;
	
	UUID uuid;
	private String name;
	private String email;
	private String password;

	@RequestMapping(value = "/signUp", method = RequestMethod.POST)
	@CrossOrigin(origins = "*")
	public String saveData(@RequestBody LoginModel loginModel) throws MessagingException {
		
		if(userEmailSearch.searchEmail(loginModel.getemail()) == false) {
		
			uuid = UUID.randomUUID();
			this.name = loginModel.getName();
			this.email = loginModel.getemail();
			this.password = loginModel.getPassword();
			
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
			helper.setTo(email);
			helper.setSubject("Verfication Email");
			helper.setText("Click here to verify your account:"+ "http://localhost:3000/verifyResponse/"+uuid);
			
			javaMailSender.send(mimeMessage);
			
			return "success";
		}
		
		else {
			return "fail";
		}
		
	}
	
	@RequestMapping(value="/verifyResponse", method = RequestMethod.POST)
	@CrossOrigin(origins = "*")
	public String getVerify(@RequestBody UUIDModel confirm) {
		if(confirm.getUuid().equals(uuid.toString())) {
			loginRepository.save(new LoginModel(name, email, password));
			return "Verified";
		}
		else
			return "Falied";
	}
}

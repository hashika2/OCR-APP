package com.project.imageTextViewer.Image.Text.Viewer.jpa;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.project.imageTextViewer.Image.Text.Viewer.model.LoginModel;

@Repository
public interface LoginRepository extends MongoRepository<LoginModel, Integer> {

}

package com.project.imageTextViewer.Image.Text.Viewer.jpa;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.project.imageTextViewer.Image.Text.Viewer.model.ImageModel;

@Repository
public interface ImageRepository extends MongoRepository<ImageModel, Integer>{

}

package com.project.imageTextViewer.Image.Text.Viewer.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ImageModel {

	@Id
	private ObjectId id;
	
	private String text;
	
	private byte[] image_path;

	public ImageModel() {
		
	}

	public ImageModel(String text, byte[] image_path) {
		super();
		this.text = text;
		this.image_path = image_path;
	}
	
	public ImageModel(ObjectId id, String text, byte[] image_path) {
		super();
		this.id = id;
		this.text = text;
		this.image_path = image_path;
	}

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public byte[] getImage_path() {
		return image_path;
	}

	public void setImage_path(byte[] image_path) {
		this.image_path = image_path;
	}
	
}

package com.project.imageTextViewer.Image.Text.Viewer.service;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

@Service
public class ReadText {

	public String readText(File imageFile) {
		ITesseract instance = new Tesseract();

        try {
            BufferedImage in = ImageIO.read(imageFile);

            BufferedImage newImage = new BufferedImage(
                    in.getWidth(), in.getHeight(), BufferedImage.TYPE_INT_ARGB);

            Graphics2D g = newImage.createGraphics();
            g.drawImage(in, 0, 0, null);
            g.dispose();

            String result = instance.doOCR(newImage);
            imageFile.delete();
            
            return result;

        } catch (TesseractException | IOException e) {
            return "Error while reading image";
        }
	}
}

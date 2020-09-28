package com.example.demo.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.config.AppConfiguration;

@Service
public class FileService {
	
	@Autowired
	AppConfiguration app;
	
	public String writeBase64StringToFile(String image) throws IOException {
		String fileName = generateUniqueName();
		File target = new File(app.getUploadPath()+"/"+fileName);
		OutputStream stream  = new FileOutputStream(target);
		byte[] b = Base64.getDecoder().decode(image);
		stream.write(b);
		stream.close();
		return fileName;
	}
	
	public String generateUniqueName() {
		
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	public void deleteFile(String oldImage) {
		if(oldImage == null)
			return; 
		try {
			Files.deleteIfExists(Paths.get(app.getUploadPath(),oldImage));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}

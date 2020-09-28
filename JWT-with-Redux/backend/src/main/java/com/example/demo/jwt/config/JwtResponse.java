package com.example.demo.jwt.config;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse  implements Serializable{
	private String username;
	private String jwttoken;
	private String email;
	private String image;
}

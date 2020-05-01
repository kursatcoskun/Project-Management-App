package com.kursatcoskun.issuemanagement.controller;

import com.kursatcoskun.issuemanagement.dto.IssueDto;
import com.kursatcoskun.issuemanagement.dto.LoginRequest;
import com.kursatcoskun.issuemanagement.dto.RegistrationRequest;
import com.kursatcoskun.issuemanagement.dto.TokenResponse;
import com.kursatcoskun.issuemanagement.entities.User;
import com.kursatcoskun.issuemanagement.repositories.UserRepository;
import com.kursatcoskun.issuemanagement.security.JwtTokenUtil;
import com.kursatcoskun.issuemanagement.services.impl.UserServiceImpl;
import com.kursatcoskun.issuemanagement.util.ProcessResult;
import com.kursatcoskun.issuemanagement.util.ResponseMessage;
import com.kursatcoskun.issuemanagement.util.UtilResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/token")
public class AccountController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<UtilResponse<TokenResponse>> login(@RequestBody LoginRequest request) throws AuthenticationException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        final User user = userRepository.findByUsername(request.getUsername());
        final String token = jwtTokenUtil.generateToken(user);
        TokenResponse tokenResponse = new TokenResponse(user.getUsername(),token,user.getId());
        return ResponseEntity.ok((new UtilResponse<TokenResponse>(tokenResponse, new ProcessResult("200", ResponseMessage.SUCCESS))));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Boolean> register(@RequestBody RegistrationRequest registrationRequest) throws AuthenticationException {
        Boolean response = userService.register(registrationRequest);
        return ResponseEntity.ok(response);
    }

}

package com.kursatcoskun.issuemanagement.controller;

import com.kursatcoskun.issuemanagement.dto.UserDto;
import com.kursatcoskun.issuemanagement.entities.IssueStatus;
import com.kursatcoskun.issuemanagement.services.impl.UserServiceImpl;
import com.kursatcoskun.issuemanagement.util.ApiPaths;
import com.kursatcoskun.issuemanagement.util.ProcessResult;
import com.kursatcoskun.issuemanagement.util.ResponseMessage;
import com.kursatcoskun.issuemanagement.util.UtilResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.UserCtrl.CTRL)
@Api(value = ApiPaths.UserCtrl.CTRL, description = "User APIs")
@CrossOrigin
public class UserController {

    private final UserServiceImpl userServiceImpl;

    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @GetMapping("/getAllUsers")
    @ApiOperation(value = "Get All By Operation", response = UtilResponse.class)
    public ResponseEntity<UtilResponse<List<UserDto>>> getAll() {
        List<UserDto> users = userServiceImpl.getAll();
        return ResponseEntity.ok(new UtilResponse<List<UserDto>>(users, new ProcessResult("200", ResponseMessage.SUCCESS)));
    }

    @GetMapping("/getById/{id}")
    @ApiOperation(value = "Get By Id Operation", response = UtilResponse.class)
    public ResponseEntity<UtilResponse<UserDto>> getById(@PathVariable(value = "id", required = true) Long id) {
        UserDto userDto = userServiceImpl.getById(id);
        return ResponseEntity.ok(new UtilResponse<UserDto>(userDto, new ProcessResult("200", ResponseMessage.SUCCESS)));
    }

    @PostMapping("createUser")
    @ApiOperation(value = "Create Operation", response = UtilResponse.class)
    public ResponseEntity<UtilResponse<UserDto>> createUser(@Valid @RequestBody UserDto userDto) {
        UserDto createdUser = userServiceImpl.save(userDto);
        return ResponseEntity.ok(new UtilResponse<UserDto>(null, new ProcessResult("200", ResponseMessage.SUCCESS)));
    }

}

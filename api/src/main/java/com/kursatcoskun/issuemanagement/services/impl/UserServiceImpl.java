package com.kursatcoskun.issuemanagement.services.impl;

import com.kursatcoskun.issuemanagement.dto.IssueDto;
import com.kursatcoskun.issuemanagement.dto.UserDto;
import com.kursatcoskun.issuemanagement.entities.Issue;
import com.kursatcoskun.issuemanagement.entities.User;
import com.kursatcoskun.issuemanagement.repositories.UserRepository;
import com.kursatcoskun.issuemanagement.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.Arrays;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository,ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDto save(UserDto userDto) {
        User user = modelMapper.map(userDto,User.class);
        user = userRepository.save(user);
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto getById(Long id) {
        User user = userRepository.getOne(id);
        return modelMapper.map(user,UserDto.class);
    }

    @Override
    public UserDto getByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return modelMapper.map(user,UserDto.class);
    }

    @Override
    public UserDto getByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return modelMapper.map(user,UserDto.class);
    }

    public List<UserDto> getAll() {
        List<User> data = userRepository.findAll();
        return Arrays.asList(modelMapper.map(data, UserDto[].class));
    }

    @Override
    public Page<User> getAllPageable(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public Boolean delete(Long id) {
        userRepository.deleteById(id);
        return Boolean.TRUE;
    }
}

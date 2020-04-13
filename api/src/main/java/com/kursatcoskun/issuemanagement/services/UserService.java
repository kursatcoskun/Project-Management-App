package com.kursatcoskun.issuemanagement.services;

import com.kursatcoskun.issuemanagement.dto.UserDto;
import com.kursatcoskun.issuemanagement.entities.Issue;
import com.kursatcoskun.issuemanagement.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    UserDto save(UserDto userDto);

    UserDto getById(Long id);

    UserDto getByUsername(String username);

    UserDto getByEmail(String email);

    Page<User> getAllPageable(Pageable pageable);

    Boolean delete(Long id);
}

package com.kursatcoskun.issuemanagement.services;

import com.kursatcoskun.issuemanagement.dto.ProjectDto;
import com.kursatcoskun.issuemanagement.entities.Project;
import com.kursatcoskun.issuemanagement.util.TPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectService {

    ProjectDto save(ProjectDto projectDto);

    ProjectDto update(Long id,ProjectDto projectDto);

    ProjectDto getById(Long id);

    List<ProjectDto> getAll();

    ProjectDto getByProjectCode(String projectCode);

    List<Project> getByProjectCodeContains(String projectCode);

    TPage<ProjectDto> getAllPageable(Pageable pageable);

    Boolean delete(Long id);
}

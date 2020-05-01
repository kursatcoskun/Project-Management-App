package com.kursatcoskun.issuemanagement.services.impl;

import com.kursatcoskun.issuemanagement.dto.ProjectDto;
import com.kursatcoskun.issuemanagement.entities.Project;
import com.kursatcoskun.issuemanagement.repositories.ProjectRepository;
import com.kursatcoskun.issuemanagement.services.ProjectService;
import com.kursatcoskun.issuemanagement.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ModelMapper modelMapper;

    public ProjectServiceImpl(ProjectRepository projectRepository, ModelMapper modelMapper) {
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ProjectDto save(ProjectDto project) {
        Project projectCheck = projectRepository.getByProjectCode(project.getProjectCode());
        if (projectCheck != null)
            throw new IllegalArgumentException("Project Code Already Exist");

        Project p = modelMapper.map(project, Project.class);
        p.setStatus(true);
        p = projectRepository.save(p);
        project.setId(p.getId());
        return project;
    }

    @Override
    public ProjectDto update(Long id, ProjectDto projectDto) {
        Project project = projectRepository.getOne(id);
        if (project == null) {
            throw new IllegalArgumentException("Project does not exist ID: " + id);
        }
        project.setProjectCode(projectDto.getProjectCode());
        project.setProjectName(projectDto.getProjectName());

        projectRepository.save(project);
        return modelMapper.map(project, ProjectDto.class);
    }

    @Override
    public ProjectDto getById(Long id) {
        Project project = projectRepository.getOne(id);
        if (project.getProjectCode() == null) {
            throw new EntityNotFoundException("Project Not Found with id: " + id);
        }
        return modelMapper.map(project, ProjectDto.class);
    }

    @Override
    public ProjectDto getByProjectCode(String projectCode) {
        return null;
    }

    @Override
    public List<Project> getByProjectCodeContains(String projectCode) {
        return null;
    }

    @Override
    public TPage<ProjectDto> getAllPageable(Pageable pageable) {
        Page<Project> data = projectRepository.findAllByOrderById(pageable);
        TPage<ProjectDto> response = new TPage<ProjectDto>();
        response.setStat(data, Arrays.asList(modelMapper.map(data.getContent()
                .stream()
                .filter(project -> project.getStatus() == true)
                .collect(Collectors.toList()), ProjectDto[].class)));
        return response;
    }


    @Override
    public Boolean delete(Long id) {
        Project project = projectRepository.getOne(id);
        project.setStatus(false);
        project = projectRepository.save(project);
        if (project.getStatus() == true) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

    @Override
    public List<ProjectDto> getAll() {
        List<Project> data = projectRepository.findAll().stream()
                .filter(project -> project.getStatus() == true)
                .collect(Collectors.toList());
        return Arrays.asList(modelMapper.map(data, ProjectDto[].class));
    }

}

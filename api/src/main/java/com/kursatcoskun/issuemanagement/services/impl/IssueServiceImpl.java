package com.kursatcoskun.issuemanagement.services.impl;

import com.kursatcoskun.issuemanagement.dto.*;
import com.kursatcoskun.issuemanagement.entities.*;
import com.kursatcoskun.issuemanagement.repositories.IssueHistoryRepository;
import com.kursatcoskun.issuemanagement.repositories.IssueRepository;
import com.kursatcoskun.issuemanagement.repositories.ProjectRepository;
import com.kursatcoskun.issuemanagement.repositories.UserRepository;
import com.kursatcoskun.issuemanagement.services.IssueHistoryService;
import com.kursatcoskun.issuemanagement.services.IssueService;
import com.kursatcoskun.issuemanagement.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class IssueServiceImpl implements IssueService {

    private final IssueRepository issueRepository;
    private final IssueHistoryRepository issueHistoryRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final IssueHistoryServiceImpl issueHistoryServiceImpl;
    private final ModelMapper modelMapper;

    public IssueServiceImpl(IssueRepository issueRepository, ModelMapper modelMapper, UserRepository userRepository, ProjectRepository projectRepository, IssueHistoryServiceImpl issueHistoryServiceImpl, IssueHistoryRepository issueHistoryRepository) {
        this.issueRepository = issueRepository;
        this.issueHistoryRepository = issueHistoryRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.issueHistoryServiceImpl = issueHistoryServiceImpl;
        this.modelMapper = modelMapper;
    }


    @Override
    public IssueDto save(IssueInputDto issue) {
        Issue issueEntity = new Issue();
        issueEntity.setDetails(issue.getDetails());
        issueEntity.setIssueStatus(issue.getIssueStatus());
        issueEntity.setDescription(issue.getDescription());
        issueEntity.setDate(new Date());
        issueEntity.setStatus(true);
        issueEntity.setCreatedAt(new Date());
        issueEntity.setProject(projectRepository.getOne(issue.getProjectId()));
        issueEntity.setAssignee(userRepository.getOne(issue.getAssigneeId()));
        issueEntity = issueRepository.save(issueEntity);

        return modelMapper.map(issueEntity, IssueDto.class);
    }

    @Transactional
    public IssueDetailDto update(Long id, IssueInputDto issueInputDto) {
        Issue issue = issueRepository.getOne(id);
        User user = userRepository.getOne(issueInputDto.getAssigneeId());
        if (issue == null) {
            throw new IllegalArgumentException("Project does not exist ID: " + id);
        }
        issue.setStatus(true);
        issue.setAssignee(user);
        issue.setIssueStatus(issueInputDto.getIssueStatus());
        issue.setDescription(issueInputDto.getDescription());
        issue.setDetails(issueInputDto.getDetails());
        issue.setDate(issueInputDto.getDate());
        issue.setProject(projectRepository.getOne(issueInputDto.getProjectId()));

        issue = issueRepository.save(issue);
        IssueHistoryDto issueHistoryDto = modelMapper.map(issue,IssueHistoryDto.class);
        issueHistoryDto.setAssigneeId(user.getId());
        issueHistoryDto.setIssueId(issue.getId());
        issueHistoryServiceImpl.save(issueHistoryDto);
        return modelMapper.map(issue, IssueDetailDto.class);
    }

    public IssueDetailDto getByIdWithDetails(Long id) {
        Issue issue = issueRepository.getOne(id);
        IssueDetailDto detailDto = modelMapper.map(issue, IssueDetailDto.class);
        List<IssueHistoryDto> issueHistoryDtos = issueHistoryServiceImpl.getByIssueId(issue.getId());
        detailDto.setIssueHistories(issueHistoryDtos);
        return detailDto;
    }

    @Override
    public IssueDto getById(Long id) {
        Issue issue = issueRepository.getOne(id);
        if (issue.getId() == null) {
            throw new EntityNotFoundException("Issue Not Found with id: " + id);
        }
        return modelMapper.map(issue, IssueDto.class);
    }

    @Override
    public TPage<IssueDto> getAllPageable(Pageable pageable) {
        Page<Issue> data = issueRepository.findAllByStatus(true,pageable);
        TPage page = new TPage<IssueDto>();
        page.setStat(data, Arrays.asList(modelMapper.map(data.getContent()
                .stream()
                .filter(response -> response.getStatus() == true)
                .sorted(Comparator.comparing(o -> o.getId()))
                .collect(Collectors.toList()), IssueDto[].class)));
        return page;
    }

    @Override
    public Boolean delete(Long id) {
        Issue issue = issueRepository.getOne(id);
        issue.setStatus(false);
        issueRepository.save(issue);
        return true;
    }

    @Override
    public TPage<IssueDto> getIssuesByProjectId(Long id,Pageable pageable) {
        Project project = projectRepository.getOne(id);
        Page<Issue> data = issueRepository.findAllByProject(project,pageable);
        TPage page = new TPage<IssueDto>();
        page.setStat(data, Arrays.asList(modelMapper.map(data.getContent()
                .stream()
                .filter(response -> response.getStatus() == true)
                .collect(Collectors.toList()), IssueDto[].class)));
        return page;
    }

    @Override
    public TPage<IssueDto> getIssuesByAssigneeAndIssueStatus(Long id, IssueStatus issueStatus, Pageable pageable) {
        User user = userRepository.getOne(id);
        Page<Issue> data = issueRepository.findAllByAssigneeAndIssueStatusAndStatus(user,issueStatus,true,pageable);
        TPage page = new TPage<IssueDto>();
        page.setStat(data, Arrays.asList(modelMapper.map(data.getContent()
                .stream()
                .filter(response -> response.getStatus() == true)
                .collect(Collectors.toList()), IssueDto[].class)));
        return page;
    }

}
package com.kursatcoskun.issuemanagement.services.impl;

import com.kursatcoskun.issuemanagement.dto.IssueHistoryDto;
import com.kursatcoskun.issuemanagement.entities.Issue;
import com.kursatcoskun.issuemanagement.entities.IssueHistory;
import com.kursatcoskun.issuemanagement.entities.User;
import com.kursatcoskun.issuemanagement.repositories.IssueHistoryRepository;
import com.kursatcoskun.issuemanagement.repositories.IssueRepository;
import com.kursatcoskun.issuemanagement.repositories.UserRepository;
import com.kursatcoskun.issuemanagement.services.IssueHistoryService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class IssueHistoryServiceImpl implements IssueHistoryService {

    private final IssueHistoryRepository issueHistoryRepository;
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public IssueHistoryServiceImpl(IssueHistoryRepository issueHistoryRepository, ModelMapper modelMapper,IssueRepository issueRepository,UserRepository userRepository) {
        this.issueHistoryRepository = issueHistoryRepository;
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public IssueHistoryDto save(IssueHistoryDto issueHistoryDto) {
        User user = userRepository.getOne(issueHistoryDto.getAssigneeId());
        Issue issue = issueRepository.getOne(issueHistoryDto.getIssueId());
        IssueHistory issueHistory = modelMapper.map(issueHistoryDto, IssueHistory.class);
        issueHistory.setAssignee(user);
        issueHistory.setIssue(issue);
        issueHistory = issueHistoryRepository.save(issueHistory);
        issueHistory.setId(issueHistory.getId());
        return modelMapper.map(issueHistory, IssueHistoryDto.class);

    }

    @Override
    public IssueHistoryDto getById(Long id) {
        IssueHistory issueHistory = issueHistoryRepository.getOne(id);
        return modelMapper.map(issueHistory, IssueHistoryDto.class);
    }

    @Override
    public List<IssueHistoryDto> getByIssueId(Long id) {
        Issue issue = issueRepository.getOne(id);
        return Arrays.asList(modelMapper.map(issueHistoryRepository.getIssueHistoriesByIssueOrderByDateDesc(issue), IssueHistoryDto[].class));
    }

    @Override
    public Page<IssueHistory> getAllPageable(Pageable pageable) {
        return issueHistoryRepository.findAll(pageable);
    }

    @Override
    public Boolean delete(Long id) {
        issueHistoryRepository.deleteById(id);
        return Boolean.TRUE;
    }
}

package com.kursatcoskun.issuemanagement.services;

import com.kursatcoskun.issuemanagement.dto.IssueHistoryDto;
import com.kursatcoskun.issuemanagement.entities.Issue;
import com.kursatcoskun.issuemanagement.entities.IssueHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IssueHistoryService {

    IssueHistoryDto save(IssueHistoryDto issueHistoryDto);

    IssueHistoryDto getById(Long id);

    List<IssueHistoryDto> getByIssueId(Long id);

    Page<IssueHistory> getAllPageable(Pageable pageable);

    Boolean delete(Long id);
}

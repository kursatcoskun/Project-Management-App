package com.kursatcoskun.issuemanagement.services;

import com.kursatcoskun.issuemanagement.dto.IssueDetailDto;
import com.kursatcoskun.issuemanagement.dto.IssueDto;
import com.kursatcoskun.issuemanagement.dto.IssueInputDto;
import com.kursatcoskun.issuemanagement.dto.ProjectDto;
import com.kursatcoskun.issuemanagement.entities.Issue;
import com.kursatcoskun.issuemanagement.entities.IssueHistory;
import com.kursatcoskun.issuemanagement.util.TPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IssueService {

    IssueDto save(IssueInputDto issue);

    IssueDetailDto update(Long id, IssueInputDto issueDto);

    IssueDto getById(Long id);

    TPage<IssueDto> getAllPageable(Pageable pageable);

    Boolean delete(Long id);
}

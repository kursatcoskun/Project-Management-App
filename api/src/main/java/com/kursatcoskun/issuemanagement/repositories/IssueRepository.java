package com.kursatcoskun.issuemanagement.repositories;

import com.kursatcoskun.issuemanagement.entities.Issue;
import com.kursatcoskun.issuemanagement.entities.IssueStatus;
import com.kursatcoskun.issuemanagement.entities.Project;
import com.kursatcoskun.issuemanagement.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue,Long> {

    Page<Issue> findAllByProject(Project project, Pageable pageable);
    Page<Issue> findAllByStatus(Boolean status, Pageable pageable);
    Page<Issue> findAllByAssigneeAndIssueStatusAndStatus(User user, IssueStatus issueStatus,Boolean status, Pageable pageable);

}
